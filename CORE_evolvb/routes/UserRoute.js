const express = require('express');
const userRouter = express.Router();
const chalk = require('chalk');
const getDb = require(".././dataBase/db").getDb;

function router() {
    userRouter.post("/findUser", async(req, res) => {
        const { login, pass } = req.body;
        try {
            if (login && pass) {
                let db = getDb();
                let user = await db.collection("t_user").findOne({ login: login, pass: pass })
                return res.json({ success: true, data: user });
            } else {
                return res.json({ success: true, data: null });
            }
        } catch (error) {
            console.log(`${chalk.red('[APP-ERROR]')} Database error: cannot find user`);
            return res.json({ success: false });
        }
    });

    userRouter.get("/getAllUser", (req, res) => {
        let db = getDb();
        db.collection("t_user").find({}).toArray((error, docs) => {
            if (error) {
                console.log(`${chalk.red('[APP-ERROR]')} Database error: cannot get all users`);
                return res.json({ success: false });
            } else {
                return res.json({ success: true, data: docs });
            }
        });
    });

    userRouter.post("/findUserByLogin", async(req, res) => {
        const { login } = req.body;
        try {
            if (login) {
                let db = getDb();
                let user = await db.collection("t_user").findOne({ login: login })
                return res.json({ success: true, data: user });
            } else {
                return res.json({ success: true, data: null });
            }
        } catch (error) {
            console.log(`${chalk.red('[APP-ERROR]')} Database error: cannot find user`);
            return res.json({ success: false });
        }
    });

    userRouter.post("/addNewUser", async(req, res) => {
        const { login, pass } = req.body;
        let db = getDb();
        try {
            if (login && pass) {
                let user = await db.collection("t_user").findOne({ login: login });
                if (user) {
                    return res.json({ success: true, data: null });
                } else {
                    db.collection("t_user").insertOne({ login: login, pass: pass });
                    return res.json({ success: true, login: login });
                }
            } else {
                return res.json({ success: true, data: null });
            }
        } catch (error) {
            console.log(`${chalk.red('[APP-ERROR]')} Database error: cannot add new user`);
            return res.json({ success: false });
        }
    });
    return userRouter;
};

module.exports = router;