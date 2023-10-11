// let mysql = require('mysql');
const mysql = require('mysql2/promise');
const { DATABASE_DETAILS } = require('./config.json');
const { Sequelize } = require('sequelize');
const models = require('./dbModels');

async function initialize() {
    let db = {};

    //Check if Database exists and create if doesn't
    const { host, port, user, password, database } = DATABASE_DETAILS;
    connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // Connection to Database
    const sequelize = new Sequelize(database, user, password, { host, dialect: 'mysql' });

    //Check if connection successfull
    try {
        await sequelize.authenticate();
        db.models = await models(sequelize);
        db.sequelize = sequelize;

        //use either of the below two options

        // 1. sync all models with database
        await sequelize.sync();

        // 2. sync alter database
        // await sequelize.sync({ force: true });

        console.log('Connection has been established successfully.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    return db;
}

module.exports = initialize();