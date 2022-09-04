require('dotenv').config()
const express = require('express');
const app = express();
const morgan = require("morgan");

const port = process.env.PORT || 8080;

app.use(express.json());

const { Pool } = require("pg");
const dbParams = require("./library/db");

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});