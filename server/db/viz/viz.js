var logger = require('../../util/logger');
var config = require('../../config/config');
var mssql = require('mssql');

module.exports = function(filter) {

    // SQL Server
    return sql.connect(config.mysql).then(pool => {
        // Query 
        return pool.request()
            .input('input_parameter', sql.Int, value)
            .query('select * from mytable where id = @input_parameter' + 
            	' and number = @number' +
            	' and name = @name');

    }).catch(err => {
        logger.log(err);
    });

};