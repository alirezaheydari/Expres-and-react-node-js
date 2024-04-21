const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const sessionRouter = express.Router();
sessionRouter.use((req, res, next) => {
    if (req.user) {
        next();

    }
    else {
        res.redirect('/auth/signin');
    }
})

sessionRouter.route('/').get((req, res) => {
    const url = 'mongodb+srv://alireza21heidari:gVJ9FWGiyJxsab0n@globalmantics.vs6s6za.mongodb.net/?retryWrites=true&w=majority&appName=Globalmantics';
    const dbName = 'globalmantics';

    (async function mongo(){
        let client;
        try {
            client = await MongoClient.connect(url);
            console.log('this connected to the mongo DB');

            const db = client.db(dbName);



            const sessions = await db.collection('sessions').find().toArray()
            res.render('sessions', {
                sessions, 
            })
        } catch (error) {
            console.log(error.stack);
        }
    }())


    
});
sessionRouter.route('/:id').get((req, res) => {
    const id = req.params.id;

    const url = 'mongodb+srv://alireza21heidari:gVJ9FWGiyJxsab0n@globalmantics.vs6s6za.mongodb.net/?retryWrites=true&w=majority&appName=Globalmantics';
    const dbName = 'globalmantics';

    (async function mongo(){
        let client;
        try {
            client = await MongoClient.connect(url);
            console.log('this connected to the mongo DB');

            const db = client.db(dbName);



            const session = await db.collection('sessions').findOne({ _id: new ObjectId(id)})
            res.render('session',  {
                session: session
            });
        } catch (error) {
            console.log(error.stack);
        }
    }())

    
});

module.exports = sessionRouter;