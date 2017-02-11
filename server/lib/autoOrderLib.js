const moment = require('moment');
const knex = require('../database/dbConfig');

function getOrderData(day) {
    return knex
        .select('customer_id', knex.raw('sum(price * qty) as total_cost'))
        .sum('qty as total_qty')
        .from('recurring_order_items')
        .join('customers', 'customer_id', 'customers.id')
        .join('products', 'product_id', 'products.id')
        .where('recur_day', day)
        .groupBy('customer_id');
}

function getItemData(day) {
    return knex
        .select()
        .from('recurring_order_items')
        .join('customers', 'customer_id', 'customers.id')
        .join('products', 'product_id', 'products.id')
        .where('recur_day', day);
}

function mapToOrders(row) {
    let order = {
        customer_id: row.customer_id,
        total_cost: row.total_cost,
        total_qty: row.total_qty,
        status: true,
        comments: 'AUTOMATIC ORDER',
        created: moment().format()
    };
    return order;
}

function mapToProducts(row, orders) {
    return {
        product_id: row.product_id,
        qty: row.qty,
        order_id: orders.find(x => x.customer_id === row.customer_id).id
    };
}

function createOrders(orders) {
    return knex.insert(orders).into('orders').returning(['id', 'customer_id']);
}

function generateOrders(day) {
    getOrderData(day)
        .then(results => {
            let ordersToInsert = results.map(mapToOrders);
            Promise.all([createOrders(ordersToInsert), getItemData(day)])
                .then(results => {
                    console.log('Results:', results);
                    let orders = results[0];
                    let productsToInsert = results[1].map(row =>
                        mapToProducts(row, orders));
                    knex
                        .insert(productsToInsert)
                        .into('order_items')
                        .then(() => console.log('yay'))
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}

generateOrders('monday');
