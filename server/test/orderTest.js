/* global describe it before after */

const expect = require('chai').expect;
const knex = require('../database/dbConfig');
const lib = require('../lib/orderlib');

describe('Order CRUD functions', () => {
    before(done => {
        let testInserts = [];
        testInserts.push(knex.insert(TEST_CUSTOMER_1).into('customers'));
        testInserts.push(
            knex.insert([TEST_PRODUCT_1, TEST_PRODUCT_2]).into('products')
        );
        Promise.all(testInserts)
            .then(() => {
                knex
                    .insert(TEST_ORDER_2_PRE, 'id')
                    .into('orders')
                    .then(id => {
                        TEST_ORDER_2_POST.id = id[0];
                        knex
                            .insert({order_id: id[0], product_id: 2001, qty: 1})
                            .into('order_items')
                            .then(() => done())
                            .catch(err => done(err));
                    })
                    .catch(err => done(err));
            })
            .catch(err => done(err));
    });
    describe('aggregateOrder', () => {
        it('Combines output rows into an order object', () => {
            expect(
                lib._aggregateOrder(TEST_ORDER_ROWS.slice(0, 2))
            ).to.deep.equal(TEST_ORDER_1_POST);
        });
    });
    describe('separateOrders', () => {
        it(
            'Separates output rows by order and combines them into order objects',
            () => {
                expect(lib._separateOrders(TEST_ORDER_ROWS)).to.deep.equal([
                    TEST_ORDER_1_POST,
                    TEST_ORDER_3_POST
                ]);
            }
        );
    });

    describe('getOrders', () => {
        it('Gets all orders from the DB', done => {
            lib
                .getOrders()
                .then(result => {
                    expect(result).to.deep.equal([TEST_ORDER_2_POST]);
                    done();
                })
                .catch(err => done(err));
        });
    });
    describe('addOrder', () => {
        it('Adds an order to the DB', done => {
            lib
                .addOrder(TEST_ORDER_1_PRE)
                .then(() => {
                    lib
                        .getOrders()
                        .then(result => {
                            TEST_ORDER_1_POST.id = result[1].id;
                            TEST_ORDER_1_EDIT.id = result[1].id;
                            TEST_ORDER_1_EDITED.id = result[1].id;
                            expect(result).to.deep.equal([
                                TEST_ORDER_2_POST,
                                TEST_ORDER_1_POST
                            ]);
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
    describe('editOrder', () => {
        it('Edits an order in the DB', done => {
            lib
                .editOrder(TEST_ORDER_1_EDIT)
                .then(() => {
                    lib
                        .getOrders()
                        .then(result => {
                            let orderToCheck = result.find(
                                ord => ord.id === TEST_ORDER_1_EDITED.id
                            );
                            expect(orderToCheck).to.deep.equal(
                                TEST_ORDER_1_EDITED
                            );
                            done();
                        })
                        .catch(err => done(err));
                })
                .catch(err => done(err));
        });
    });
    after(done => {
        let deletes = [];
        deletes.push(knex.delete().from('orders'));
        deletes.push(knex.delete().from('products'));
        deletes.push(knex.delete().from('customers'));
        Promise.all(deletes).then(() => done()).catch(err => {
            done(err);
        });
    });
});

const TEST_PRODUCT_1 = {
    id: 2000,
    type: 'wheat bread',
    variety: '',
    price: 3.65
};

const TEST_PRODUCT_2 = {
    id: 2001,
    type: 'dinner roll',
    variety: 'dozen',
    price: 4.75
};

const TEST_PRODUCT_1_QTY = {
    id: 2000,
    type: 'wheat bread',
    variety: '',
    price: 3.65,
    qty: 7
};

const TEST_PRODUCT_2_QTY = {
    id: 2001,
    type: 'dinner roll',
    variety: 'dozen',
    price: 4.75,
    qty: 1
};

const TEST_PRODUCT_2_QTY_EDITED = {
    id: 2001,
    type: 'dinner roll',
    variety: 'dozen',
    price: 4.75,
    qty: 3
};

const TEST_ORDER_1_PRE = {
    customer_id: 2000,
    created: new Date(2000, 1, 1, 0, 0, 0, 0),
    comments: "I'm a comment",
    status: 'placed',
    products: [TEST_PRODUCT_1_QTY, TEST_PRODUCT_2_QTY]
};

const TEST_ORDER_1_EDIT = {
    customer_id: 2000,
    comments: 'Better comments',
    products: [TEST_PRODUCT_2_QTY_EDITED]
};

const TEST_ORDER_1_EDITED = {
    customer_id: 2000,
    created: new Date(2000, 1, 1, 0, 0, 0, 0),
    total_qty: 3,
    total_cost: 14.25,
    comments: 'Better comments',
    status: 'placed',
    products: [TEST_PRODUCT_2_QTY_EDITED]
};

const TEST_ORDER_1_POST = {
    id: 6,
    customer_id: 2000,
    created: new Date(2000, 1, 1, 0, 0, 0, 0),
    total_qty: 8,
    total_cost: 30.3,
    comments: "I'm a comment",
    status: 'placed',
    products: [TEST_PRODUCT_1_QTY, TEST_PRODUCT_2_QTY]
};

const TEST_ORDER_2_PRE = {
    customer_id: 2000,
    created: new Date(2001, 1, 1, 0, 0, 0, 0),
    total_qty: 1,
    total_cost: 4.75,
    comments: "I'm a different comment",
    status: 'placed'
};

const TEST_ORDER_2_POST = {
    id: 7,
    customer_id: 2000,
    created: new Date(2001, 1, 1, 0, 0, 0, 0),
    total_qty: 1,
    total_cost: 4.75,
    comments: "I'm a different comment",
    status: 'placed',
    products: [TEST_PRODUCT_2_QTY]
};

const TEST_ORDER_3_POST = {
    id: 7,
    customer_id: 2000,
    created: new Date(2000, 1, 1, 0, 0, 0, 0),
    total_qty: 1,
    total_cost: 4.75,
    comments: "I'm a different comment",
    status: 'placed',
    products: [TEST_PRODUCT_2_QTY]
};

const TEST_CUSTOMER_1 = {
    name: "Frank's Hotel",
    address: '221 Hotel Ave, Hotelville MN 55123',
    id: 2000,
    last_order_date: null
};

const TEST_ORDER_ROWS = [
    {
        id: 2000,
        total_qty: 8,
        total_cost: 30.3,
        created: new Date(2000, 1, 1, 0, 0, 0, 0),
        status: 'placed',
        comments: "I'm a comment",
        customer_id: 2000,
        order_id: 6,
        product_id: 2000,
        qty: 7,
        type: 'wheat bread',
        variety: '',
        price: 3.65
    },
    {
        id: 2001,
        total_qty: 8,
        total_cost: 30.3,
        created: new Date(2000, 1, 1, 0, 0, 0, 0),
        status: 'placed',
        comments: "I'm a comment",
        customer_id: 2000,
        order_id: 6,
        product_id: 2001,
        qty: 1,
        type: 'dinner roll',
        variety: 'dozen',
        price: 4.75
    },
    {
        id: 2002,
        total_qty: 1,
        total_cost: 4.75,
        created: new Date(2000, 1, 1, 0, 0, 0, 0),
        status: 'placed',
        comments: "I'm a different comment",
        customer_id: 2000,
        order_id: 7,
        product_id: 2001,
        qty: 1,
        type: 'dinner roll',
        variety: 'dozen',
        price: 4.75
    }
];
