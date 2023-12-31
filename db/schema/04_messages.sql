DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE messages(
id SERIAL PRIMARY KEY NOT NULL,
buyer_id INTEGER  REFERENCES users(id) ON DELETE CASCADE,
product_id INTEGER  REFERENCES products(id) ON DELETE CASCADE,
body TEXT,
created_at TIMESTAMP DEFAULT statement_timestamp()
);

