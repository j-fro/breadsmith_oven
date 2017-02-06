const path = require('path');
const fs = require('fs');
const knex = require('../database/dbConfig');

let sql = fs.readFileSync(path.join(__dirname, 'create_tables.sql'), 'utf8');

knex
    .raw(
        `
    DROP TABLE customers CASCADE;
    DROP TABLE users CASCADE;
    DROP TABLE products CASCADE;
    DROP TABLE orders CASCADE;
    DROP TABLE order_items CASCADE;
    DROP TABLE permitted_products CASCADE;
    DROP TABLE recurring_order_items CASCADE;
    `
    )
    .then(() => {
        console.log('Dropped tables');
        knex
            .raw(sql)
            .then(() => {
                console.log('Created tables');
                process.exit(1);
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
