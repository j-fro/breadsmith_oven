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

router.delete('/:id', (req, res) => {
    lib
        .deleteAutoOrder(req.params.id)
        .then(() => res.sendStatus(200))
        .catch(err => {
            console.log(err);
            res
                .status(500)
                .send(
                    'There was an error deleting automatic order #',
                    req.params.id
                );
        });
});

router.put('/', (req, res) => {
    lib.updateAutoOrder(req.body).then(() => res.sendStatus(200)).catch(err => {
        console.log(err);
        res
            .status(500)
            .send(
                'Failed to update automatic order#',
                req.body.id,
                ': bad data supplied'
            );
    });
});

module.exports = router;
