require('dotenv').config()

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: console.log,
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.TEST_DB_NAME,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dialect: 'postgres',
    },
    
}