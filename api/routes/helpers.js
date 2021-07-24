const bcrypt = require('bcrypt');
const auth = require('basic-auth');
let chalk = require('chalk');

const User = require('../models').User;

/* Handler function to catch async and sequelize errors */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
      
    } catch (error) {
      if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") { // checking sequelize errors
        const errors = error.errors.map(err => err.message);
        console.log(error)
        res.status(400).json({
          error: errors
        })
      } else next(error); // Forward error to the global error handler
    }
  }
}

/* Handler function to authenticate user */
async function authenticateUser(req, res, next) {
  const credentials = auth(req);
  console.log(credentials)
  console.log(req.buffer)
  console.log(req._headers)
  let message = null;
  if (credentials) {
    const user = await User.findOne({ where: {emailAddress: credentials.name} });

    if (user) {
      const authenticated = bcrypt.compareSync(credentials.pass, user.password);

      if (authenticated) {
        console.log(chalk.bold.green(`Authentication successful for username: ${credentials.name}`));
        req.currentUser = user.dataValues.id;  // Store the user on the Request object.

      } else message = `Authentication failure for username: ${credentials.name}`;

    } else message = `User not found for username: ${credentials.name}`;

  } else message = 'Auth header not found';

  if (message) { // if fail console log 'message' and deny entry
    console.warn(chalk.bold.red(message));
    res.status(401).json({ error: 'Access Denied' });

  } else next(); // User authenticated and program can continue to next step
}

module.exports = { asyncHandler, authenticateUser };