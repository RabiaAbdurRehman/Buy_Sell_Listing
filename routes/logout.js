const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/'); // Redirect to the login page or any other appropriate page.
  })
});

module.exports = router;
