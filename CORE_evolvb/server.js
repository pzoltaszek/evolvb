const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(morgan('dev'));

app.listen(PORT, () => {
    console.log(`${chalk.blue('[APP-INFO]')} Listening on port ${chalk.blue(PORT)}`);
   
});