const logger = require('../../util/logger');
const config = require('../../config/config');
const mssql = require('mssql');
const csv = require('csv-array');
const dataTransform = require('./dataTransform');
const enumSuspectType = require('../suspect/enumSuspectType');

/* Call data format sample:
{
    "_state": 66,
    "f_number": "15292971744",
    "f_name": "",
    "f_lang": "维语",
    "f_long": "78.236862",
    "f_lat": "37.717583",
    "f_IMEI": "35557304609347",
    "f_district": "新疆 和田地区(0903)",
    "f_addr": "和田(0903) 皮山科克铁热克乡阿热克库木村(皮山科克铁热克乡阿热克库木村)",
    "f_CI": "23351",
    "call_start": "2016-11-15 08:35:51",
    "call_end": "2016-11-15 08:36:46",
    "call_duration": "41",
    "t_number": "15199289734",
    "t_name": "",
    "t_lang": "维语",
    "t_long": "78.236862",
    "t_lat": "37.717583",
    "t_IMEI": "86773602192127",
    "t_district": "新疆 和田地区(0903)",
    "t_addr": "和田(0903) 皮山科克铁热克乡阿热克库木村(皮山科克铁热克乡阿热克库木村)",
    "t_CI": "23351"
}
*/

function filterData(data, filter) {
    // Filter data.
    return data.filter(function (row) {
        // Filter out short numbers which are probably service number.
        if (row.f_number.length < 7 || row.t_number.length < 7) {
            return false;
        }

        // 案发开始时间
        if (filter.date_from - new Date(row.date_time) > 0) {
            return false;
        }

        // 案发结束时间
        if (filter.date_to &&
            (filter.date_to - new Date(row.date_time) < 0)) {
            return false;
        }

        // 案发地点 - 地图画圈
        if (filter.lat && filter.long && filter.radius &&
            ((filter.lat - row.lat) * (filter.lat - row.lat) +
                (filter.long - row.long) * (filter.long - row.long) -
                filter.radius * filter.radius > 0)) {
            return false;
        }

        // 案发地点 - CI
        if (filter.ci_from.length > 0 && filter.ci_from.indexOf(row.CI) === -1 &&
            filter.ci_to.length > 0 && filter.ci_to.indexOf(row.CI) === -1) {
            return false;
        }

        // 案发地点 - 行政区划
        if (filter.district.length > 0 && filter.district.indexOf(row.f_district) === -1) {
            return false;
        }

        // 案发相关人员
        let hasSuspects = filter.suspects.filter(function (suspect) {
                return suspect.number === row.f_number || suspect.number === row.t_number;
            }).length > 0,
            hasUnknowns = filter.unknowns.filter(function (unknown) {
                return unknown.number === row.f_number || unknown.number === row.t_number;
            }).length > 0,
            hasVictims = filter.victims.filter(function (victim) {
                return victim.number === row.f_number || victim.number === row.t_number;
            }).length > 0;

        if (!hasSuspects && !hasUnknowns || hasVictims) {
            return false;
        }

        return true;
    });
}

function getDataFrmoSQL(filter) {

    // SQL Server
    return sql.connect(config.mysql).then(pool => {
        // Query
        return pool.request()
            .input('input_parameter', sql.Int, value)
            .query('select * from mytable where ' +
                'id = @input_parameter and ' +
                'number = @number and ' +
                'name = @name'
            );

    }).catch(err => {
        logger.log(err);
    });

}

// Cache csv file.
let csvCache = {};
const LOADING = 'loading';

function getDataFromCVS(filter) {

    let csvFileName = '/calldata.csv';

    // Function to process data.
    let processData = function (data, filter, resolve) {

        data = filterData(data, filter);

        let transformedData = dataTransform.transform(data);

        transformedData.filter = filter;

        resolve(transformedData);
    };

    return new Promise(function (resolve, reject) {

        if (!csvCache[csvFileName]) {
            // Mark this csv as loading.
            csvCache[csvFileName] = LOADING;

            // Read and parse csv data.
            csv.parseCSV(__dirname + csvFileName, function (data) {
                // Cache csv file.
                csvCache[csvFileName] = data;

                // Clear cache in 10min to release memory and update data.
                setTimeout(function () {
                    csvCache[csvFileName] = undefined;
                }, 600000);

                processData(data, filter, resolve);
            }, true);
        } else if (csvCache[csvFileName] === LOADING) {
            // Check wheher the data is ready per 10ms.
            let interval = setInterval(function () {
                if (csvCache[csvFileName] !== LOADING) {
                    clearInterval(interval);

                    processData(csvCache[csvFileName], filter, resolve);
                }
            }, 10);

            // Clear interval in 10s in case of memory leak.
            setTimeout(function () {
                clearInterval(interval);
            }, 10000);
        } else {
            processData(csvCache[csvFileName], filter, resolve);
        }
    });

}

module.exports = {
    getData: getDataFromCVS
}
