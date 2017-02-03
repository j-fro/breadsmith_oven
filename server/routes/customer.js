const express = require('express');
const lib = require('../lib/clientlib');

let router = express.Router();

router.get('/', (req, res) => {
    // Not implemented
    res.sendStatus(501);
});

router.get('/:id', (req, res) => {
    lib
        .getCustomerById(custId)
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
    // Not implemented
    res.sendStatus(501);
});

module.exports = router;
