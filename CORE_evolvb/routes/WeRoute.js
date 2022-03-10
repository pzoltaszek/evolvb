const express = require('express');
const weRouter = express.Router();
const chalk = require('chalk');
const fs = require('fs');
const fsPromises = fs.promises;

function router() {
    weRouter.post("/writeFile", async (req, res) => {
        const data  = req.body;
        try {
            await fsPromises.writeFile('./myFile.json', JSON.stringify(data));
            console.log(`${chalk.blue('[APP-INFO]')} file saved`);
        } catch (error) {
            console.log(`${chalk.red('[APP-ERROR]')} Save file error: cannot save file`);
        }
    });

    //TODO add file path or name
    weRouter.post("/readFile", async (req, res) => {
        const dat = req.body;
        try {
            const data = await fsPromises.readFile('./myFile.json', 'utf-8');
            return res.json({ success: true, data: data });
        } catch (error) {
            console.log(`${chalk.red('[APP-ERROR]')} Read file error: cannot read file`);
        }
    });

    return weRouter;
};

module.exports = router;