const express = require('express');
const router = express.Router();
const products_api = require('./products-api.js');
const productsQueries = require('../db/queries/products');

router.get('/', (req, res) => {

    productsQueries.getProductsFromDB()
    .then(products => {
      const templateVars = {products, user: req.session.user };
       res.render('products', templateVars);
    })
    .catch(err => {
       res
         .status(500)
         .json({error: err.message});
    });
});

module.exports = router;
