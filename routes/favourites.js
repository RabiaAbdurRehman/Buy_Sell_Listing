const express = require('express');
const router = express.Router();

const favouriteQueries = require('../db/queries/favourites');

router.post('/', (req, res) => {
  const user_id = req.session.userId;
  const product_id = req.body.productId;

  favouriteQueries.addProductToFavourites(user_id, product_id)
    .then(response => {
      console.log(response);
      res.status(200).json({ message: 'Product was added to Favourite!!' });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
