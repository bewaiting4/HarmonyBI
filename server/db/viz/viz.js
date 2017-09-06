var logger = require('../../util/logger');
var config = require('../../config/config');
var mssql = require('mssql');
var csv = require('csv-array');
var dataTransform = require('../call/dataTransform');
var enumSuspectType = require('../suspect/enumSuspectType');

function filterData(data, filter) {
    // Filter data.
    return data.filter(function (row) {

        if (row.f_number.length < 7 || row.t_number.length < 7) {
            return false;
        }

        // 案发开始时间
        if (filter.date_from - new Date(row.call_start) > 0) {
            return false;
        }

        // 案发结束时间
        if (filter.date_to &&
            (filter.date_to - new Date(row.call_start) < 0)) {
            return false;
        }

        // 案发地点 - 地图画圈
        if (filter.lat && filter.long && filter.radius &&
            ((filter.lat - row.f_lat) * (filter.lat - row.f_lat) +
                (filter.long - row.f_long) * (filter.long - row.f_long) -
                filter.radius * filter.radius > 0)) {
            return false;
        }

        // 案发地点 - CI
        if (filter.ci_from.length > 0 && filter.ci_from.indexOf(row.f_CI) === -1) {
            return false;
        }
        if (filter.ci_to.length > 0 && filter.ci_to.indexOf(row.t_CI) === -1) {
            return false;
        }

        // 案发地点 - 行政区划
        if (filter.district.length > 0 && filter.district.indexOf(row.f_district) === -1) {
            return false;
        }

        // 案发相关人员
        if (filter.idigit && row.f_idigit && filter.idigit.split(';').indexOf(row.f_idigit) === -1) {
            return false;
        }
        if (filter.number && row.f_number && filter.number.split(';').indexOf(row.f_number) === -1) {
            return false;
        }
        if (filter.suspects.length > 0) {
            var hasSuspects = filter.suspects.filter(function (suspect) {
                return parseInt(suspect.type, 10) !== enumSuspectType.suspect ||
                    suspect.number === row.f_number &&
                    suspect.idigit === row.f_idiget;
            }).length > 0;

            if (!hasSuspects) {
                return false;
            }
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

function getDataFromCVS(filter) {

    return new Promise(function (resolve, reject) {
        // Read and parse csv data.
        csv.parseCSV(__dirname + '/../call/calldata.csv', function (data) {
            data = filterData(data, filter);

            var transformedData = dataTransform.transform(data);

            resolve(transformedData);

        }, true);
    });

}

module.exports = {
    getData: getDataFromCVS
}
