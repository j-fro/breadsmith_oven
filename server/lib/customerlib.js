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
                'email',
                'phone',
                'contact_name',
                'products.id as product_id'
            )
            .from('customers')
            .where('customers.id', custId)
            .leftOuterJoin('permitted_products', 'customers.id', 'customer_id')
            .leftOuterJoin('products', 'product_id', 'products.id')
            .then(customers => resolve(aggregateCustomer(customers)))
            .catch(err => reject(err));
    });
}

function getAllCustomers() {
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
                'email',
                'phone',
                'contact_name',
                'products.id as product_id'
            )
            .from('customers')
            .leftOuterJoin('permitted_products', 'customers.id', 'customer_id')
            .leftOuterJoin('products', 'product_id', 'products.id')
            .orderBy('id')
            .then(customers => resolve(separateCustomers(customers)))
            .catch(err => reject(err));
    });
}

function addCustomer(customer) {
    return new Promise((resolve, reject) => {
        let inserts = [];
        knex
            .insert(
                {
                    name: customer.name,
                    address: customer.address,
                    email: customer.email,
                    phone: customer.phone,
                    contact_name: customer.contact_name
                },
                'id'
            )
            .into('customers')
            .then(id => {
                customer.products.forEach(prod => {
                    inserts.push(
                        knex
                            .insert({
                                customer_id: id[0],
                                product_id: prod.id,
                                regular: prod.regular
                            })
                            .into('permitted_products')
                    );
                });
                Promise.all(inserts)
                    .then(() => resolve(id[0]))
                    .catch(err => reject(err));
            });
    });
}

function editCustomer(customer) {
    return new Promise((resolve, reject) => {
        let deletePermitted = knex
            .from('permitted_products')
            .where('customer_id', customer.id)
            .del();
        let addPermitted = knex
            .insert(
                customer.products.map(prod => {
                    return {
                        product_id: prod.id,
                        customer_id: customer.id,
                        regular: prod.regular
                    };
                })
            )
            .into('permitted_products');
        customer.products = undefined;
        let updateCustomer = knex
            .update(customer)
            .from('customers')
            .where('id', customer.id);
        Promise.all([deletePermitted, updateCustomer])
            .then(() => {
                addPermitted.then(() => resolve()).catch(err => reject(err));
            })
            .catch(err => reject(err));
    });
}

function deleteCustomer(custId) {
    return new Promise((resolve, reject) => {
        knex
            .from('customers')
            .where('id', custId)
            .delete()
            .then(() => resolve())
            .catch(err => reject(err));
    });
}

module.exports = {
    getCustomerById: getCustomerById,
    getAllCustomers: getAllCustomers,
    addCustomer: addCustomer,
    editCustomer: editCustomer,
    deleteCustomer: deleteCustomer
};

function separateCustomers(customers) {
    customers = customers.reduce(
        (arr, cust) => {
            let customerRow = arr.find(row => row[0].id === cust.id);
            if (customerRow) {
                customerRow.push(cust);
            } else {
                arr.push([cust]);
            }
            return arr;
        },
        []
    );
    return customers.map(cust => aggregateCustomer(cust));
}

function aggregateCustomer(results) {
    return results.reduce(
        (obj, row) => {
            obj.name = row.name;
            obj.address = row.address;
            obj.id = row.id;
            obj.last_order_date = row.last_order_date;
            obj.contact_name = row.contact_name;
            obj.phone = row.phone;
            obj.email = row.email;
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
