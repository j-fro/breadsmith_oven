const express = require('express');
const lib = require('../lib/autoOrderLib');

let router = express.Router();

router.get('/:id', (req, res) => {
    lib
        .getCustomerAutoOrders(req.params.id)
        .then(results => res.send(results))
        .catch(err => {
            console.log(err);
            res
                .status(500)
                .send(
                    'There was an error retrieving automatic orders for customer #',
                    req.params.id
                );
        });
});

module.exports = router;
