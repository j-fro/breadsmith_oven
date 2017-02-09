const express = require('express');
const knex = require('../database/dbConfig');
let router = express.Router();

router.get('/', (req, res) => {
    console.log('staff router hit!');
    knex.select().where('role', 'admin').from('users')
    .then(function(result) {
        res.send(result);
    })
    .catch(function(error) {
        console.log('error in get:', error);
        res.sendStatus(500);
    });
}); //end router.get

router.post('/', (req, res) => {
  console.log('adding user:', req.body);
  knex.insert({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    role: req.body.role
  }).into('users')
  .then(function() {
      res.sendStatus(200);
  }).catch(function(error) {
      console.log('error in post:', error);
      res.sendStatus(500);
  });
}); //end router.post

router.put('/', (req, res) => {
  console.log('updating user:', req.body.id);
  knex.update(req.body).where('id', req.body.id).from('users')
  .then(function(){
    res.sendStatus(200);
  }).catch(function(error){
    console.log('problem updating:', error);
    res.sendStatus(500);
  });
}); //end router.put

router.delete('/:id', (req, res) => {
  console.log('deleting user:', req.params.id);
  knex.where('id', req.params.id).del().from('users')
      .then(function() {
          res.sendStatus(200);
      }).catch(function(error) {
          console.log('problem deleting:', error);
          res.sendStatus(500);
      });
}); //end router.delete

module.exports = router;
