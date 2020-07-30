// Importing DB's
const dbs = require("../config/dbs");
require("dotenv").config();

const { statusCode, returnErrorJsonResponse } = require("../Helpers/status.js");

exports.verifyCountry = async (req, res, next) => {
  const partnerid = req.partnerDetails.partnerid;
  const country = req.partnerDetails.countryid;
  const environment = "development"; //req.partnerDetails.environment;
  try {
    if (environment && environment == "development") {
      req.userCountry = dbs["development"];
      next();
    } else if (environment && environment == "production") {
      if (country && dbs[country]) {
        req.userCountry = dbs[country];
        next();
      } else {
        return res
          .status(statusCode.notfound)
          .json(
            returnErrorJsonResponse(
              statusCode.bad,
              "fail",
              "Sorry, We dont provide our services in your country",
              error
            )
          );
      }
    } else {
      return res
        .status(statusCode.notfound)
        .json(
          returnErrorJsonResponse(
            statusCode.bad,
            "fail",
            "Your token doesnot specify key environment condition",
            error
          )
        );
    }
  } catch (error) {
    return res
      .status(statusCode.bad)
      .json(
        returnErrorJsonResponse(
          statusCode.bad,
          "fail",
          "Something went wrong, Please try again",
          error
        )
      );
  }
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVyaWQiOiIxIiwiY291bnRyeWlkIjoiaW5kaWEiLCJpYXQiOjE1OTI3OTk4MjJ9.NngSMfoIXJUp1sys5o9e6OKndIshcAGyZp8so62AYp8
