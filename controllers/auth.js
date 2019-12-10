// DEPENDENCIES
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/User');

/**
 * This method of routing works but I would say
 * use the built in Express Router since it provides 
 * rich documentation which in turn provides rich intellisense
 * to your IDE of choice.
 */


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

/**
 * Authorizes a previously registered user 
 * and returns an 200 status as well as an object 
 * containing a valid JWT.
 */
module.exports.logIn = async (req, res) => {
  await passport.authenticate('local', (error, user, data) => {
      if (error) return res.status(500).send(error.message);
      if (user) {
        const payload = { subject: user };
        const token = jwt.sign(payload, process.env.JWT_SECRET,{ expiresIn: JWT_EXP });
        return res.status(200).json({ token: token })
      }
      return res.status(401).json({ data });
    }
  ),(req, res);
  // left this bottom section unmodified since idk what it does.
};
