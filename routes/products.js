const express = require('express');
const router = express.Router();
const products_api = require('./products-api.js');
const productsQueries = require('../db/queries/products');

router.get('/', (req, res) => {
    productsQueries.getProductsFromDB()
    .then(products => {
       res.render('products', {products});
    })
    .catch(err => {
       res
         .status(500)
         .json({error: err.message});
    });
});

module.exports = router;
