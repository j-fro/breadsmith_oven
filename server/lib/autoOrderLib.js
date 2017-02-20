const moment = require('moment');
const schedule = require('node-schedule');
const knex = require('../database/dbConfig');

/**
 * Returns an asynchronous Promise to query the database for automatic order
 * totals by customer ID for a given day
 * @param {string} day Recurrance day (case sensitive) e.g. 'Monday'
 * @returns {Promise}
 */
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

/**
 * Returns an asynchronous Promise to query the database for automatic order
 * data by customer ID for a given day
 * @param {string} day Recurrance day (case sensitive) e.g. 'Monday'
 * @returns {Promise}
 */
function getItemData(day) {
    return knex
        .select()
        .from('recurring_order_items')
        .join('customers', 'customer_id', 'customers.id')
        .join('products', 'product_id', 'products.id')
        .where('recur_day', day);
}

/**
 * Maps a row from getOrderData to an order object (without products)
 * @param {Object} row a row with keys customer_id, total_cost, total_qty
 * @returns {Object} a partial order object
 */
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

/**
 * Maps a row from getItemData to a product object with an order_id matching
 * row's customer id
 * @param {Object} row a row with keys product_id, qty
 * @param {Object[]} orders an array of orders from mapToOrders
 * @returns {Object} an order_item
 */
function mapToProducts(row, orders) {
    return {
        product_id: row.product_id,
        qty: row.qty,
        order_id: orders.find(x => x.customer_id === row.customer_id).id
    };
}

/**
 * Returns an asynchronous Promise to insert orders into the database
 * @param {Object[]} orders an array of orders from mapToOrders
 * @returns {Promise}
 */
function createOrders(orders) {
    return knex.insert(orders).into('orders').returning(['id', 'customer_id']);
}

/**
 * Gets recurring order info from the database and uses it to generate orders,
 * then inserts them into the database
 * @param {string} day Recurrance day (case sensitive) e.g. 'Monday'
 */
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

/**
 * Schedules a job that executes daily and generates new orders based on
 * recurring order data
 */
function scheduleOrders() {
    console.log('Scheduling auto orders');
    schedule.scheduleJob({hour: 21, minute: 45}, () => {
        console.log('Generating orders');
        generateOrders(moment().format('dddd'));
    });
}

/**
 * Returns an asynchronous Promise to query all recurring order items from the
 * db
 * @returns {Promise}
 */
function getAllAutoOrders() {
    return knex
        .select(
            'recurring_order_items.id',
            'name',
            'type',
            'variety',
            'price',
            'recur_day',
            'qty'
        )
        .from('recurring_order_items')
        .join('customers', 'customer_id', 'customers.id')
        .join('products', 'product_id', 'products.id');
}

/**
 * Returns an asynchronous Promise to query all recurring order items from the
 * db for a specific customer id
 * @param {integer} id An existing customer's id
 * @returns {Promise}
 */
function getCustomerAutoOrders(id) {
    return knex
        .select(
            'recurring_order_items.id',
            'name',
            'type',
            'variety',
            'price',
            'recur_day',
            'qty'
        )
        .from('recurring_order_items')
        .join('customers', 'customer_id', 'customers.id')
        .join('products', 'product_id', 'products.id')
        .where('customer_id', id);
}

/**
 * Returns an asynchronous Promise to delete a specific item/day/customer
 * recurrance combination from the db
 * @param {integer} id An existing recurrance's id
 * @returns {Promise}
 */
function deleteAutoOrder(id) {
    return knex.from('recurring_order_items').where('id', id).delete();
}

/**
 * Returns an asynchronous Promise to change an existing item/day/customer
 * recurrance combination
 * @param {Object} updatedOrder A recurring order item object
 * @returns {Promise}
 */
function updateAutoOrder(updatedOrder) {
    return knex
        .update(updatedOrder)
        .from('recurring_order_items')
        .where('id', updatedOrder.id);
}

module.exports = {
    scheduleOrders: scheduleOrders,
    getAllAutoOrders: getAllAutoOrders,
    getCustomerAutoOrders: getCustomerAutoOrders,
    deleteAutoOrder: deleteAutoOrder,
    updateAutoOrder: updateAutoOrder
};
