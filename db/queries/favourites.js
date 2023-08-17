const db = require('../connection');

const addProductToFavourites = function(userId, productId) {
  return db.query(`
    INSERT INTO favourites (user_id, product_id)
    VALUES ($1, $2)
    RETURNING *
  `, [userId, productId])
    .then(data => {
      return data.rows[0];
    });
};


const getFavouritesByUserId = function(userId) {
  return db.query(`
    SELECT *
    FROM favourites
    JOIN products on products.id = product_id
    WHERE favourites.user_id = $1
  `, [userId])
    .then(data => {
      return data.rows;

    })
    .catch((error) => {
      console.error(error.message);
    });
};


  module.exports = { addProductToFavourites, getFavouritesByUserId };
