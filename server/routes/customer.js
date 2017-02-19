const express = require('express');
const lib = require('../lib/customerlib');

let router = express.Router();

/*
 * GET route for all customers
 * @response: [
 *     Array: {
 *         id: [integer],
 *         name: [string],
 *         address: [string],
 *         last_order_date: [string],
 *         primary_contact_name: [string],
 *         primary_phone: [string],
 *         primary_email: [string]
 *         secondary_contact_name: [string]
 *         secondary_phone: [string],
 *         secondary_email: [string]
 *         products: [
 *             Array: {
 *                 id: [integer],
 *                 type: [string],
 *                 variety: [string],
 *                 price: [real],
 *                 regular: [bool]
 *             }
 *         ]
 *    }
 * ] (success) || 500 (failure)
 */
router.get('/', (req, res) => {
    lib.getAllCustomers().then(customers => res.send(customers)).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

/*
 * GET route for a specified customer
 * @url params: /:id [integer]
 * @response: {
 *     id: [integer],
 *     name: [string],
 *     address: [string],
 *     last_order_date: [string],
 *     primary_contact_name: [string],
 *     primary_phone: [string],
 *     primary_email: [string]
 *     secondary_contact_name: [string]
 *     secondary_phone: [string],
 *     secondary_email: [string]
 *     products: [
 *         Array: {
 *             id: [integer],
 *             type: [string],
 *             variety: [string],
 *             price: [real],
 *             regular: [bool]
 *         }
 *     ]
 * } (success) || 500 (failure)
 */
router.get('/:id', (req, res) => {
    lib
        .getCustomerById(req.params.id)
        .then(customer => res.send(customer))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

/* POST route to add a customer
 * @data params: {
 *     name: [string],
 *     address: (optional)[string],
 *     primary_contact_name: (optional)[string],
 *     primary_phone: (optional)[string],
 *     primary_email: [string]
 *     secondary_contact_name: (optional)[string]
 *     secondary_phone: (optional)[string],
 *     secondary_email: (optional)[string]
 *     products: (optional)[
 *         Array: {
 *             id: [integer],
 *             type: [string],
 *             variety: [string],
 *             price: [real],
 *             regular: (optional)[bool]
 *         }
 *     ]
 * }
 * @response: 201 (success) || 500 (failure)
 */
router.post('/', (req, res) => {
    lib.addCustomer(req.body).then(() => res.sendStatus(201)).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

/* PUT route to update a customer
 * @data params: {
 *     name: (optional)[string],
 *     address: (optional)[string],
 *     primary_contact_name: (optional)[string],
 *     primary_phone: (optional)[string],
 *     primary_email: (optional)[string]
 *     secondary_contact_name: (optional)[string]
 *     secondary_phone: (optional)[string],
 *     secondary_email: (optional)[string]
 *     products: [
 *         Array: {
 *             id: [integer],
 *             type: [string],
 *             variety: [string],
 *             price: [real],
 *             regular: (optional)[bool]
 *         }
 *     ]
 * }
 * @response: 200 (success) || 500 (failure)
 */
router.put('/', (req, res) => {
    lib.editCustomer(req.body).then(() => res.sendStatus(200)).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

/* DELETE route to remove a customer from the DB
 * @url params: /:id [integer]
 * @response: 200 (success) || 500 (failure)
 */
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
