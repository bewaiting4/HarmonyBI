var vizData = require('./vizData.json');
var logger = require('../../../util/logger');
var viz = require('../../../db/viz/viz');

vizModel = {
    getVizData: function(filter) {

        // // TODO: Get result from MySQL.
        // return viz(filter)
        //     .then(function(result) {
        //         return { viz: result };
        //     }, function(err) {
        //         logger.log(err);
        //     });

        // Get result from local data.
        return new Promise((resolve, reject) => {
            // Filter data.
            var data = vizData.filter(function(row) {
                var isValid = true;

                // 案发开始时间
                if (filter.date_from &&
                    (new Date(filter.date_from) - new Date(row.call_start) > 0)) {
                    return false;
                }

                // 案发结束时间
                if (filter.date_to &&
                    (new Date(filter.date_to) - new Date(row.call_start) < 0)) {
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
                if (filter.ci_from && row.f_CI && filter.ci_from.split(';').indexOf(row.f_CI) === -1) {
                    return false;
                }
                if (filter.ci_from && row.t_CI && filter.ci_to.split(';').indexOf(row.t_CI) === -1) {
                    return false;
                }

                // 案发地点 - 行政区划
                if (filter.district && row.f_district &&
                    filter.district.indexOf(row.f_district) === -1) {
                    return false;
                }

                // 案发相关人员
                if (filter.idigit && row.f_idigit && filter.idigit.split(';').indexOf(row.f_idigit) === -1) {
                    return false;
                }
                if (filter.number && row.f_number && filter.number.split(';').indexOf(row.f_number) === -1) {
                    return false;
                }

                return true;
            });

            logger.log('Get ' + data.length + ' viz data entries.');

            return resolve({ vizData: data });
        });
    }
};

module.exports = vizModel;