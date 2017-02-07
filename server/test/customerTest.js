const expect = require('chai').expect;
const knex = require('../database/dbConfig');
const lib = require('../lib/customerlib');

const TEST_CUSTOMER_1 = {
    name: "Frank's Hotel",
    address: '221 Hotel Ave, Hotelville MN 55123',
    email: 'bob@bob.com',
    contact_name: 'Frank',
    id: 1000,
    last_order_date: null
};
const TEST_PRODUCT_1 = {
    id: 1000,
    type: 'wheat bread',
    variety: '',
    price: 3.65
};
const TEST_PRODUCT_2 = {
    id: 1001,
    type: 'dinner roll',
    variety: 'dozen',
    price: 4.75
};
const TEST_PRODUCT_3 = {
    id: 1002,
    type: 'dinner roll',
    variety: '',
    price: 4.25
};
const TEST_CUSTOMER_2 = {
    name: "Joey's Bistro",
    address: '7000 Joe Way, Joeville CA 90210',
    products: [TEST_PRODUCT_1, TEST_PRODUCT_2]
};
const TEST_CUSTOMER_2_V2 = {
    id: 1003,
    name: "Joseph's Bistro",
    products: [TEST_PRODUCT_2, TEST_PRODUCT_3]
};
const TEST_CUSTOMER_3 = {
    name: "Amos's Diner",
    address: '1234 Five Street',
    id: 1004,
    last_order_date: null
};

describe('Customer router', () => {
    before(done => {
        let insertCust = knex
            .insert([TEST_CUSTOMER_1, TEST_CUSTOMER_3])
            .into('customers');
        let insertProd = knex
            .insert([TEST_PRODUCT_1, TEST_PRODUCT_2, TEST_PRODUCT_3])
            .into('products');
        Promise.all([insertCust, insertProd])
            .then(() => {
                knex
                    .insert([
                        {
                            id: 1000,
                            customer_id: 1000,
                            product_id: 1000,
                            regular: true
                        },
                        {
                            id: 1001,
                            customer_id: 1000,
                            product_id: 1001,
                            regular: true
                        },
                        {
                            customer_id: 1004,
                            product_id: 1000,
                            regular: false
                        }
                    ])
                    .into('permitted_products')
                    .then(() => done())
                    .catch(err => {
                        done(err);
                    });
            })
            .catch(err => {
                done(err);
            });
    });
    describe('Get all customers', () => {
        it('Gets all customers from the DB', done => {
            let testCustomer = {
                id: 1000,
                name: "Frank's Hotel",
                address: '221 Hotel Ave, Hotelville MN 55123',
                phone: null,
                contact_name: 'Frank',
                email: 'bob@bob.com',
                last_order_date: null,
                products: [
                    {
                        id: 1000,
                        type: 'wheat bread',
                        variety: '',
                        price: 3.65,
                        regular: true
                    },
                    {
                        id: 1001,
                        type: 'dinner roll',
                        variety: 'dozen',
                        price: 4.75,
                        regular: true
                    }
                ]
            };
            let testCustomer2 = {
                id: 1004,
                name: "Amos's Diner",
                address: '1234 Five Street',
                email: null,
                contact_name: null,
                phone: null,
                last_order_date: null,
                products: [
                    {
                        id: 1000,
                        type: 'wheat bread',
                        variety: '',
                        price: 3.65,
                        regular: false
                    }
                ]
            };
            lib
                .getAllCustomers()
                .then(customers => {
                    expect(customers).to.deep.equal([
                        testCustomer,
                        testCustomer2
                    ]);
                    done();
                })
                .catch(err => done(err));
        });
    });
    describe('Get /1000', () => {
        it('Gets a customer with id 1000', done => {
            let testCustomer = {
                id: 1000,
                name: "Frank's Hotel",
                address: '221 Hotel Ave, Hotelville MN 55123',
                last_order_date: null,
                phone: null,
                email: 'bob@bob.com',
                contact_name: 'Frank',
                products: [
                    {
                        id: 1000,
                        type: 'wheat bread',
                        variety: '',
                        price: 3.65,
                        regular: true
                    },
                    {
                        id: 1001,
                        type: 'dinner roll',
                        variety: 'dozen',
                        price: 4.75,
                        regular: true
                    }
                ]
            };
            lib
                .getCustomerById(1000)
                .then(customer => {
                    expect(customer).to.deep.equal(testCustomer);
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });
    });
    describe('Post a customer', () => {
        it('Adds a customer to the DB', done => {
            lib
                .addCustomer(TEST_CUSTOMER_2)
                .then(id => {
                    lib
                        .getCustomerById(id)
                        .then(customer => {
                            expect(customer.name).to.equal(
                                TEST_CUSTOMER_2.name
                            );
                            expect(customer.address).to.equal(
                                TEST_CUSTOMER_2.address
                            );
                            done();
                        })
                        .catch(err => done(err));
                })
                .catch(err => done(err));
        });
    });
    describe('Update a customer', () => {
        before(done => {
            lib
                .addCustomer(TEST_CUSTOMER_2)
                .then(id => {
                    TEST_CUSTOMER_2_V2.id = id;
                    done();
                })
                .catch(err => done(err));
        });
        it('Updates a customer in the DB', done => {
            lib
                .editCustomer(TEST_CUSTOMER_2_V2)
                .then(() => {
                    lib
                        .getCustomerById(TEST_CUSTOMER_2_V2.id)
                        .then(customer => {
                            expect(customer.name).to.equal(
                                TEST_CUSTOMER_2_V2.name
                            );
                            expect(customer.products[0].id).to.equal(1001);
                            expect(customer.products[1].id).to.equal(1002);
                            done();
                        })
                        .catch(err => done(err));
                })
                .catch(err => done(err));
        });
    });

    describe('Delete a customer', () => {
        it('Deletes a customer from the DB', done => {
            lib
                .deleteCustomer(1000)
                .then(() => {
                    lib
                        .getCustomerById(1000)
                        .then(customer => {
                            expect(customer).to.be.empty;
                            done();
                        })
                        .catch(err => {
                            done(err);
                        });
                })
                .catch(err => {
                    done(err);
                });
        });
    });

    after(done => {
        let deletecust = knex.from('customers').delete();
        let delete1000 = knex.from('products').delete();
        // let delete1001 = knex.from('products').where('id', 1001).delete();
        Promise.all([deletecust, delete1000])
            .then(() => done())
            .catch(err => done(err));
    });
});
