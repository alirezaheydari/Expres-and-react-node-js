const passport = require('passport');
const { Strategy } = require('passport-local');

module.exports = function localStrategy() {
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {

        const url = 'mongodb+srv://alireza21heidari:gVJ9FWGiyJxsab0n@globalmantics.vs6s6za.mongodb.net/?retryWrites=true&w=majority&appName=Globalmantics';
        const dbName = 'globalmantics';
        (async function validateUser() {
            let client;
            try {
                    
                client = await MongoClient.connect(url);
                console.log('this connected to the mongo DB');

                const db = client.db(dbName);

                const user  = await db.collection('users').findOne({username});
                if (user && user.password === password){
                    done(null, user);
                } else {
                    done(null, false);
                }
            }catch(error) {
done(error, false);
            }
            client.close();
        })
        const user = {username, password, 'name': 'Jonathan'}
        done(null, user);
    }));
};