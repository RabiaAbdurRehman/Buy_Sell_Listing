DROP TABLE IF EXISTS products  CASCADE;

CREATE TABLE products  (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  available BOOLEAN,
  created_at TIMESTAMP
);
