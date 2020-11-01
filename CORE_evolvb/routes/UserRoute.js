const express = require('express');
const userRouter = express.Router();

function router(db) {
    userRouter.route('/user/getAllUser').get((req, res) => {
        db.collection("t_user").find({}).toArray((error, docs) => {
            if (error) {
                console.log(`${chalk.red('[APP-ERROR]')} Database error: cannot get all users`);
                return res.json({ success: false });
            } else {
                return res.json({ success: true, data: docs });
            }
        });
    });

    // userRouter.route('/single/:id').get((req, res) => {
    //     const { id } = req.params.id;
    //     res.render('single', { id });
    // });
    return userRouter;
}


module.exports = router;