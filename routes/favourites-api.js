const express = require("express");
const router = express.Router();

const favouriteQueries = require("../db/queries/favourites");

router.post("/", (req, res) => {
  const product_id = req.body.productId;
  console.log("favourites-api.request,", req.session)
  const user_id = req.session.user.id;

  favouriteQueries
    .addProductToFavourites(user_id, product_id)
    .then((response) => {
      console.log(response.rows);
      res.status(200).json({ message: "Product was added to Favourite!" });
    })
    .catch((err) => {
      console.log("favourite-api error,",err.message);
      res.status(500).json({ error: err.message });
    });
});


router.post("/:productId/delete", (req, res) => {
  const redirectUrl = req.body.redirect_url || '/all_products';
  const productId = req.params.productId;
  const userId = req.session.user.id;

  if (!req.session.user || !req.session.user.id) {
    return res.status(401).json({ error: "User not logged in" });
  }

  favouriteQueries
    .removeProductFromFavourites({ productId, userId })
    .then(() => {
      res.redirect(redirectUrl);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
