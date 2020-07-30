const fs = require("fs");
const s3 = require("./aws");

const {
  statusCode,
  returnErrorJsonResponse,
  returnJsonResponse,
} = require("./status");
const { json } = require("body-parser");

exports.fileUpload = async (
  fileName,
  bucketName = "xpcover",
  folderName = ""
) => {
  // setting up s3 upload parameters
  var params = {
    Bucket: bucketName + "/" + folderName,
    Key: Date.now() + "_" + fileName.originalname.toString(),
    Body: fileName.buffer,
    ContentType: fileName.mimetype,
    ACL: "public-read",
  };

  // Uploading files to bucket

  const data = await s3.upload(params).promise();
  if (!data) {
    return json(
      returnErrorJsonResponse(
        statusCode.error,
        "fail",
        "File not uploaded successfull, Please try again"
      )
    );
  }

  return data;
};
