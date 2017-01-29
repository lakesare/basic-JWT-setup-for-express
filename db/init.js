var pgPackage = require('pg-promise')();

const connectionString = {
  database: 'jwtAuthentication',
  user: 'postgres',
  password: '`1`1`1'
};
const db = pgPackage(connectionString);
db.connect()
  .then(function (obj) {
    obj.done(); // success, release the connection;
  })
  .catch(function (error) {
    console.log("ERROR:", error.message || error);
});

module.exports = db;
