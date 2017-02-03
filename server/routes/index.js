const express = require('express');
const path = require('path');
let router = express.Router();

router.get('/', (req, res) => {
    let indexPath = path.join(__dirname, '../../public/views/index.html');
    res.sendFile(indexPath);
});

module.exports = router;
