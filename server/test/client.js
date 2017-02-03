const expect = require('chai').expect;
const knex = require('../database/dbConfig');
const lib = require('../lib/customerlib');

const TEST_CUSTOMER_1 = {
    id: 1000,
    name: "Frank's Hotel",
    address: '221 Hotel Ave, Hotelville MN 55123',
    last_order_date: new Date()
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

describe('Client router', () => {
    before(done => {
        let insertCust = knex.insert(TEST_CUSTOMER_1).into('customers');
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
                            regular: false
                        }
                    ])
                    .into('permitted_products')
                    .then(() => done())
                    .catch(err => {
                        console.log(err);
                        done();
                    });
            })
            .catch(err => {
                console.log(err);
                done();
            });
    });
    describe('Get /1000', () => {
        it('Gets a customer with id 1000', done => {
            let testCustomer = {
                id: 1000,
                name: "Frank's Hotel",
                address: '221 Hotel Ave, Hotelville MN 55123',
                last_order_date: new Date(),
                products: [
                    {id: 1000, type: 'wheat bread', variety: '', price: 3.65},
                    {
                        id: 1001,
                        type: 'dinner roll',
                        variety: 'dozen',
                        price: 4.75
                    }
                ]
            };
            lib
                .getCustomerById(1000)
                .then(customer => {
                    expect(customer.id).to.equal(testCustomer.id);
                    expect(customer.name).to.equal(testCustomer.name);
                    expect(customer.address).to.equal(testCustomer.address);
                    expect(customer.products[0].id).to.equal(
                        testCustomer.products[0].id
                    );
                    expect(customer.products[1].id).to.equal(
                        testCustomer.products[1].id
                    );
                    done();
                })
                .catch(err => {
                    console.log(err);
                    done();
                });
        });
    });
    describe('Post a customer', () => {
        it('Adds a customer to the DB', done => {
            lib
                .addCustomer(TEST_CUSTOMER_2)
                .then(id => {
                    console.log('Posting happened');
                    lib.getCustomerById(id).then(customer => {
                        expect(customer.name).to.equal(TEST_CUSTOMER_2.name);
                        expect(customer.address).to.equal(
                            TEST_CUSTOMER_2.address
                        );
                        done();
                    });
                })
                .catch(err => console.log(err));
        });
    });
    describe('Update a customer', () => {
        before(done => {
            lib.addCustomer(TEST_CUSTOMER_2).then(id => {
                TEST_CUSTOMER_2_V2.id = id;
                done();
            });
        });
        it('Updates a customer in the DB', done => {
            lib
                .editCustomer(TEST_CUSTOMER_2_V2)
                .then(() => {
                    console.log('Update happened');
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
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        });
    });
    describe('Delete a customer', () => {
        it('Deletes a customer from the DB', done => {
            lib
                .deleteCustomer(1000)
                .then(() => {
                    console.log('Deleted happened');
                    lib
                        .getCustomerById(1000)
                        .then(customer => {
                            expect(customer).to.be.empty;
                            done();
                        })
                        .catch(err => {
                            console.log(err);
                            done();
                        });
                })
                .catch(err => {
                    console.log(err);
                    done();
                });
        });
    });
    after(done => {
        let deletecust = knex.from('customers').delete();
        let delete1000 = knex.from('products').delete();
        // let delete1001 = knex.from('products').where('id', 1001).delete();
        Promise.all([deletecust, delete1000]).then(() => done()).catch(err => {
            console.log(err);
            done();
        });
    });
});
