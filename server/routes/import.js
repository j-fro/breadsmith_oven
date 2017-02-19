const express = require('express');
const lib = require('../lib/importlib');

let router = express.Router();

/*
 * POST route for customer import
 * @data params: [
 *     Array: {
 *         'Company Name': [string],
 *         'Address': (optional)[string]
 *         'Primary Contact Name': (optional)[string]
 *         'Primary Phone Number': (optional)[string]
 *         'Primary Email': [string]
 *         'Secondary Contact Name': (optional)[string]
 *         'Secondary Phone Number': (optional)[string]
 *         'Secondary Email': (optional)[string]
 *         'Product Name': [string]
 *         'Product Description': [string]
 *     }
 * ]
 * @response: 201 (success) || 500 (failure)
 */
router.post('/customer', (req, res) => {
    console.log(req.body);
    lib
        .parseCustomerFile(req.body)
        .then(() => res.sendStatus(201))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

/*
 * @data params: [
 *     Array: {
 *         'Product Name': [string],
 *         'Product Description': [string],
 *         'Product Price': [string]
 *     }
 * ]
 * @response: 201 (success) || 500 (failure)
 */
router.post('/product', (req, res) => {
    lib
        .parseProductFile(req.body)
        .then(() => res.sendStatus(201))
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

module.exports = router;
