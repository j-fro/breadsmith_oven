const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgres://localhost:5432/breadsmith',
  debug: true
});

module.exports = knex;
