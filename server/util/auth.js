const admin = require('firebase-admin');
const path = require('path');

admin.initializeApp({
    credential: admin.credential.cert({
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL
    }),
    databaseURL: 'https://breadsmith-50dc2.firebaseio.com'
});

var tokenDecoder = function(req, res, next) {
    if (req.headers.id_token) {
        admin
            .auth()
            .verifyIdToken(req.headers.id_token)
            .then(function(decodedToken) {
                req.decodedToken = decodedToken;
                next();
            })
            .catch(function(error) {
                console.log('error:', error);
                res.sendStatus(401);
            });
    } else {
        res.sendStatus(401);
    }
}; //end tokenDecoder function

module.exports = {token: tokenDecoder};
