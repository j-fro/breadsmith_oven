CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    address VARCHAR,
    last_order_date DATE,
    email VARCHAR,
    phone VARCHAR,
    contact_name VARCHAR
);

CREATE TABLE IF NOT EXISTS  users (
    id SERIAL PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    role VARCHAR(10),
    customer_id INTEGER REFERENCES customers(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS  products (
    id SERIAL PRIMARY KEY,
    type VARCHAR NOT NULL,
    variety VARCHAR,
    price REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS  permitted_products (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    regular BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS  orders (
    id SERIAL PRIMARY KEY,
    total_qty INTEGER NOT NULL,
    total_cost REAL NOT NULL,
    created TIMESTAMP,
    status BOOLEAN DEFAULT FALSE,
    comments TEXT,
    customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS  order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    qty INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS  recurring_order_items (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    qty INTEGER NOT NULL,
    recur_day VARCHAR(10)
);
