module.exports = {
    // disbable logging for testing
    logging: false,
    requireLogin: false,
    seed: true,
    db: {
        //url: 'mongodb://localhost/harmonybi'
        url: 'mongodb://harmonybi:harmonybi@ds161713.mlab.com:61713/heroku_0rx6ndpb'
    },
    mssql: {
        user: '...',
        password: '...',
        server: 'localhost',
        database: '...',
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        }
    }
};
