// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
const passport = require('passport');

require('dotenv').config();
require('./config/passport/index');

// INIT SERVER
const server = express();

// DATABASE
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('CONNECTED TO DATABASE');
  })
  .catch(err => {
    console.log(err);
    return err;
  });

// MIDDLEWARE
server.use(bodyParser.json());
server.use(cookieParser());
server.use(expressValidator());
server.use(cors());
server.use(passport.initialize());

// PORT
const port = process.env.PORT;

// CONNECTING
server.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT: ${port}`);
});
