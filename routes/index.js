const express = require('express');
const router = express.Router();
const productsQueries = require('../db/queries/products');

router.get('/', (req, res) => {

    productsQueries.getProductsFromDB()
    .then(products => {
      const templateVars = {products, user: req.session.user };
       //res.render('products', templateVars); //this is the original, RENAMED TO INDEX (RABIA'S)
       res.render('index', templateVars);
    })
    .catch(err => {
       res
         .status(500)
         .json({error: err.message});
    });
});


module.exports = router;
