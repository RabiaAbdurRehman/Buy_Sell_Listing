const express = require("express");
const router = express.Router();

const products = require("../db/queries/products");

router.post("/", (req, res) => {
  const body = req.body;
  console.log(body);
  const user_id = req.session.user.id;

  products
    .deleteProduct({ ...body, user_id})
    .then((response) => {
      console.log(response.rows);
      res.status(200).json("Product was deleted");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
