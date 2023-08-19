const express = require("express");
const router = express.Router();

const favouriteQueries = require("../db/queries/favourites");

router.post("/", (req, res) => {
  const product_id = req.body.productId;
  console.log(req.session)
  const user_id = req.session.user.id;

  favouriteQueries
    .addProductToFavourites(user_id, product_id)
    .then((response) => {
      console.log(response.rows);
      res.status(200).json({ message: "Product was added to Favourite!" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
