const path = require('path');
const fs = require('fs');
const knex = require('../database/dbConfig');

let sql = fs.readFileSync(path.join(__dirname, 'create_tables.sql'), 'utf8');

knex
    .raw(
        `
    DROP TABLE IF EXISTS customers CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS orders CASCADE;
    DROP TABLE IF EXISTS order_items CASCADE;
    DROP TABLE IF EXISTS permitted_products CASCADE;
    DROP TABLE IF EXISTS recurring_order_items CASCADE;
    `
    )
    .then(() => {
        console.log('Dropped tables');
        knex
            .raw(sql)
            .then(() => {
                console.log('Created tables');
                process.exit(0);
            })
            .catch(err => {
                console.log(err);
                process.exit(-1);
            });
    })
    .catch(err => {
        console.log(err);
        process.exit(-1);
    });
