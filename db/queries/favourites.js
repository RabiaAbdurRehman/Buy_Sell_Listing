const db = require('../connection');
//add to favourites
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
//display favourites
const  getFavouritesByUserId = function(userId) {
  return db.query(`
  SELECT favourites.id, title, description, products.id AS product_id, image_url, price
  FROM favourites
  JOIN products ON product_id = products.id
  WHERE favourites.user_id = $1
  ORDER BY favourites.created_at;
  `, [userId])
    .then((data) => {
      //console.log("CHECKING", result.rows);
      return data.rows;
    })
    .catch((error) => {
      console.error(error.message);
    });
};

// Remove product from favourite (UNLIKE!)
const removeProductFromFavourites = function(userId, productId) {
  return db.query(`
    DELETE FROM favourites
    WHERE user_id = $1
    AND product_id = $2
  `, [userId, productId]);
};



module.exports = {addProductToFavourites, getFavouritesByUserId};
