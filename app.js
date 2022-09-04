require('dotenv').config()
const express = require('express');
const app = express();
const morgan = require("morgan");
const db = require('./configs/db.configs')
const usersRouter = require('./routes/users')
const cookieSession = require("cookie-session")
const bodyParser = require("body-parser")


const port = process.env.PORT || 8080;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));


app.use("/users", usersRouter(db))


app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});


module.exports = app