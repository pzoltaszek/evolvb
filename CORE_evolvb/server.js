const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const router = express.Router();
require('dotenv').config({ path: `${__dirname}/config/dev.env` });
const app = express();

var db;
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", router);

const DB_URI = "mongodb+srv://".concat(process.env.EVOLVB_DB_USER, ':', process.env.EVOLVB_DB_PASS, '@cluster0.nx4rl.mongodb.net/',
    process.env.EVOLV_DB_NAME, '?retryWrites=true&w=majority');

const client = new MongoClient(DB_URI, { useUnifiedTopology: true });
client.connect(err => {
    if (err) {
        console.log(`${chalk.red('[APP-ERROR]')} Database connection failed`);
    } else {
        db = client.db(process.env.EVOLV_DB_NAME);
        console.log(`${chalk.blue('[APP-INFO]')} Database connected`);
    }

});

//--------------------
// const userRouter = require('./routes/UserRoute')(); //
// router.get("/", userRouter(db));

router.get("/user/getAllUser", (req, res) => {
    db.collection("t_user").find({}).toArray((error, docs) => {
        if (error) {
            console.log(`${chalk.red('[APP-ERROR]')} Database error: cannot get all users`);
            return res.json({ success: false });
        } else {
            return res.json({ success: true, data: docs });
        }
    });
});

router.post("/user/findUser", async(req, res) => {
    const { login, pass } = req.body;
    try {
        if (login && pass) {
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

router.post("/user/findUserByLogin", async(req, res) => {
    const { login } = req.body;
    try {
        if (login) {
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

router.post("/user/addNewUser", async(req, res) => {
    const { login, pass } = req.body;
    try {
        if (login && pass) {
            let user = await db.collection("t_user").findOne({ login: login, pass: pass });
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


app.listen(process.env.EVOLVB_SERVER_PORT, () => {
    console.log(`${chalk.blue('[APP-INFO]')} Listening on port ${chalk.blue(process.env.EVOLVB_SERVER_PORT)}`);
});