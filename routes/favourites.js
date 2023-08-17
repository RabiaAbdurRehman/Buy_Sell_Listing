const express = require('express');
const router = express.Router();

const favouriteQueries = require('../db/queries/favourites');

// Use POST method to add a product to favourites
router.post('/', (req, res) => {
  // Assuming you're using session for authentication and have userId available
  const user_id = req.session.userId;
  const product_id = req.body.productId;

  favouriteQueries.addProductToFavourites(user_id, product_id)
    .then(response => {
      console.log(response); // Make sure the response contains the expected data
      res.status(200).json({ message: 'Product was added to Favourite!!' });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
