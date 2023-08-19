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

// const getUserWithEmail = function(db, usersEmail) {
//   const queryParams = [usersEmail];
//   let queryString = `
//   SELECT *
//   FROM users
//   WHERE email = $1
//   LIMIT 1;
//   `;
//   return db.query(queryString, queryParams)
//     .then((res) => res.rows);

// };


module.exports = { getUsers, getUserProducts,
  // getUserWithEmail
};
