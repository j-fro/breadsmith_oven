const admin = require('firebase-admin');
const path = require('path');

admin.initializeApp({
    credential: admin.credential.cert(
        path.join(__dirname, 'firebase-service-account.json')
    ),
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
