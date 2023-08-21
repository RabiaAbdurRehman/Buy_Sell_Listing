const express = require('express');
const router = express.Router();

const productsQueries = require('../db/queries/products');

router.get('/', (req, res) => {
    productsQueries.getProductsFromDB()
     .then(products => {
        res.json({products});
     })
     .catch(err => {
        res
          .status(500)
          .json({error: err.message});
     });
});

module.exports = router;