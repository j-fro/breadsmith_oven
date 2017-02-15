const fs = require('fs');
const path = require('path');
const json2csv = require('json2csv');
const moment = require('moment');
const knex = require('../database/dbConfig');

function getOrdersAndExport(filename, beginDate, endDate) {
    return new Promise((resolve, reject) => {
        knex
            .select()
            .from('orders')
            .join('order_items', 'orders.id', 'order_id')
            .join('products', 'product_id', 'products.id')
            .join('customers', 'orders.customer_id', 'customers.id')
            .where('created', '>', beginDate.format('YYYY-MM-DD'))
            .andWhere('created', '<', endDate.format('YYYY-MM-DD'))
            .then(result =>
                exportCsv(result, filename)
                    .then(resolve())
                    .catch(err => reject(err)))
            .catch(err => reject(err));
    });
}

function exportCsv(orders, filename) {
    console.log('Exporting:', orders);
    return new Promise((resolve, reject) => {
        if (orders[0]) {
            let fields = Object.keys(orders[0]);
            let csv = json2csv({data: orders, fields: fields});
            fs.writeFileSync(
                path.join(
                    __dirname,
                    '../../reports/',
                    filename || 'order_report.csv'
                ),
                csv
            );
            resolve();
        } else {
            reject('No orders found');
        }
    });
}

function getTallyAndExport(filename, date) {
    let endDate = date ? moment(date) : moment();
    endDate.hours(24);
    return new Promise((resolve, reject) => {
        knex
            .select('type')
            .sum('qty')
            .from('orders')
            .join('order_items', 'orders.id', 'order_id')
            .join('products', 'product_id', 'products.id')
            .where('created', '>', date.format('YYYY-MM-DD'))
            .andWhere('created', '<', endDate.format('YYYY-MM-DD'))
            .andWhere('status', true)
            .groupBy('type')
            .then(result =>
                exportCsv(result, filename)
                    .then(() => resolve())
                    .catch(err => reject(err)))
            .catch(err => reject(err));
    });
}

module.exports = {
    getTallyAndExport: getTallyAndExport,
    getOrdersAndExport: getOrdersAndExport
};
