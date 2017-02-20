const express = require('express');
const knex = require('../database/dbConfig');
let router = express.Router();

/*
 * GET route to get all administrators
 * @response: [
 *     Array: {
 *         id: [integer],
 *         first_name: [string],
 *         last_name: [string],
 *         email: [string],
 *         role: [string]
 *     }
 * ] (success) || 500 (failure)
 */
router.get('/', (req, res) => {
    console.log('staff router hit!');
    knex
        .select()
        .where('role', 'admin')
        .from('users')
        .then(function(result) {
            res.send(result);
        })
        .catch(function(error) {
            console.log('error in get:', error);
            res.sendStatus(500);
        });
}); //end router.get

/*
 * POST route to add a new user
 * @data param: {
 *     first_name: (optional)[string],
 *     last_name: (optional)[string],
 *     email: [string],
 *     role: [string]
 * }
 * @response: 200 (success) || 500 (failure)
 */
router.post('/', (req, res) => {
    console.log('adding user:', req.body);
    knex
        .insert({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            role: req.body.role
        })
        .into('users')
        .then(function() {
            res.sendStatus(200);
        })
        .catch(function(error) {
            console.log('error in post:', error);
            res.sendStatus(500);
        });
}); //end router.post

/*
 * PUT route to update an existing user
 * @data param: {
 *     id: [integer],
 *     first_name: (optional)[string],
 *     last_name: (optional)[string],
 *     email: (optional)[string],
 *     role: (optional)[string]
 * }
 * @response: 200 (success) || 500 (failure)
 */
router.put('/', (req, res) => {
    console.log('updating user:', req.body.id);
    knex
        .update(req.body)
        .where('id', req.body.id)
        .from('users')
        .then(function() {
            res.sendStatus(200);
        })
        .catch(function(error) {
            console.log('problem updating:', error);
            res.sendStatus(500);
        });
}); //end router.put

/*
 * DELETE route to remove an existing user
 * @url param: /:id [integer]
 * @response: 200 (success) || 500 (failure)
 */
router.delete('/:id', (req, res) => {
    console.log('deleting user:', req.params.id);
    knex
        .where('id', req.params.id)
        .del()
        .from('users')
        .then(function() {
            res.sendStatus(200);
        })
        .catch(function(error) {
            console.log('problem deleting:', error);
            res.sendStatus(500);
        });
}); //end router.delete

module.exports = router;
