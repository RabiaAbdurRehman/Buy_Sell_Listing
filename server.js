
// load .env data into process.env
require('dotenv').config();

// WEB SERVER CONFIGURATION

const PORT = process.env.PORT || 8080;

const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const sassMiddleware = require('./lib/sass-middleware');
const bodyParser = require("body-parser");
const productsQueries = require('./db/queries/products');

const app = express();

//MIDDLEWARE

app.use(morgan('dev'));
app.set('view engine', 'ejs');

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: true }));


app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


// ROUTES

//Login
const loginRoute = require('./routes/login');
const loginApiRoute = require('./routes/login-api');
const logoutRoute = require('./routes/logout');

//Users
const usersRoutes = require('./routes/users');
const usersApiRoutes = require('./routes/users-api');

//Favourites
const favouritesProduct = require('./routes/favourites');
const favouriteApiRoutes = require('./routes/favourites-api');

//Products
// const productsRoutes = require('./routes/products');
// const productsApiRoutes = require('./routes/products-api');
const indexRoutes = require('./routes/index');
const indexApiRoutes = require('./routes/index-api');

const addProductRoute = require('./routes/add_product');
const addProductApiRoute = require('./routes/add_product-api');

const allProductsRoute = require('./routes/all_products');
const allProductsApiRoute = require('./routes/all_products-api');

// <!-- SILVIA -->
const editProductRoute = require('./routes/edit_product');
const editProductApiRoute = require('./routes/edit_product-api');

// const deleteProductRoute = require('./routes/delete_product');
// const deleteProductApiRoute = require('./routes/delete_product-api');


// Login
app.use('/login', loginRoute);
app.use('/api/login', loginApiRoute);
app.use('/logout', logoutRoute);

// Users
app.use('/users', usersRoutes);
app.use('/api/users', usersApiRoutes);

// Favourites
app.use('/favourites', favouritesProduct);
app.use('/api/favourites', favouriteApiRoutes);

// Products
app.use('/index', indexRoutes);
app.use('/api/index', indexApiRoutes);
// app.use('/products', productsRoutes);
// app.use('/api/products', productsApiRoutes);

app.use('/add_product', addProductRoute);
app.use('/api/add-product', addProductApiRoute);

app.use('/all_products', allProductsRoute);
app.use('/api/all-products', allProductsApiRoute);

// <!-- SILVIA -->
app.use('/edit_product', editProductRoute);
app.use('/api/edit-product', editProductApiRoute);

// // delete

// app.use('/delete_product', deleteProductRoute);
// app.use('/api/delete-product', deleteProductApiRoute);



// Home page
// avoid creating more routes in this file

app.get('/', (req, res) => {
  //access database query all products

  productsQueries.getProductsFromDB()
  .then(products => {
    const templateVars = {products: products, user: '' };
     res.render('index', templateVars);
  })
  .catch(err => {
     res
       .status(500)
       .json({error: err.message});
  });
  //res.render('index');
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


