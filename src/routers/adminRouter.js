const express = require('express');
const { MongoClient } = require('mongodb');
const sessions = require('../data/sessions.json');

const adminRouter = express.Router();

adminRouter.route('/').get((req, res) => {
    const url = 'mongodb+srv://alireza21heidari:gVJ9FWGiyJxsab0n@globalmantics.vs6s6za.mongodb.net/?retryWrites=true&w=majority&appName=Globalmantics';
    const dbName = 'globalmantics';

    (async function mongo(){
        let client;
        try {
            client = await MongoClient.connect(url);
            console.log('this connected to the mongo DB');

            const db = client.db(dbName);



            const response = await db.collection('sessions').insertMany(sessions);
            res.json (response);

        } catch (error) {
            console.log(error.stack);
        }
    }());
})


module.exports = adminRouter;