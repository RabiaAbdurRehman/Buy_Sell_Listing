const express = require('express');
const router = express.Router();

//Login Form
router.get('/', (req, res) => {
  const user = req.session.user
  if (user) {
    res.redirect('/index');
    return;
  }
  res.render("login", { user: null });
});


module.exports = router;
