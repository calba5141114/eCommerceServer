// DEPENDENCIES
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/User');

// Saves user to database, retruns
// confirmation string along with a token
const signUp = async (req, res) => {
  // Create new user object
  const user = await new User();

  user.fullName = req.body.fullName;
  user.email = req.body.email;
  user.password = req.body.password;

  // Save new user check for errors,
  // if no errors create and send token
  await user.save((err, savedUser) => {
    if (err) {
      console.log(err);
      return res.json({ err }).status(500);
    } else {
      const payload = { subject: savedUser };
      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXP }
      );

      return res.json({ token }).status(200);
    }
  });
};

// Authorizes a previously registered user,
// return a token
const logIn = async (req, res) => {
  await passport.authenticate(
    'local',
    (err, user, data) => {
      if (err) {
        console.log(err);
        return res.json({ err }).status(500);
      }

      if (user) {
        const payload = { subject: user };
        const token = jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: JWT_EXP }
        );
        res.json({ token }).status(200);
      } else {
        return res.json({ data }).status(401);
      }
    }
  ),
    (req, res);
};

// Export Auth functions
module.module.exports = {
  signUp,
  logIn
};
