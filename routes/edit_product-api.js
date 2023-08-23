const express = require("express");
const router = express.Router();
const products = require("../db/queries/products");

// edit product

router.post("/:productId/edit", (req, res) => {
  const body = req.body;
  const user_id = req.session.user.id;
  const productId = req.params.productId

  if (!req.session.user || !req.session.user.id) {
    return res.status(401).json({ error: "User not logged in" });
  }

  products
    .editProduct({ ...body, user_id, productId })
    .then(() => {
      res.redirect('/all_products')
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
