const expect = require('chai').expect;
const transform = require('../util/transform');

describe('Data transforms', () => {
    describe('Order data transform', () => {
        it(
            'Transforms an array of order objects into an array of flat objects',
            () => {
                let testInput = [
                    {
                        id: 1,
                        order_date: new Date(2000, 1, 1, 0, 0, 0, 0),
                        order_time: new Date(2000, 1, 1, 0, 0, 0, 0),
                        status: 'approved',
                        comments: '',
                        customer: {
                            name: "Frank's Hotel",
                            address: '221 Hotel Ave, Hotelville MN 55123'
                        },
                        products: [
                            {
                                id: 1,
                                type: 'bread',
                                variety: '',
                                price: 3.65,
                                qty: 7
                            },
                            {
                                id: 2,
                                type: 'wheat bread',
                                variety: '',
                                price: 4.75,
                                qty: 8
                            }
                        ]
                    },
                    {
                        id: 2,
                        order_date: new Date(2000, 1, 1, 0, 0, 0, 0),
                        order_time: new Date(2000, 1, 1, 0, 0, 0, 0),
                        status: 'approved',
                        comments: '',
                        customer: {
                            name: "Bobs's Restaurant",
                            address: '221 Restaurant Ave, Hotelville MN 55123'
                        },
                        products: [
                            {
                                id: 1,
                                type: 'bread',
                                variety: '',
                                price: 3.65,
                                qty: 7
                            },
                            {
                                id: 2,
                                type: 'wheat bread',
                                variety: '',
                                price: 4.75,
                                qty: 8
                            }
                        ]
                    }
                ];
                let testOutput = [
                    {
                        id: 1,
                        order_date: new Date(2000, 1, 1, 0, 0, 0, 0),
                        order_time: new Date(2000, 1, 1, 0, 0, 0, 0),
                        status: 'approved',
                        comments: '',
                        name: "Frank's Hotel",
                        address: '221 Hotel Ave, Hotelville MN 55123',
                        type: 'bread',
                        variety: '',
                        price: 3.65,
                        qty: 7
                    },
                    {
                        id: 1,
                        order_date: new Date(2000, 1, 1, 0, 0, 0, 0),
                        order_time: new Date(2000, 1, 1, 0, 0, 0, 0),
                        status: 'approved',
                        comments: '',
                        name: "Frank's Hotel",
                        address: '221 Hotel Ave, Hotelville MN 55123',
                        type: 'wheat bread',
                        variety: '',
                        price: 4.75,
                        qty: 8
                    },
                    {
                        name: "Bobs's Restaurant",
                        address: '221 Restaurant Ave, Hotelville MN 55123',
                        id: 2,
                        order_date: new Date(2000, 1, 1, 0, 0, 0, 0),
                        order_time: new Date(2000, 1, 1, 0, 0, 0, 0),
                        status: 'approved',
                        comments: '',
                        type: 'bread',
                        variety: '',
                        price: 3.65,
                        qty: 7
                    },
                    {
                        name: "Bobs's Restaurant",
                        address: '221 Restaurant Ave, Hotelville MN 55123',
                        id: 2,
                        order_date: new Date(2000, 1, 1, 0, 0, 0, 0),
                        order_time: new Date(2000, 1, 1, 0, 0, 0, 0),
                        status: 'approved',
                        comments: '',
                        type: 'wheat bread',
                        variety: '',
                        price: 4.75,
                        qty: 8
                    }
                ];
                let transformed = transform.transformOrders(testInput);
                for (let i = 0; i < transformed.length; i++) {
                    console.log('Transformed:', transformed[i]);
                    console.log('Testing:', testOutput[i]);
                    expect(transformed[i]).to.equal(testOutput[i]);
                }
            }
        );
    });
});
