const express = require('express');

let router = express.Router();

router.get('/', (req, res) => {
    let index = Math.floor(Math.random() * 2);
    res.send(['admin', 'customer'][index]);
});

module.exports = router;
