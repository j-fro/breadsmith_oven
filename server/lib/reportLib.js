const fs = require('fs');
const path = require('path');
const json2csv = require('json2csv');
const knex = require('../database/dbConfig');

function getOrders() {
    knex
        .select()
        .from('orders')
        .join('order_items', 'orders.id', 'order_id')
        .join('products', 'product_id', 'products.id')
        .then(result => exportOrderCsv(result))
        .catch(err => console.log(err));
}

function exportOrderCsv(orders) {
    console.log(typeof orders[0]);
    let fields = Object.keys(orders[0]);
    let csv = json2csv({data: orders, fields: fields});
    fs.writeFile(
        path.join(__dirname, '../../reports/order_report.csv'),
        csv,
        err => {
            if (err) {
                console.log(err);
            } else {
                console.log('File Saved');
            }
        }
    );
}

getOrders();
