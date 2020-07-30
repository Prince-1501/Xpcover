const jwt = require("jsonwebtoken");

const { pool } = require("../database/pg");

const {
  statusCode,
  returnErrorJsonResponse,
  returnJsonResponse,
} = require("../Helpers/status.js");

exports.verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(statusCode.unauthorized)
      .json(
        returnJsonResponse(
          statusCode.unauthorized,
          "fail",
          "Unauthorized request, Try again.",
          []
        )
      );
  }

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (decoded) {
      const partnerId = "RESGISTARTION71209323QP"; //decoded.partnerid;

      const partnerVerificationQuery =
        "Select * from partner where registration_id = '" + partnerId + "' ";
      const partnerVerification = await pool.query(partnerVerificationQuery);

      if (!partnerVerification.rowCount > 0) {
        return res
          .status(statusCode.unauthorized)
          .json(
            returnJsonResponse(
              statusCode.unauthorized,
              "fail",
              "Unauthorized Merchent ID, Please use right Token",
              []
            )
          );
      }

      req.partnerDetails = decoded;
      next();
    } else {
      return res
        .status(statusCode.unauthorized)
        .json(
          returnJsonResponse(
            statusCode.unauthorized,
            "fail",
            "Unauthorized token, Use correct Token.",
            []
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
