const express = require('express');
const path = require('path');
let router = express.Router();

router.get('/', (req, res) => {
    let indexPath = path.join(__dirname, '../../public/views/index.html');
    res.sendFile(indexPath);
});

router.get('/customerHome', (req, res) => {
    let customerPath = path.join(
        __dirname,
        '../../public/views/customer/customerHome.html'
    );
    res.sendFile(customerPath);
});

router.get('/adminIndex', (req, res) => {
    let adminPath = path.join(
        __dirname,
        '../../public/views/admin/adminIndex.html'
    );
    res.sendFile(adminPath);
});

module.exports = router;
