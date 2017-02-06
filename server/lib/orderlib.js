const knex = require('../database/dbConfig');

function getOrders() {
    return new Promise((resolve, reject) => {
        knex
            .select()
            .from('orders')
            .join('order_items', 'orders.id', 'order_id')
            .join('products', 'product_id', 'products.id')
            .then(result => resolve(separateOrders(result)))
            .catch(err => reject(err));
    });
}

function addOrder(order) {
    return new Promise((resolve, reject) => {
        knex
            .insert(
                {
                    comments: order.comments,
                    status: order.status,
                    created: order.created,
                    total_qty: order.products.reduce(
                        (sum, prod) => sum + prod.qty,
                        0
                    ),
                    total_cost: order.products.reduce(
                        (sum, prod) => sum + prod.price * prod.qty,
                        0
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
                                    order_id: order_id[0],
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
                    .then(() => resolve(order_id[0]))
                    .catch(err => reject(err));
            })
            .catch(err => reject(err));
    });
}

module.exports = {
    addOrder: addOrder,
    getOrders: getOrders,
    _aggregateOrder: aggregateOrder,
    _separateOrders: separateOrders
};

function aggregateOrder(results) {
    return results.reduce(
        (obj, row) => {
            obj.id = row.order_id;
            obj.customer_id = row.customer_id;
            obj.total_qty = row.total_qty;
            obj.total_cost = row.total_cost;
            obj.created = row.created;
            obj.status = row.status;
            obj.comments = row.comments;
            obj.products.push({
                id: row.product_id,
                qty: row.qty,
                price: row.price,
                type: row.type,
                variety: row.variety
            });
            return obj;
        },
        { products: [] }
    );
}

function separateOrders(results) {
    let orders = results.reduce(
        (arr, ord) => {
            let orderRow = arr.find(row => row[0].order_id === ord.order_id);
            if (orderRow) {
                orderRow.push(ord);
            } else {
                arr.push([ord]);
            }
            return arr;
        },
        []
    );
    return orders.map(cust => aggregateOrder(cust));
}
