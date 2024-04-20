const express = require('express');
const { MonogoClient, ObjectID } = require('mongodb');
const passport = require('passport');

const authRouter = express.Router();
authRouter.route('/signUp').post((req, res) => {
    const { username, password } = req.body;

    
    const url = 'mongodb+srv://alireza21heidari:gVJ9FWGiyJxsab0n@globalmantics.vs6s6za.mongodb.net/?retryWrites=true&w=majority&appName=Globalmantics';
    const dbName = 'globalmantics';

    (async function addUser() {
        let client;
        try {

            client = await MonogoClient.connect(url);

            const db = client.db(dbName);

            const user = {username,password};
            const results = db.collection('user').insertOne(user);
            console.log('results : ',results);
            req.login(results.ops[0], () => {
                res.redirect('/auth/profile');
            });

        } catch (error) {
            console.log('error : ', error);
        }
        client.close();
    } )
    req.login(req.body, () => {
        res.redirect('/auth/profile');
    })
});

authRouter.route('/signIn').get((req, res)=> {
    res.render(signIn)
}).post(passport.authenticate('local', {
    successRedirect: '/auth/profile',
    failureMessage: '/'
}));


authRouter.route('/profile').get((req, res) => {
    res.json(req.user);
});


module.exports = authRouter;