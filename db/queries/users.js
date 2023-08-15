const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};
// Get user's products
const getUserProducts = function(userId) {
  return db.query(`
    SELECT * FROM products
    WHERE user_id = $1;
  `, [userId])
  .then(data => {
    return data.rows;
  });
};


module.exports = { getUsers };
