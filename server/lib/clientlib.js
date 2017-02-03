const knex = require('../database/dbConfig');

function getCustomerById(custId) {
    return new Promise((resolve, reject) => {
        knex
            .select()
            .from('customers')
            .where('id', custId)
            .then(customers => resolve(customers[0]))
            .catch(err => reject(err));
    });
}

module.exports = {
    getCustomerById: getCustomerById
};
