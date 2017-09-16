var logger = require('../../util/logger');
var config = require('../../config/config');
var mssql = require('mssql');
var csv = require('csv-array');

var enumServiceType = require('./enumServiceType');
var enumServiceStatus = require('./enumServiceStatus');

function isSpecialNumber(num) {

    for (var i = 0; i < num.length; i++) {

        if (i > 1) {
            // AAA
            if (num[i - 2] === num[i - 1] && num[i - 1] === num[i]) {
                return 'AAA';
            }

            // CBA
            if (num[i - 2] - num[i - 1] === 1 && num[i] - num[i - 1] === 1) {
                return 'CBA';
            }

            // ABC
            if (num[i] - num[i - 1] === 1 && num[i - 1] - num[i - 2] === 1) {
                return 'ABC';
            }
        }

        if (i > 2) {
            //AABB
            if (num[i] === num[i - 1] && num[i - 2] === num[i - 3]) {
                return 'AABB';
            }

            //ABAB
            if (num[i] === num[i - 2] && num[i - 1] === num[i - 3]) {
                return 'ABAB';
            }

            //ABBA
            if (num[i] === num[i - 3] && num[i - 1] === num[i - 2]) {
                return 'ABBA';
            }
        }

        if (i > 4) {
            // ABCABC
            if (num[i] === num[i - 3] && num[i - 1] === num[i - 4] && num[i - 2] && num[i - 5]) {
                return 'ABCABC';
            }
        }

        if (i > 6) {
            // ABCDABCD
            if (num[i] === num[i - 4] && num[i - 1] === num[i - 5] && num[i - 2] && num[i - 6] && num[i - 3] === num[i - 7]) {
                return 'ABCDABCD';
            }
        }
    }

    var lastThree = num.substring(num.length - 3, num.length),
        blackList = ['168', '169', '189', '668', '698', '699', '868', '869', '889', '898', '931', '968', '969', '989', '996', '998'];
    // End with special three.
    if (blackList.indexOf(lastThree) !== -1) {
        return 'SSS';
    }

    // End with 8 or AA.
    if (num[num.length - 1] === '8' || num[num.length - 1] === num[num.length - 2]) {
        return '8SS';
    }

    return 0;
}

function filterData(data, numbers) {
    // Filter data.
    return data.filter(function (row) {
        return (numbers || []).indexOf(row.number) !== -1;
    });
}

function calculateServiceSpan(data, numbers) {
    var serviceSpan = {};

    data.forEach(function (row) {
        var time = ((row.end ? new Date(row.end) : new Date()) - new Date(row.start));

        serviceSpan[row.number] = {
            serviceStart: row.start,
            serviceEnd: row.end,
            inUse: (!row.end || (new Date() - new Date(row.end) < 86400000)) ? enumServiceStatus.INUSE : enumServiceStatus.OUTUSE,
            serviceTime: time / 31536000000,
            serviceType: time < 15894000000 ? enumServiceType.TEMP : (time < 63072000000 ? enumServiceType.SHORT : enumServiceType.LONG),
            isSpecialNumber: isSpecialNumber(row.number) ? 1 : 0
        }
    });

    (numbers || []).forEach(function (number) {
        if (!serviceSpan[number]) {
            serviceSpan[number] = {
                serviceStart: null,
                serviceEnd: null,
                inUse: enumServiceStatus.UNKNOWN,
                serviceTime: -1,
                serviceType: enumServiceType.UNKNOWN,
                isSpecialNumber: isSpecialNumber(number) ? 1 : 0
            }
        }
    });

    return serviceSpan;
}

function getDataFrmoSQL(numbers) {

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

function getDataFromCVS(numbers, modelData) {

    return new Promise(function (resolve, reject) {
        // Read and parse csv data.
        csv.parseCSV(__dirname + '/service_span.csv', function (data) {
            data = filterData(data, numbers);

            modelData = modelData || {};

            modelData.services = calculateServiceSpan(data, numbers);

            resolve(modelData);

        }, true);
    });
}

function getDataFromInput(numbers, modelData) {
    var serviceSpan = {};

    (numbers || []).forEach(function (number) {
        var record = (modelData.filter.suspects || []).filter(function (suspect) {
            return suspect.number === number;
        })[0];

        modelData.numbers[number] = {
            serviceTime: record ? record.serviceSpan : -1,
            serviceType: record ? record.serviceSpan : 1,
            isSpecialNumber: isSpecialNumber(number)
        };
    });

    return modelData;
}

module.exports = {
    getData: getDataFromInput
}
