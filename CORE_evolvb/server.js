const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(PORT, () => {
    console.log(`${chalk.blue('[APP-INFO]')} Listening on port ${chalk.blue(PORT)}`);

});