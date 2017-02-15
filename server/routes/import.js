const express = require('express');
const lib = require('../lib/importlib');

let router = express.Router();

router.post('/customer', (req, res) => {
    console.log(req.body);
    lib.parseCustomerFile(req.body);
    res.sendStatus(501);
});

module.exports = router;
