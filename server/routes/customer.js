const express = require('express');
const lib = require('../lib/customerlib');
const jwt = require('jwt-simple');

let router = express.Router();

router.get('/', (req, res) => {
    lib.getAllCustomers().then(customers => res.send(customers)).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.get('/:id', (req, res) => {
    lib
        .getCustomerById(req.params.id)
        .then(customer => res.send(customer))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    lib.addCustomer(req.body).then(() => res.sendStatus(201)).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.put('/', (req, res) => {
    lib.editCustomer(req.body).then(() => res.sendStatus(200)).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
    lib
        .deleteCustomer(req.params.id)
        .then(() => res.sendStatus(200))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

module.exports = router;
