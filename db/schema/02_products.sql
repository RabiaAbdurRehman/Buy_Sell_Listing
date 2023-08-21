DROP TABLE IF EXISTS products  CASCADE;

CREATE TABLE products  (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  available BOOLEAN,
  created_at TIMESTAMP DEFAULT statement_timestamp()
);
