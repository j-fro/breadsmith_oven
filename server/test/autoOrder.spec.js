const request = require('request');
const expect = require('chai').expect;
const knex = require('../database/dbConfig');
const lib = require('../lib/autoOrderLib');

describe('Automatic order functions', () => {
    describe('Get all automatic orders', () => {
        beforeEach(createInfo);
        it('Gets existing automatic orders', done => {
            lib
                .getAllAutoOrders()
                .then(results => {
                    expect(results).to.deep.contain({
                        id: 1,
                        name: 'Testaurant',
                        type: 'Test bread 1',
                        variety: null,
                        qty: 5,
                        recur_day: 'Monday',
                        price: 1
                    });
                    expect(results).to.deep.include({
                        id: 2,
                        name: 'Testaurant',
                        type: 'Test bread 1',
                        variety: null,
                        qty: 5,
                        recur_day: 'Monday',
                        price: 1
                    });
                    expect(results).to.deep.include({
                        id: 3,
                        name: 'Testaurant',
                        type: 'Test bread 2',
                        variety: null,
                        qty: 7,
                        recur_day: 'Monday',
                        price: 1.50
                    });
                    expect(results).to.deep.include({
                        id: 4,
                        name: 'Testaurant',
                        type: 'Test bread 2',
                        variety: null,
                        qty: 10,
                        recur_day: 'Tuesday',
                        price: 1.50
                    });
                    done();
                })
                .catch(err => done(err));
        });
        it("Doesn't get orders that don't exist", done => {
            lib.getAllAutoOrders().then(results => {
                expect(results).to.not.deep.include({
                    id: 4,
                    name: 'Test Hotel',
                    type: 'Test bread 2',
                    variety: null,
                    qty: 10,
                    recur_day: 'Tuesday',
                    price: 1.50
                });
                done();
            });
        });
        afterEach(deleteInfo);
    });
    describe('Get automatic orders by id', () => {
        beforeEach(createInfo);
        it('Gets orders for customer 1', done => {
            lib
                .getCustomerAutoOrders(1)
                .then(results => {
                    expect(results.length).to.equal(4);
                    expect(results).to.deep.contain({
                        id: 1,
                        name: 'Testaurant',
                        type: 'Test bread 1',
                        variety: null,
                        qty: 5,
                        recur_day: 'Monday',
                        price: 1
                    });
                    expect(results).to.deep.include({
                        id: 2,
                        name: 'Testaurant',
                        type: 'Test bread 1',
                        variety: null,
                        qty: 5,
                        recur_day: 'Monday',
                        price: 1
                    });
                    expect(results).to.deep.include({
                        id: 3,
                        name: 'Testaurant',
                        type: 'Test bread 2',
                        variety: null,
                        qty: 7,
                        recur_day: 'Monday',
                        price: 1.50
                    });
                    expect(results).to.deep.include({
                        id: 4,
                        name: 'Testaurant',
                        type: 'Test bread 2',
                        variety: null,
                        qty: 10,
                        recur_day: 'Tuesday',
                        price: 1.50
                    });
                    done();
                })
                .catch(err => done(err));
        });
        it('Gets no orders for a customer with no orders', done => {
            lib
                .getCustomerAutoOrders(2)
                .then(results => {
                    expect(results.length).to.equal(0);
                    done();
                })
                .catch(err => done(err));
        });
        afterEach(deleteInfo);
    });
    describe('Delete automatic order items', () => {
        beforeEach(createInfo);
        it('Deletes an order item', done => {
            lib
                .deleteAutoOrder(1)
                .then(() => {
                    lib
                        .getCustomerAutoOrders(1)
                        .then(results => {
                            expect(results.length).to.equal(3);
                            expect(results).to.not.deep.include({
                                id: 1,
                                name: 'Testaurant',
                                type: 'Test bread 1',
                                variety: null,
                                qty: 5,
                                recur_day: 'Monday',
                                price: 1
                            });
                            done();
                        })
                        .catch(err => done(err));
                })
                .catch(err => done(err));
        });
        afterEach(deleteInfo);
    });
    describe('Update an order item', () => {
        beforeEach(createInfo);
        it('Updates an existing order item', done => {
            lib
                .updateAutoOrder({
                    id: 1,
                    qty: 17
                })
                .then(() => {
                    knex
                        .select()
                        .from('recurring_order_items')
                        .where('id', 1)
                        .then(results => {
                            expect(results.length).to.equal(1);
                            expect(results).to.deep.include({
                                id: 1,
                                customer_id: 1,
                                product_id: 1,
                                qty: 17,
                                recur_day: 'Monday'
                            });
                            done();
                        })
                        .catch(err => done(err));
                })
                .catch(err => done(err));
        });
        it('Updates nothing when given a nonexistant item', done => {
            lib
                .updateAutoOrder({id: 5, qty: 17})
                .then(result => {
                    expect(result).to.equal(0);
                    done();
                })
                .catch(err => done(err));
        });
        it('Fails to update with bad data', done => {
            lib
                .updateAutoOrder({id: 1, qty: 17, name: 'Test bread 1'})
                .catch(err => {
                    knex
                        .select()
                        .from('recurring_order_items')
                        .where('id', 1)
                        .then(results => {
                            expect(results).to.deep.include({
                                id: 1,
                                customer_id: 1,
                                product_id: 1,
                                qty: 5,
                                recur_day: 'Monday'
                            });
                            done();
                        })
                        .catch(err => done(err));
                });
        });
        afterEach(deleteInfo);
    });
});
describe('Automatic order router', () => {
    describe('GET /:id', () => {
        beforeEach(createInfo);
        it('Returns an array of automatic orders for customer 1', done => {
            request('http://localhost:3001/recurring/1', (
                err,
                response,
                body
            ) => {
                body = JSON.parse(body);
                expect(err).to.be.null;
                expect(response.statusCode).to.equal(200);
                expect(body.length).to.equal(4);
                expect(body).to.deep.include({
                    id: 1,
                    name: 'Testaurant',
                    type: 'Test bread 1',
                    variety: null,
                    qty: 5,
                    recur_day: 'Monday',
                    price: 1
                });
                expect(body).to.deep.include({
                    id: 2,
                    name: 'Testaurant',
                    type: 'Test bread 1',
                    variety: null,
                    qty: 5,
                    recur_day: 'Monday',
                    price: 1
                });
                expect(body).to.deep.include({
                    id: 3,
                    name: 'Testaurant',
                    type: 'Test bread 2',
                    variety: null,
                    qty: 7,
                    recur_day: 'Monday',
                    price: 1.50
                });
                expect(body).to.deep.include({
                    id: 4,
                    name: 'Testaurant',
                    type: 'Test bread 2',
                    variety: null,
                    qty: 10,
                    recur_day: 'Tuesday',
                    price: 1.50
                });
                done();
            });
        });
        it('Returns an empty array for customer 2', done => {
            request('http://localhost:3001/recurring/2', (
                err,
                response,
                body
            ) => {
                body = JSON.parse(body);
                expect(err).to.be.null;
                expect(response.statusCode).to.equal(200);
                expect(body.length).to.equal(0);
                done();
            });
        });
        afterEach(deleteInfo);
    });
    describe('DELETE /:id', () => {
        beforeEach(createInfo);
        it('Deletes recurring item 1', done => {
            request.delete('http://localhost:3001/recurring/1', (
                err,
                response
            ) => {
                expect(err).to.be.null;
                expect(response.statusCode).to.equal(200);
                request('http://localhost:3001/recurring/1', (
                    err,
                    response,
                    body
                ) => {
                    body = JSON.parse(body);
                    expect(body.length).to.equal(3);
                    expect(body).to.not.deep.include({
                        id: 1,
                        name: 'Testaurant',
                        type: 'Test bread 1',
                        variety: null,
                        qty: 5,
                        recur_day: 'Monday',
                        price: 1
                    });
                    done();
                });
            });
        });
        it('Does not delete anything if id is not present', done => {
            request.delete('http://localhost:3001/recurring/3005', (
                err,
                response
            ) => {
                expect(err).to.be.null;
                expect(response.statusCode).to.equal(200);
                knex
                    .select()
                    .from('recurring_order_items')
                    .then(results => {
                        expect(results.length).to.equal(4);
                        done();
                    })
                    .catch(err => done(err));
            });
        });
        afterEach(deleteInfo);
    });
    describe('PUT /', () => {
        beforeEach(createInfo);
        it('Updates recurring order 1', done => {
            request.put(
                'http://localhost:3001/recurring',
                {
                    form: {
                        id: 1,
                        qty: 17
                    }
                },
                (err, response) => {
                    expect(err).to.be.null;
                    expect(response.statusCode).to.equal(200);
                    knex
                        .select()
                        .from('recurring_order_items')
                        .where('id', 1)
                        .then(results => {
                            expect(results).to.deep.include({
                                id: 1,
                                product_id: 1,
                                customer_id: 1,
                                qty: 17,
                                recur_day: 'Monday'
                            });
                            done();
                        })
                        .catch(err => done(err));
                }
            );
        });
        afterEach(deleteInfo);
    });
});

