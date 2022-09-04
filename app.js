require('dotenv').config()
const express = require('express');
const app = express();
const morgan = require("morgan");
const db = require('./configs/db.configs')


const bodyParser = require("body-parser")
const session = require('express-session')


const port = process.env.PORT || 8080;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.use(session({
  secret : 'secrete',
  resave : false,
  saveUninitialized: true,
  cookie: {secure: true}
}))

const usersRouter = require('./routes/users')
const tweetsRouter = require('./routes/tweets')
app.use("/users", usersRouter(db))
app.use("/tweets",tweetsRouter(db))


app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});


module.exports = app