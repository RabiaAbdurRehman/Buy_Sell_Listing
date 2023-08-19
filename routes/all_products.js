const express = require('express');
const router = express.Router();



//Add products

router.get('/', (req, res) => {
  const user = req.session.user;

  if (user && user.isAdmin) {
    return res.render("all_products", { user });
  }
  res.redirect('/');
  return;
});



module.exports = router;