function createInfo(done) {
    let customers = knex
        .insert([
            {id: 1, name: 'Testaurant', primary_email: 'test@test.com'},
            {id: 2, name: 'Test Hotel', primary_email: 'test2@test.com'}
        ])
        .into('customers');
    let products = knex
        .insert([
            {id: 1, type: 'Test bread 1', price: 1},
            {id: 2, type: 'Test bread 2', price: 1.50},
            {id: 3, type: 'Test bread 3', price: 2}
        ])
        .into('products');
    let recurring = knex
        .insert([
            {
                id: 1,
                customer_id: 1,
                product_id: 1,
                qty: 5,
                recur_day: 'Monday'
            },
            {
                id: 2,
                customer_id: 1,
                product_id: 1,
                qty: 5,
                recur_day: 'Monday'
            },
            {
                id: 3,
                customer_id: 1,
                product_id: 2,
                qty: 7,
                recur_day: 'Monday'
            },
            {
                id: 4,
                customer_id: 1,
                product_id: 2,
                qty: 10,
                recur_day: 'Tuesday'
            }
        ])
        .into('recurring_order_items');
    Promise.all([customers, products])
        .then(() => recurring.then(() => done()).catch(err => done(err)))
        .catch(err => done(err));
}

function deleteInfo(done) {
    let customers = knex.from('customers').delete();
    let products = knex.from('products').delete();
    Promise.all([customers, products])
        .then(() => done())
        .catch(err => done(err));
}
