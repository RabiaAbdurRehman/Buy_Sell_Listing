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
const getProductsByPrice = function() {
  return db.query(`
    SELECT * FROM products
    ORDER BY price;
  `)
  .then(data => {
    return data.rows;
  });
};


// router.get('/products', async (req, res) => {
//   const products = await getProductsFromDB()
//   res.json(products)
// })



module.exports = {getProductsFromDB, getProductsByPrice};