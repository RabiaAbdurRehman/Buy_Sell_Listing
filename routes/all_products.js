// const express = require('express');
// const router = express.Router();
// const productsQueries = require('../db/queries/products');

//

// router.get('/', (req, res) => {
//   const user = req.session.user;

//   if (user && user.isAdmin) {
//     return res.render("all_products", { user });
//   }
//   res.redirect('/');
//   return;
// });


//see all products as an admin (edit, delete, add)

const express = require('express');
const router = express.Router();
const productsQueries = require('../db/queries/products');

router.get('/', async (req, res) => {
  const user = req.session.user;

  if (user && user.isAdmin) {
    try {
      const products = await productsQueries.getProductsFromDB();
      const templateVars = { products, user };
      res.render('all_products', templateVars);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.redirect('/');
  }
});


module.exports = router;
