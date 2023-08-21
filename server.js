// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const bodyParser    = require("body-parser");


const usersRoutes = require('./routes/users');
const usersApiRoutes = require('./routes/users-api');

const productsRoutes = require('./routes/products');
const productsApiRoutes = require('./routes/products-api');

const favouritesProduct = require('./routes/favourites');
const favouriteApiRoutes = require('./routes/favourites-api');

const loginRoute = require('./routes/login');
const productsQueries = require('./db/queries/products');
const PORT = process.env.PORT || 8080;
const app = express();
app.set('view engine', 'ejs');

// Separated Routes for each Resource
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
//public assets which will never change.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/products', productsRoutes);
app.use('/api/products', productsApiRoutes);

app.use('/users', usersRoutes);
app.use('/api/users', usersApiRoutes);

app.use('/favourites', favouritesProduct);
app.use('/api/favourites', favouriteApiRoutes);

app.use("/login", loginRoute);



// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
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



// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.

app.use(morgan('dev'));
// body parser
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
