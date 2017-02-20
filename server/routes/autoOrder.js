const express = require('express');
const lib = require('../lib/autoOrderLib');

let router = express.Router();

/*
 * GET route to find a single user's automatic order items
 * @url params: /:id [integer] // ID of the desired of the customer
 * @response: [
 *     Array: {
 *         id: [integer],
 *         name: [string], // Customer name
 *         type: [string], // Product type
 *         variety: [string], // Product variety
 *         price: [float], // Unit price
 *         recur_day: [string],
 *         qty: [integer]
 *     }
 * ] (success) || 500 + error [string] (failure)
 */
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

/*
 * DELETE route to remove a single item/day/customer recurrance
 * @url params: /:id [integer] // ID of the desired recurrance
 * @response: 200 (success) || 500 + message [string] (failure)
 */
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

/*
 * PUT route to change a single item/day/customer recurrance
 * @data params: {
 *     id: [integer],
 *     recur_day: (optional)[string], // Case sensitive, e.g. Monday, Tuesday, etc.
 *     qty: (optional)[integer]
 * }
 * @response: 200 (success) || 500 + message [string] (failure)
 */
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
