const express = require("express");
const router = express.Router();

const products = require("../db/queries/products");

router.post("/:productId/delete", (req, res) => {
  //console.log(req.body)
  const redirectUrl = req.body.redirect_url || '/all_products';
  const productId = req.params.productId;
  const user_id = req.session.user.id;

  if (!req.session.user || !req.session.user.id) {
    return res.status(401).json({ error: "User not logged in" });
  }

  products
    .deleteProduct({ productId, user_id })
    .then((response) => {
      res.redirect(redirectUrl);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;

