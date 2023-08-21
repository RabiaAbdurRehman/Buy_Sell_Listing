const express = require('express');
const router = express.Router();

const favouriteQueries = require('../db/queries/favourites');

router.post('/', (req, res) => {
  console.log("TEST", req.body);
  const product_id = req.body.productId;
  //const user_id = req.session.userId;//we need user login here.
  const dummy_user_id = 1;


  favouriteQueries.addProductToFavourites(dummy_user_id, product_id)
  .then(response => {
    console.log(response.rows)
    res.send(200, { message: 'Product was added to Favourite!!' });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  })
})


module.exports = router;
