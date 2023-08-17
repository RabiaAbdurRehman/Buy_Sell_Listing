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

module.exports = {addProductToFavourites};
