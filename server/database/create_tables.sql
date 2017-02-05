CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    address VARCHAR,
    last_order_date DATE
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    role VARCHAR(10),
    customer_id INTEGER REFERENCES customers(id) ON DELETE SET NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    type VARCHAR NOT NULL,
    variety VARCHAR,
    price REAL NOT NULL
);

CREATE TABLE permitted_products (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    regular BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    total_qty INTEGER NOT NULL,
    total_cost REAL NOT NULL,
    order_date DATE NOT NULL,
    order_time TIME NOT NULL,
    status VARCHAR(10),
    comments TEXT,
    customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    qty INTEGER NOT NULL
);

CREATE TABLE recurring_order_items (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    qty INTEGER NOT NULL,
    recur_day VARCHAR(10)
);
