const express = require("express");
const router = express.Router();
const products = require("../db/queries/products");


router.post("/", (req, res) => {
  const body = req.body;
  //console.log(body);
  const user_id = req.session.user.id;

  products
    .addNewProduct({ ...body, user_id })
    .then((response) => {
      // Pass a success message to the template
      res.render("add_product", { user: req.session.user, successMessage: "Product was added successfully", errorMessage: null });
    })
    .catch((err) => {
      // Pass an error message to the template if needed
      res.render("add_product", { user: req.session.user, errorMessage: err.message, successMessage: null });
    });
});


module.exports = router;
