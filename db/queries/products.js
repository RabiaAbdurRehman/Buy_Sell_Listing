const db = require('../connection');

function getProductsFromDB() {
  //console.log("getProductsFromDB")
  return db.query('SELECT * FROM products LIMIT 100;')
    .then(data => {
      return data.rows;
    });
}

// Get products sorted by price
const getProductsByPrice = function(txt) {
  console.log("price query:", txt);
  return db.query(`
  SELECT * FROM products
  WHERE price >= 100 AND price <= $1
  ORDER BY price;
`, [`${txt*100}`])
    //[`${currentUserId}`]
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

// Edit product

const editProduct = async function({ productId, user_id, title, price, description, image_url, available }) {
  try {
    const result = await db.query(
      `
      UPDATE products
      SET
      title = $1,
      price = $2,
      description = $3,
      image_url = $4,
      available = $5
      WHERE user_id = $6
      AND id = $7
      RETURNING *;
      `,
      [title, price, description, image_url, available, user_id, productId]
    );

    if (!result.rows[0]) {
      throw new Error('Product not found');
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Get a product by its ID (await is a promise)

const getProductById = async (productId) => {
  try {

    const result = await db.query('SELECT * FROM products WHERE id = $1', [productId]);

    if (!result) {
      console.error('Query result is undefined.');
      return null;
    }

    if (result.rows.length === 0) {
      console.error('Product not found in the database.');
      return null;
    }

    return result.rows[0]; // Return the found product
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};


const deleteProduct = function({ user_id, productId }) {
  return db.query(`
  DELETE FROM products
  WHERE products.id = $1 AND products.user_id = $2
  RETURNING *;
  `, [productId, user_id])
    .then((res) => res.rows[0]);
};


module.exports = { getProductsFromDB, getProductsByPrice, addNewProduct, editProduct, deleteProduct, getProductById };

