const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

/**
 * Generate Token
 * @param {string} partnerid, countryid, environment(development, production)
 * @returns {string} token
 */
exports.createPartnerToken = (partnerid, countrycode, environment) => {
  const token = jwt.sign(
    {
      partnerid,
      countrycode,
      environment
    },
    process.env.SECRET_KEY
  );

  return token;
};
