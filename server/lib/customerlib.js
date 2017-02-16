const knex = require('../database/dbConfig');

function getCustomerById(custId) {
    return new Promise((resolve, reject) => {
        knex
            .select(
                'customers.id as id',
                'name',
                'address',
                'last_order_date',
                'primary_email',
                'primary_phone',
                'primary_contact_name',
                'secondary_email',
                'secondary_phone',
                'secondary_contact_name',
                'customer_id',
                'product_id',
                'regular',
                'type',
                'variety',
                'price'
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
                'customers.id as id',
                'name',
                'address',
                'last_order_date',
                'primary_email',
                'primary_phone',
                'primary_contact_name',
                'secondary_email',
                'secondary_phone',
                'secondary_contact_name',
                'customer_id',
                'product_id',
                'regular',
                'type',
                'variety',
                'price'
            )
            .from('customers')
            .leftOuterJoin('permitted_products', 'customers.id', 'customer_id')
            .leftOuterJoin('products', 'product_id', 'products.id')
            .orderBy('customers.id')
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
                    primary_email: customer.primary_email,
                    primary_phone: customer.primary_phone,
                    primary_contact_name: customer.primary_contact_name,
                    secondary_email: customer.secondary_email,
                    secondary_phone: customer.secondary_phone,
                    secondary_contact_name: customer.secondary_contact_name
                },
                'id'
            )
            .into('customers')
            .then(id => {
                let productsToInsert = knex
                    .insert(
                        customer.products.map(prod => {
                            return {
                                customer_id: id[0],
                                product_id: prod.id,
                                regular: prod.regular
                            };
                        })
                    )
                    .into('permitted_products');
                let usersToInsert = knex
                    .insert([
                        {
                            first_name: customer.primary_contact_name,
                            email: customer.primary_email,
                            role: 'customer',
                            customer_id: id[0]
                        },
                        customer.secondary_email
                            ? {
                                  first_name: customer.secondary_contact_name,
                                  email: customer.secondary_email,
                                  role: 'customer',
                                  customer_id: id[0]
                              }
                            : null
                    ])
                    .into('users');
                Promise.all([productsToInsert, usersToInsert])
                    .then(() => resolve(id[0]))
                    .catch(err => reject(err));
            })
            .catch(err => reject(err));
    });
}

function editCustomer(customer) {
    return new Promise((resolve, reject) => {
        let deletePermitted = knex
            .from('permitted_products')
            .where('customer_id', customer.id)
            .del();
        let deleteUsers = knex
            .from('users')
            .where('customer_id', customer.id)
            .andWhere('role', 'customer')
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
        let addUsers = knex
            .insert([
                {
                    first_name: customer.primary_contact_name,
                    email: customer.primary_email,
                    role: 'customer',
                    customer_id: customer.id
                },
                customer.secondary_email
                    ? {
                          first_name: customer.secondary_contact_name,
                          email: customer.secondary_email,
                          role: 'customer',
                          customer_id: customer.id
                      }
                    : null
            ])
            .into('users');
        customer.products = undefined;
        let updateCustomer = knex
            .update(customer)
            .from('customers')
            .where('id', customer.id);
        Promise.all([deletePermitted, deleteUsers, updateCustomer])
            .then(() => {
                Promise.all([addPermitted, addUsers])
                    .then(() => resolve())
                    .catch(err => reject(err));
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
            console.log(row);
            obj.name = row.name;
            obj.address = row.address;
            obj.id = row.id;
            obj.last_order_date = row.last_order_date;
            obj.primary_contact_name = row.primary_contact_name;
            obj.primary_phone = row.primary_phone;
            obj.primary_email = row.primary_email;
            obj.secondary_contact_name = row.secondary_contact_name;
            obj.secondary_phone = row.secondary_phone;
            obj.secondary_email = row.secondary_email;
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
