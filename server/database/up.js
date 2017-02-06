const path = require('path');
const fs = require('fs');
const knex = require('../database/dbConfig');

let sql = fs.readFileSync(path.join(__dirname, 'create_tables.sql'), 'utf8');

knex
    .raw(sql)
    .then(() => {
        console.log('success');
        process.exit(1);
    })
    .catch(err => {
        console.log(err);
        process.exit(-1);
    });
