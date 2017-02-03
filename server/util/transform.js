function transformOrders(orderArray) {
    return orderArray.reduce(
        (arr, ord) => {
            let flatProducts = ord.products.map(prod => {
                prod.id = ord.id;
                prod.order_date = ord.order_date;
                prod.order_time = ord.order_time;
                prod.status = ord.status;
                prod.comments = ord.comments;
                prod.name = ord.customer.name;
                prod.address = ord.customer.address;
                return prod;
            });
            return arr.concat(flatProducts);
        },
        []
    );
}

module.exports = {transformOrders: transformOrders};
