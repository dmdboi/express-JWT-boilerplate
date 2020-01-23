const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger("dev"));

app.get('/api', (req, res) => {
  res.json({
    message: "Welcome to the API."
  })
})

app.post('/api/login', (req, res) => {
  //Mock user
  const user = {
    id: 1,
    username: "Fred",
    email: "test@diamond.com"
  }
  jwt.sign({user}, 'secret', {expiresIn: '24h'},(err, token) => {
    res.json({
      token
    })
  } )
})

app.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secret', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      res.json({
        message: "Post created",
        authData
      })
    }
  })
})

//verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1]
    req.token = bearerToken;
    next()
  } else {
    res.sendStatus(403)
  }

}

app.listen(process.env.PORT);
