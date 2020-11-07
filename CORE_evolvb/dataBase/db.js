const MongoClient = require('mongodb').MongoClient;
require('dotenv').config({ path: `${__dirname}/config/dev.env` });
const chalk = require('chalk');

const DB_URI = "mongodb+srv://".concat(process.env.EVOLVB_DB_USER, ':', process.env.EVOLVB_DB_PASS, '@cluster0.nx4rl.mongodb.net/',
    process.env.EVOLV_DB_NAME, '?retryWrites=true&w=majority');

let db;

const initDb = (callback) => {
    if (db) {
        console.log(`${chalk.red('[APP-ERROR]')} Already connected to DB!`);
        return callback(null, db);
    }

    const client = new MongoClient(DB_URI, { useUnifiedTopology: true });
    client.connect(err => {
        if (err) {
            console.log(`${chalk.red('[APP-ERROR]')} Database connection failed`);
            return callback(err);
        } else {
            db = client.db(process.env.EVOLV_DB_NAME);
            console.log(`${chalk.blue('[APP-INFO]')} Database connected`);
            return callback(null, db);
        }
    });
};

const getDb = () => {
    return db;
}


module.exports = {
    getDb,
    initDb
}