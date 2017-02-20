const express = require('express');
const auth = require('../util/auth');
const knex = require('../database/dbConfig');

let router = express.Router();

/*
 * GET route for finding a logged in user's role
 * @header params: { token: [Firebase JWT] }
 * @response: { role: [string] } (success) || 401 (unauthorized)
 */
router.get('/', auth.token, (req, res) => {
    console.log(req.decodedToken.email);
    knex
        .select('role')
        .from('users')
        .where('email', req.decodedToken.email)
        .then(role => res.send(role[0].role))
        .catch(err => res.sendStatus(401));
});

/*
 * GET route for finding a logged in user's customer id
 * @header params: { token: [Firebase JWT] }
 * @response: { customerId: [integer] } (success) || 401 (unauthorized)
 */
router.get('/imSomebody', auth.token, (req, res) => {
    console.log(req.decodedToken.email);
    knex
        .select('customer_id')
        .from('users')
        .where('email', req.decodedToken.email)
        .then(result => res.send({customerId: result[0].customer_id}))
        .catch(err => res.sendStatus(401));
});

module.exports = router;
