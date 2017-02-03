const knex = require('../database/dbConfig');

function getCustomerById(custId) {
    return new Promise((resolve, reject) => {
        knex
            .select(
                'customers.id',
                'name',
                'address',
                'type',
                'variety',
                'price',
                'regular',
                'last_order_date',
                'products.id as product_id'
            )
            .from('customers')
            .where('customers.id', custId)
            .join('permitted_products', 'customers.id', 'customer_id')
            .join('products', 'product_id', 'products.id')
            .then(customers => resolve(aggregateCustomer(customers)))
            .catch(err => reject(err));
    });
}

function addCustomer(customer) {
    return new Promise((resolve, reject) => {
        let inserts = [];
        knex
            .insert({
                name: req.body.name,
                address: req.body.address
            })
            .into('customers')
            .then(id => {
                req.body.products.forEach(prod => {
                    inserts.push(
                        knex
                            .insert({
                                customer_id: id,
                                product_id: prod.id,
                                regular: prod.regular
                            })
                            .into('permitted_products')
                    );
                });
                Promise.all(inserts)
                    .then(() => resolve())
                    .catch(err => reject(err));
            });
    });
}

module.exports = {
    getCustomerById: getCustomerById,
    addCustomer: addCustomer
};

function aggregateCustomer(results) {
    return results.reduce(
        (obj, row) => {
            obj.name = row.name;
            obj.address = row.address;
            obj.id = row.id;
            obj.last_order_date = row.last_order_date;
            if (typeof obj.products !== 'undefined') {
                obj.products.push({
                    id: row.product_id,
                    type: row.type,
                    variety: row.variety,
                    price: row.price,
                    regular: row.regular
                });
            } else {
                obj.products = [
                    {
                        id: row.product_id,
                        type: row.type,
                        variety: row.variety,
                        price: row.price,
                        regular: row.regular
                    }
                ];
            }
            return obj;
        },
        {}
    );
}
