const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config({ path: `${__dirname}/config/dev.env` });
const initDb = require("./dataBase/db").initDb;
const userRouter = require("./routes/UserRoute")();
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

initDb(() => {
    app.listen(process.env.EVOLVB_SERVER_PORT, () => {
        console.log(`${chalk.blue('[APP-INFO]')} Listening on port ${chalk.blue(process.env.EVOLVB_SERVER_PORT)}`);
    });
});
app.use("/user", userRouter);