const express = require('express');
const router = express.Router();

const favouriteQueries = require('../db/queries/favourites');

router.get('/', (req, res) => {
  favouriteQueries.getFavouritesByUserId(req.query.userId)
    .then(data => {
      res.render('favourites', { products: data });
    })

  .catch (err => {
    res.status(500).json({ error: err.message });
  });

});

module.exports = router;
