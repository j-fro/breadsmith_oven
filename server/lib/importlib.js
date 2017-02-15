const knex = require('../database/dbConfig');

function parseCustomerFile(file) {
    createCustomers(file).then(results => createProducts(file, results));
}

function createProducts(file, customerResults) {
    console.log(file.map(x => x['Product Name']));
    console.log(file.map(x => x['Product Description']));
    knex
        .select()
        .from('products')
        .whereIn('type', file.map(x => x['Product Name']))
        .whereIn('variety', file.map(x => x['Product Description']))
        .then(results => console.log(results));
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
