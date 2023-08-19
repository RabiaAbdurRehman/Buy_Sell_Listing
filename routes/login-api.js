const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db/connection');



// bcrypt.genSalt(10, function(err, salt) {
//   bcrypt.hash('000', salt, function(err, hash) {
//       console.log(hash)
//   });
// }); //to generate hashed password for any password like 111

router.post("/", (req, res) => { //products
  let email = req.body.email;
  let password = req.body.password;

  return db.query(`
      SELECT id, name, email, password, admin
      FROM users
      WHERE email = $1
    `, [email])
    .then(response => {
      console.log(response.rows);
      if (response.rows[0]) {
        console.log("user is found");
        const user = response.rows[0]

        if (bcrypt.compareSync(password, user.password)) {

          console.log("password checked");

          req.session.user = {
            name: user.name,
            id: user.id,
            isAdmin: user.admin
          }

          return res.redirect("/");
        } else {
          return res.redirect("/");
        }
      } else {
        return res.redirect("/");
      }
    })
    .catch(e => {
      res.send(e);
      return router;
    });
});

//Login Form






module.exports = router;
