const knex = require('../database/dbConfig');

function addOrder(order) {
    return new Promise((resolve, reject) => {
        knex
            .insert(
                {
                    comments: order.comments,
                    status: order.status,
                    order_date: order.order_date,
                    order_time: order.order_time,
                    total_qty: order.products.reduce(
                        (sum, prod) => sum + prod.qty
                    ),
                    total_cost: order.products.reduce(
                        (sum, prod) => sum + prod.price * prod.qty
                    ),
                    customer_id: order.customer_id
                },
                'id'
            )
            .into('orders')
            .then(order_id => {
                let order_items = order.products.reduce(
                    (arr, prod) => {
                        arr.push(
                            knex
                                .insert({
                                    order_id: order_id,
                                    product_id: prod.id,
                                    qty: prod.qty
                                })
                                .into('order_items')
                        );
                        return arr;
                    },
                    []
                );
                Promise.all(order_items)
                    .then(() => resolve(order_id))
                    .catch(err => reject(err));
            })
            .catch(err => reject(err));
    });
}

module.exports = {
    addOrder: addOrder
};
