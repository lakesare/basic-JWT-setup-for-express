//Generate Token using secret from process.env.JWT_SECRET
var jwt = require('jsonwebtoken');
const generateToken = (user) => {
  // Dont use password and other sensitive fields
  var u = {
    name: user.name,
    username: user.username,
  };
  return token = jwt.sign(u, 'our server secret');
}

module.exports = generateToken;
