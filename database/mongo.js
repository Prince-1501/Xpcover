const mongoose = require("mongoose");

const { statusCode, returnErrorJsonResponse } = require("../Helpers/status.js");

require("dotenv").config();

exports.mongoConnection = async (req, res, next) => {
  var DBURL = "mongodb://localhost:27017/xpcover";
  try {
    if (req != "undefined") {
      DBURL = req.userCountry.uri;
      await mongoose.connect(DBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      next();
    } else {
      await mongoose.connect(DBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
    }
  } catch (error) {
    return;
    json(
      returnErrorJsonResponse(
        statusCode.bad,
        "fail",
        "Something went wrong, Please try again",
        error
      )
    );
  }
};
