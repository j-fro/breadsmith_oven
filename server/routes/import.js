const express = require('express');
const lib = require('../lib/importlib');

let router = express.Router();

router.post('/customer', (req, res) => {
    console.log(req.body);
    lib
        .parseCustomerFile(req.body)
        .then(() => res.sendStatus(201))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

module.exports = router;
