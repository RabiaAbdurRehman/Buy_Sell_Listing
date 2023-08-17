const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db/connection');

const { userLogin } = require('../db/queries/login');

router.post("/", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  return userLogin(db, email)
    .then(response => {
      console.log(response);

      if (response[0]) {
        console.log("abc");

        if (bcrypt.compareSync(password, response[0].password)) {
          console.log("def");

          let user_name = response[0].name;
          let user_id = response[0].id;
          let user_email = response[0].email;

          req.session["user_name"] = user_name;
          req.session["user_id"] = user_id;
          req.session["user_email"] = user_email;
          console.log(req.session);
          return res.redirect("/");

        } else {
          return res.redirect("/login");
        }
      } else {
        return res.redirect("/login");
      }
    })
    .catch(e => {
      res.send(e);
    });
});

module.exports = router;
