const db = require('../connection');

function getProductsFromDB() {
  return db.query('SELECT * FROM products LIMIT 100;')
    .then(data => {
      return data.rows;
    });
}


// Get products sorted by price
const getProductsByPrice = function() {
  return db.query(`
    SELECT * FROM products
    ORDER BY price;
  `)
    .then(data => {
      return data.rows;
    });
};

// Add new product to database
const addNewProduct = function({ user_id, title, price, description, image_url, available }) {
  return db.query(`
    INSERT INTO products (user_id, title, price, description, image_url, available)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `, [user_id, title, price, description, image_url, available])
    .then(data => {
      return data.rows[0];
    });

};


module.exports = { getProductsFromDB, getProductsByPrice, addNewProduct };
