require('dotenv').config()
const express = require('express');
const app = express();
const morgan = require("morgan");
const db = require('./configs/db.configs')
const usersRouter = require('./routes/users')
const cookieSession = require("cookie-session")
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


app.use("/users", usersRouter(db))


app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});


module.exports = app