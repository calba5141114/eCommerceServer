// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');

// INIT SERVER
const server = express();

// DATABASE
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('Connected To Database');
  });

// MIDDLEWARE
server.use(bodyParser.json());
server.use(cookieParser());
server.use(expressValidator());
server.use(cors());

// PORT
const port = process.env.PORT;

// CONNECTING
server.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT: ${port}`);
});
