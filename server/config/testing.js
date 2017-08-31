module.exports = {
    // disbable logging for testing
    logging: false,
    requireLogin: false,
    db: {
        url: 'mongodb://localhost/harmonybi'
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