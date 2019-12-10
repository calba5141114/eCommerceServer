// DEPENDENCIES
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/User');

/**
 * Saves User to MongoDB afterwards
 * it returns a 201 status with an object containing 
 * a valid JWT token.
 */
module.exports.signUp = async (req, res) => {
  try {
    // Destructure incoming user data from request body object.
    const { fullname, email, password } = req.body;
    // Instantiate a new User object.
    const user = new User({ fullname, email, password });
    // Save the User object to MongoDB.
    await user.save(); 
    const payload = { subject: user };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXP }
    );
      /**
       * Returns a 201 status to confirm Resource Creation and writes token string to an object
       */
    return res.status(201).json({ token: token })
  } catch (error) {
    // print out any errors that occur.
    console.log(error.message);
    return res.status(500).send(error.message);
  }
};

// Authorizes a previously registered user,
// return a token
module.exports.logIn = async (req, res) => {
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
