const express = require('express');
const knex = require('../database/dbConfig');
// const pg = require('pg');
let router = express.Router();

router.get('/', (req, res) => {
    console.log('product get route hit');
    knex.select().from('products')
        .then(function(result) {
            res.send(result);
        })
        .catch(function(error) {
            console.log('error in get:', error);
            res.sendStatus(500);
        });
}); //end router.get

router.post('/', (req, res) => {
    console.log('adding product', req.body);
    knex.insert({
            type: req.body.type,
            variety: req.body.variety,
            price: req.body.price
        }).into('products')
        .then(function() {
            res.sendStatus(200);
        }).catch(function(error) {
            console.log('error in post:', error);
            res.sendStatus(500);
        });
}); //end router.post

router.put('/', (req, res) => {
  console.log('updating:', req.body.id);
  knex.update(req.body).where('id', req.body.id).from('products')
  .then(function(){
    res.sendStatus(200);
  }).catch(function(error){
    console.log('error updating:', error);
    res.sendStatus(500);
  });
}); //end router.put

router.delete('/:id', (req, res) => {
    console.log('Deleting product id:', req.params.id);
    knex.where('id', req.params.id).del().from('products')
        .then(function() {
            res.sendStatus(200);
        }).catch(function(error) {
            console.log('error in delete:', error);
            res.sendStatus(500);
        });
}); //end router.delete

module.exports = router;
