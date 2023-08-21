const db = require('../connection');


// const express = require('express');
// const router  = express.Router();
// const db = require('../db/connection');

function getProductsFromDB() {
 return db.query('SELECT * FROM products LIMIT 10;')
 .then(data => {
   return data.rows;
 });
}

// router.get('/products', async (req, res) => {
//   const products = await getProductsFromDB()
//   res.json(products)
// })



module.exports = {getProductsFromDB};