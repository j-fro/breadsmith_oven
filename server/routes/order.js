// Routes for managing orders in the DB. All routes should be prepended with
// /order

const express = require('express');
const lib = require('../lib/orderlib');

let router = express.Router();

/*
 * GET route to get all orders
 * @response: [
 *     Array: {
 *         id: [integer],
 *         customer_id: [integer],
 *         customer_name: [string],
 *         customer_address: [string],
 *         primary_contact_name: [string],
 *         primary_email: [string],
 *         secondary_contact_name: [string],
 *         secondary_email: [string],
 *         total_qty: [integer],
 *         total_cost: [float],
 *         created: [date string],
 *         status: [bool],
 *         comments: [string],
 *         products: [
 *             Array: {
 *                 id: [integer],
 *                 qty: [integer],
 *                 price: [float],
 *                 type: [string],
 *                 variety: [string]
 *             }
 *         ]
 *     }
 * ] (success) || 500 (failure)
 */
router.get('/', (req, res) => {
    lib.getOrders().then(orders => res.send(orders)).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

/*
 * GET route to get all orders created on a certain date
 * @url params: /:date [ISO 8601 date string]
 * @response: [
 *     Array: {
 *         id: [integer],
 *         customer_id: [integer],
 *         customer_name: [string],
 *         customer_address: [string],
 *         primary_contact_name: [string],
 *         primary_email: [string],
 *         secondary_contact_name: [string],
 *         secondary_email: [string],
 *         total_qty: [integer],
 *         total_cost: [float],
 *         created: [date string],
 *         status: [bool],
 *         comments: [string],
 *         products: [
 *             Array: {
 *                 id: [integer],
 *                 qty: [integer],
 *                 price: [float],
 *                 type: [string],
 *                 variety: [string]
 *             }
 *         ]
 *     }
 * ] (success) || 500 (failure)
 */
router.get('/:date', (req, res) => {
    lib
        .getOrdersByDate(new Date(req.params.date))
        .then(orders => res.send(orders))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

/*
 * POST route to add a new order to the DB
 * @data param: {
 *     customer_id: [integer],
 *     created: (optional)[date string],
 *     status: [bool],
 *     comments: [string],
 *     products: [
 *         Array: {
 *             id: [integer],
 *             qty: [integer],
 *         }
 *     ]
 * }
 * @response: 201 (success) || 500 (failure)
 */
router.post('/', (req, res) => {
    console.log(req.body);
    lib
        .addOrder(req.body)
        .then(id => res.status(201).send({id: id}))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

/*
 * POST route to create a new order recurrance (but not a new order) in the DB
 * @data param: {
 *     customer_id: [integer],
 *     days: [
 *         Array: [string] // Case sensitive day to recur on (e.g. Monday, etc.)
 *     ],
 *     products: [
 *         Array: {
 *             id: [integer],
 *             qty: [integer],
 *         }
 *     ]
 * }
 * @response: 201 (success) || 500 (failure)
 */
router.post('/recurring', (req, res) => {
    lib
        .addRecurringOrder(
            {
                customer_id: req.body.customer_id,
                products: req.body.products
            },
            req.body.days
        )
        .then(() => res.sendStatus(200))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

/*
 * PUT route to change an existing order
 * @data param: {
 *     id: [integer],
 *     status: [bool],
 *     comments: [string],
 *     products: [
 *         Array: {
 *             id: [integer],
 *             qty: [integer],
 *         }
 *     ]
 * }
 * @response: 200 (success) || 500 (failure)
 */
router.put('/', (req, res) => {
    lib.editOrder(req.body).then(() => res.sendStatus(200)).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
});

/*
 * PUT route to confirm an existing order (i.e. change status to true)
 * @url: /confirm
 * @url param: /:id [integer] // The ID of the order to confirm
 * @response: 200 (success) || 500 (failure)
 */
router.put('/confirm/:id', (req, res) => {
    lib
        .confirmOrder(req.params.id)
        .then(() => res.sendStatus(200))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

/*
 * DELETE route to remove an order from the DB
 * @url params: /:id [integer] // ID of the desired order
 * @response: 200 (success) || 500 (failure)
 */
router.delete('/:id', (req, res) => {
    lib
        .deleteOrder(req.params.id)
        .then(() => res.sendStatus(200))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

module.exports = router;
