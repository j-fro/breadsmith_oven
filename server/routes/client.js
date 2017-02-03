const express = require('express');
const knex = require('../dbConfig');
let router = express.Router();

router.get('/', (req, res) => {
    // Not implemented
    res.sendStatus(501);
});

router.get('/:id', (req, res) => {
    getCustomerById(custId).then(customer => res.send(customer)).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    // Not implemented
    res.sendStatus(501);
});

router.put('/', (req, res) => {
    // Not implemented
    res.sendStatus(501);
});

router.delete('/:id', (req, res) => {
    // Not implemented
    res.sendStatus(501);
});

function getCustomerById(custId) {
    return new Promise((resolve, reject) => {
        knex
            .select()
            .from('customers')
            .where('id', custId)
            .then(customers => resolve(customers[0]))
            .catch(err => reject(err));
    });
}
