// Routes for managing product data in the DB. All routes should be prepended
// with /product

const express = require('express');
const knex = require('../database/dbConfig');
let router = express.Router();

/*
 * GET route to get all products
 * @response: [
 *     Array: {
 *         id: [integer],
 *         type: [string],
 *         variety: [string],
 *         price: [float]
 *     }
 * ] (success) || 500 (failure)
 */
router.get('/', (req, res) => {
    console.log('product get route hit');
    knex
        .select()
        .from('products')
        .then(result => res.send(result))
        .catch(error => {
            console.log('error in get:', error);
            res.sendStatus(500);
        });
}); //end router.get

/*
 * POST route to add a new product to the DB
 * @data param: {
 *     type: [string],
 *     variety: [string],
 *     price: [float]
 * }
 * @response: 200 (success) || 500 (failure)
 */
router.post('/', (req, res) => {
    console.log('adding product', req.body);
    knex
        .insert({
            type: req.body.type,
            variety: req.body.variety,
            price: req.body.price
        })
        .into('products')
        .then(() => res.sendStatus(200))
        .catch(error => {
            console.log('error in post:', error);
            res.sendStatus(500);
        });
}); //end router.post

/*
 * PUT route to edit an existing product
 * @data param: {
 *     id: [integer],
 *     type: (optional)[string],
 *     variety: (optional)[string],
 *     price: (optional)[float]
 * }
 * @response: 200 (success) || 500 (failure)
 */
router.put('/', (req, res) => {
    console.log('updating:', req.body.id);
    knex
        .update(req.body)
        .where('id', req.body.id)
        .from('products')
        .then(() => res.sendStatus(200))
        .catch(error => {
            console.log('error updating:', error);
            res.sendStatus(500);
        });
}); //end router.put

/*
 * DELETE route to remove a product from the DB
 * @url params: /:id [integer] // ID of the desired product
 * @response: 200 (success) || 500 (failure)
 */
router.delete('/:id', (req, res) => {
    console.log('Deleting product id:', req.params.id);
    knex
        .where('id', req.params.id)
        .del()
        .from('products')
        .then(() => res.sendStatus(200))
        .catch(error => {
            console.log('error in delete:', error);
            res.sendStatus(500);
        });
}); //end router.delete

module.exports = router;
