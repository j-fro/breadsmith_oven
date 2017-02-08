const express = require('express');
const knex = require('../database/dbConfig');
let router = express.Router();

router.get('/', (req, res) => {
    console.log('staff router hit!');
    knex.select().where('role', 'admin').from('users')
    .then(function(result) {
        res.send(result);
    })
    .catch(function(error) {
        console.log('error in get:', error);
        res.sendStatus(500);
    });
}); //end router.get

router.post('/', (req, res) => {

}); //end router.post

router.put('/', (req, res) => {

}); //end router.put

router.delete('/', (req, res) => {

}); //end router.delete

module.exports = router;
