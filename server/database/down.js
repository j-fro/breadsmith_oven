const knex = require('../database/dbConfig');

knex
    .raw(
        `
    DROP TABLE customers CASCADE;
    DROP TABLE users CASCADE;
    DROP TABLE orders CASCADE;
    DROP TABLE products CASCADE;
    DROP TABLE order_items CASCADE;
    DROP TABLE permitted_products CASCADE;
    DROP TABLE recurring_order_items CASCADE;
    `
    )
    .then(() => {
        console.log('success');
        process.exit(1);
    })
    .catch(err => {
        console.log(err);
        process.exit(-1);
    });
