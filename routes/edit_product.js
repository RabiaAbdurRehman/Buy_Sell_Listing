const express = require('express');
const router = express.Router();

//edit product ROUTE
// <!-- SILVIA -->

router.get('/', (req, res) => {
  const user = req.session.user;

  if (user && user.isAdmin) {
    return res.render("edit_product", { user });
  }
  res.redirect('/');
  return;
});

module.exports = router;
