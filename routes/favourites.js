const express = require('express');
const router = express.Router();

const favouriteQueries = require('../db/queries/favourites');

router.get('/', (req, res) => {
  if (!req.session.user) return res.redirect('/index')
  //if (!req.session.user) return res.redirect('/products')
console.log("favourite.js route", req.session.user);
  favouriteQueries.getFavouritesByUserId(req.session.user.id)
    .then(data => {
      res.render('favourites', { products: data, user: req.session.user });
    })

  .catch (err => {
    res.status(500).json({ error: err.message });
  });

});




module.exports = router;
