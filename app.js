require('dotenv').config()
const express = require('express');
const app = express();
const morgan = require("morgan");
const db = require('./configs/db.configs')
const usersRouter = require('./routes/users')


const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", usersRouter(db))


app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});


module.exports = app