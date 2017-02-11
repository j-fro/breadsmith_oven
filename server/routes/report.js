const express = require('express');
const path = require('path');
const fs = require('fs');
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
            res
                .set('Content-Type', 'application/csv')
                .sendFile(
                    path.join(
                        __dirname,
                        '../../reports/',
                        req.params.filename || 'production.csv'
                    )
                );
        })
        .catch(err => res.send('No complete orders found'));
});

router.get('/invoice/:startDate/:endDate/:filename?', (req, res) => {
    console.log(req.params.filename);
    lib
        .getOrdersAndExport(
            req.params.filename || 'invoice.csv',
            new Date(req.params.startDate),
            new Date(req.params.endDate)
        )
        .then(() => {
            res
                .set('Content-Type', 'application/csv')
                .sendFile(
                    path.join(
                        __dirname,
                        '../../reports/',
                        req.params.filename || 'invoice.csv'
                    )
                );
        })
        .catch(err => res.send('No invoices found'));
});

module.exports = router;
