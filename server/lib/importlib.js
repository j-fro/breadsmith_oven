const knex = require('../database/dbConfig');

function parseCustomerFile(file) {
    return new Promise((resolve, reject) => {
        createCustomers(file)
            .then(results =>
                createProducts(file, results)
                    .then(() => resolve())
                    .catch(err => reject(err)))
            .catch(err => reject(err));
    });
}

function createProducts(file, customerResults) {
    return new Promise((resolve, reject) => {
        getExistingProduts(file)
            .then(results => {
                file = mapProductIds(file, results);
                file = mapCustomerIds(file, customerResults);
                console.log(file);
                knex
                    .insert(file.map(sanitize))
                    .into('permitted_products')
                    .then(() => resolve())
                    .catch(err => reject(err));
            })
            .catch(err => reject(err));
    });
}

function getExistingProduts(file) {
    return knex
        .select()
        .from('products')
        .whereIn('type', file.map(x => x['Product Name']))
        .orWhereIn('variety', file.map(x => x['Product Description']));
}

function mapProductIds(file, productResults) {
    console.log(productResults);
    return file.map(row => {
        row.product_id = productResults.find(product =>
            findMatchingProduct(product, row)).id;
        return row;
    });
}

function mapCustomerIds(file, customerResults) {
    return file.map(row => {
        row.customer_id = customerResults.find(
            x => x.name === row['Company Name']
        ).id;
        return row;
    });
}

function sanitize(row) {
    return {
        customer_id: row.customer_id,
        product_id: row.product_id,
        regular: true
    };
}

function findMatchingProduct(product, row) {
    if (product.variety === null) {
        product.variety = '';
    }
    return row['Product Name'] === product.type &&
        row['Product Description'] === product.variety;
}

function createCustomers(file) {
    customersToAdd = reduceCustomers(file);
    console.log('Parsed customers:', customersToAdd);
    return knex
        .insert(customersToAdd)
        .into('customers')
        .returning(['id', 'name']);
}

function reduceCustomers(file) {
    return file.reduce(
        (arr, fileRow) => {
            if (!arr.find(row => row.name === fileRow['Company Name'])) {
                arr.push({
                    name: fileRow['Company Name'],
                    address: fileRow['Address'],
                    primary_email: fileRow['Primary Email'],
                    primary_phone: fileRow['Primary Phone Number'],
                    primary_contact_name: fileRow['Primary Contact Name'],
                    secondary_email: fileRow['Secondary Email'],
                    secondary_phone: fileRow['Secondary Phone Number'],
                    secondary_contact_name: fileRow['Secondary Contact Name']
                });
            }
            return arr;
        },
        []
    );
}

module.exports = {parseCustomerFile: parseCustomerFile};
