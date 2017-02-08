const express = require('express');
const path = require('path');
const lib = require('../lib/reportlib');

let router = express.Router();

router.get('/production/:date/:filename?', (req, res) => {
    lib.getTallyAndExport(
        req.params.filename || 'production.csv',
        new Date(req.params.date),
        () => {
            console.log('Getting to then');
            res.sendFile(
                path.join(
                    __dirname,
                    '../../reports/',
                    req.params.filename || 'production.csv'
                )
            );
        }
    );
});

module.exports = router;
