var express = require('express');
var bodyParser = require('body-parser')
var app = express()

// otherwise req.body will return undefined
app.use(bodyParser.json());

const db = require('./db/init.js');
var bcrypt = require('bcrypt');

const generateToken = require('./generateToken.js');


// signs up and signs in right away
// create user in db, create a signed token (so that we know it's from our server)
app.post('/users/signup', (req, res, next) => {
  const body = req.body;
  const user = {
    username: body.username,
    password: bcrypt.hashSync(body.password, bcrypt.genSaltSync(10)), // just salt
    name: body.name
  };

  db.none("INSERT INTO users(username, password, name) VALUES(${username}, ${password}, ${name})", user)
    .then(() => {
      const token = generateToken(user); // Generate Token
      res.json({ token });
    })
    .catch((error) => {
      console.log({ error });
      res.status(422);
    })
});

// every time on sign in we renew the user from db. otherwise we just store them on frontend in jwt.
// password, username
app.post('/users/signin', (req, res) => {
  db.one("SELECT * FROM users WHERE username=$1", req.body.username)
    .then((user) => {
      if (!bcrypt.compareSync(req.body.password, user.password)){ // if passwords don't match
        return res.status(404).json({ message: 'Password is Wrong' });
      }
      const token = generateToken(user); //<-- Generate token
      res.json({ token });
    })
    .catch((error) => {
      console.log(error.stack)
      res.status(422);
    });
});


var jwt = require('jsonwebtoken');
// headers
app.get('/secret_info', (req, res) => {
  jwt.verify(req.headers['authorization'], 'our server secret', (err, user) => {
    if (err) throw err;
    res.json({ info: 'secret' });
  });
});

app.use(express.static('./html'));

app.listen(3000)
