const express = require('express');
const router = express.Router();
const products = require("../db/queries/products");

//edit product

router.get('/:productId/edit', async (req, res) => {
  const productId = req.params.productId
  const user = req.session.user;

  if (user && user.isAdmin) {
    const product = await products.getProductById(productId)
    return res.render("edit_product", { user, product });
  }
  res.redirect('/');
  return;
});

module.exports = router;
