const express = require('express');
const auth = require('../util/auth');
const knex = require('../database/dbConfig');

let router = express.Router();

router.get('/', auth.token, (req, res) => {
    console.log(req.decodedToken.email);
    knex
        .select('role')
        .from('users')
        .where('email', req.decodedToken.email)
        .then(role => res.send(role[0].role))
        .catch(err => res.sendStatus(401));
    // let index = Math.floor(Math.random() * 2);
    // res.send(['admin', 'customer'][index]);
});

router.get('/imSomebody', auth.token, (req, res) => {
    console.log(req.decodedToken.email);
    knex
        .select('customer_id')
        .from('users')
        .where('email', req.decodedToken.email)
        .then(result => res.send({customerId: result[0].customer_id}))
        .catch(err => res.sendStatus(401));
    // let index = Math.floor(Math.random() * 2);
    // res.send(['admin', 'customer'][index]);
});

module.exports = router;
