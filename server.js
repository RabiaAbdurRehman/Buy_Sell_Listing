
// load .env data into process.env
require('dotenv').config();

// WEB SERVER CONFIGURATION

const PORT = process.env.PORT || 8080;

const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const sassMiddleware = require('./lib/sass-middleware');
const bodyParser = require("body-parser");

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

const usersRoutes = require('./routes/users');
const usersApiRoutes = require('./routes/users-api');
const productsRoutes = require('./routes/products');
const productsApiRoutes = require('./routes/products-api');
const favouritesProduct = require('./routes/favourites');
const favouriteApiRoutes = require('./routes/favourites-api');
const loginRoute = require('./routes/login');
const loginApiRoute = require('./routes/login-api');
const logoutRoute = require('./routes/logout');
const addProductRoute = require('./routes/add_product');
const addProductApiRoute = require('./routes/add_product-api');


app.use('/products', productsRoutes);
app.use('/add_product', addProductRoute);
app.use('/api/products', productsApiRoutes);
app.use('/api/add-product', addProductApiRoute);

app.use('/users', usersRoutes);
app.use('/api/users', usersApiRoutes);

app.use('/favourites', favouritesProduct);
app.use('/api/favourites', favouriteApiRoutes);

// Auth
app.use('/login', loginRoute);
app.use('/api/login', loginApiRoute);
app.use('/logout', logoutRoute);



// Home page
// avoid creating more routes in this file

app.get('/', (req, res) => {
  res.redirect('/products');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});



