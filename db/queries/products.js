const db = require('../connection');


// const express = require('express');
// const router  = express.Router();
// const db = require('../db/connection');
//show
function getProductsFromDB() {
 return db.query('SELECT * FROM products LIMIT 10;')
 .then(data => {
   return data.rows;
 });
}



// Get products sorted by price
const getProductsByPrice = function(txt) {
  return db.query(`
  SELECT * FROM products
  WHERE price >= 100 AND price <= 600
  AND title ILIKE $3
  ORDER BY price;
`, [`%${txt}%`])
  .then(data => {
    return data.rows;
  });
};


// router.get('/products', async (req, res) => {
//   const products = await getProductsFromDB()
//   res.json(products)
// })



module.exports = {getProductsFromDB, getProductsByPrice};