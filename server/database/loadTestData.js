const path = require('path');
const fs = require('fs');
const knex = require('../database/dbConfig');

let customers = fs.readFileSync(
    path.join(__dirname, 'test_data/customers.sql'),
    'utf8'
);
let products = fs.readFileSync(
    path.join(__dirname, 'test_data/products.sql'),
    'utf8'
);
let inserts = [];
inserts.push(knex.raw(customers));
inserts.push(knex.raw(products));
Promise.all(inserts)
    .then(() => {
        let users = fs.readFileSync(
            path.join(__dirname, 'test_data/users.sql'),
            'utf8'
        );
        let orders = fs.readFileSync(
            path.join(__dirname, 'test_data/orders.sql'),
            'utf8'
        );
        let permitted_products = fs.readFileSync(
            path.join(__dirname, 'test_data/permitted_products.sql'),
            'utf8'
        );
        let recurring_order_items = fs.readFileSync(
            path.join(__dirname, 'test_data/recurring_order_items.sql'),
            'utf8'
        );
        let inserts = [];
        inserts.push(knex.raw(users));
        inserts.push(knex.raw(orders));
        inserts.push(knex.raw(permitted_products));
        inserts.push(knex.raw(recurring_order_items));
        Promise.all(inserts)
            .then(() => {
                let order_items = fs.readFileSync(
                    path.join(__dirname, 'test_data/order_items.sql'),
                    'utf8'
                );
                knex.raw(order_items).then(() => process.exit(0)).catch(err => {
                    console.log(err);
                    process.exit(-1);
                });
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
