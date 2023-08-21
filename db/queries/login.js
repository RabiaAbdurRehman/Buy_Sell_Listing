const db = require('../connection');

const userLogin = function(db, usersEmail) {
  const queryParams = [usersEmail];
  let queryString = `
  SELECT *
  FROM users
  WHERE email = $1
  LIMIT 1;
  `;
  return db.query(queryString, queryParams)
    .then((res) => res.rows
    );
};


module.exports = {userLogin};
