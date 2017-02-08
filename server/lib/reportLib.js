const fs = require('fs');
const path = require('path');
const json2csv = require('json2csv');
const knex = require('../database/dbConfig');

function getOrdersAndExport(filename, beginDate, endDate) {
    knex
        .select()
        .from('orders')
        .join('order_items', 'orders.id', 'order_id')
        .join('products', 'product_id', 'products.id')
        .then(result => exportCsv(result, filename))
        .catch(err => console.log(err));
}

function exportCsv(orders, filename, callback) {
    console.log(typeof orders);
    if (orders[0]) {
        let fields = Object.keys(orders[0]);
        let csv = json2csv({data: orders, fields: fields});
        fs.writeFile(
            path.join(
                __dirname,
                '../../reports/',
                filename || 'order_report.csv'
            ),
            csv,
            err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('File Saved');
                    callback();
                }
            }
        );
    }
}

function getTallyAndExport(filename, date, callback) {
    knex
        .select('type')
        .sum('qty')
        .from('orders')
        .join('order_items', 'orders.id', 'order_id')
        .join('products', 'product_id', 'products.id')
        .where('created', '>', date || new Date())
        .andWhere('status', true)
        .groupBy('type')
        .then(result => exportCsv(result, filename, callback))
        .catch(err => err);
}

module.exports = {
    getTallyAndExport: getTallyAndExport
};
