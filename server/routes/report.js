const express = require('express');
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');
const lib = require('../lib/reportlib');

let router = express.Router();

router.get('/production/:date/:filename?', (req, res) => {
    console.log('Hit production report route');
    lib
        .getTallyAndExport(req.params.filename || 'production.csv', new Date(
            req.params.date
        ))
        .then(() => {
            console.log('Getting to then');
            res.sendFile(
                path.join(
                    __dirname,
                    '../../reports/',
                    req.params.filename || 'production.csv'
                )
            );
        })
        .catch(err => res.send('No complete orders found'));
});

router.get('/packing/:orders', (req, res) => {
    let html = fs.readFileSync(
        path.join(__dirname, '../templates/packinglist.hbs'),
        'utf8'
    );
    console.log(req.params.orders);
    let template = handlebars.compile(html);
    html = template({name: 'name', orders: JSON.parse(req.params.orders)});
    console.log(html);
    res.send(html);
});

router.post('/packing', (req, res) => {
    let html = fs.readFileSync(
        path.join(__dirname, '../templates/packinglist.hbs'),
        'utf8'
    );
    console.log(req.body.orders);
    let template = handlebars.compile(html);
    html = template({name: 'name', orders: req.body.orders});
    console.log(html);
    res.send(html);
});

module.exports = router;
