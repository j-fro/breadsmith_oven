const express = require('express');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const lib = require('../lib/reportlib');

let router = express.Router();

/*
 * GET route to get a production order
 * @url params: /:date [ISO 8601 date string] // Date to generate report for
 *     /:filename (optional)[string] // Filename for export
 * @response: [CSV File] (success) || [string] (failure)
 */
router.get('/production/:date/:filename?', (req, res) => {
    console.log('Hit production report route');
    lib
        .getTallyAndExport(
            req.params.filename || 'production.csv',
            moment(req.params.date)
        )
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

/*
 * GET route to get an invoice order
 * @url params: /:startDate [ISO 8601 date string] // Date to start report
 *     /:endDate [ISO 8601 date string] // Date to end report
 *     /:filename (optional)[string] // Filename for export
 * @response: [CSV File] (success) || [string] (failure)
 */
router.get('/invoice/:startDate/:endDate/:filename?', (req, res) => {
    console.log(req.params.startDate);
    lib
        .getOrdersAndExport(
            req.params.filename || 'invoice.csv',
            moment(req.params.startDate),
            moment(req.params.endDate).hours(24)
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
