var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = `postgres://mitch:mtdupuie@3.144.206.175:5432/mvp`;
var db = pgp(connectionString);

// add query functions

module.exports = {

  getResults: () => {
    return db.query(`SELECT results.result FROM results ORDER BY id DESC LIMIT 10`);
  },

  addResult: (result) => {
    return db.query(`INSERT INTO results (result) VALUES (${result})`)
  },

  signUp: ({ username, password, points }) => {
    return db.query(`INSERT INTO users (username, password, points) VALUES ('${username}', '${password}', ${points})`)
  },

  login: (username) => {
    return db.query(`SELECT password, id, points FROM users WHERE username = '${username}'`)
  },

  addToPoints: ({ id, points }) => {
    return db.query(`UPDATE users SET points = ${Number(points)} WHERE id = ${Number(id)}`)
  }
};