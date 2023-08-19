const express = require('express');
const router = express.Router();



//Login Form
router.get('/', (req, res) => {
  const user = req.session.user
  if (user) {
    res.redirect('/');
    return;
  }
  res.render("login", { user: {} });
});




module.exports = router;
