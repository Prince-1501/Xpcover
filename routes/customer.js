const express = require("express");
const multer = require("multer");

const router = express.Router();

const {
  createCustomerRequest,
  fileUpload,
} = require("../controllers/customer");

const { verifyToken } = require("../Middlewares/verifyAuth");
const { verifyCountry } = require("../Middlewares/verifyCountryAndDB");
const { mongoConnection } = require("../database/mongo");

// Multer ships with storage engines DiskStorage and MemoryStorage
// And Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

router.post(
  "/partners",
  verifyToken,
  verifyCountry,
  mongoConnection,
  createCustomerRequest
);

router.put("/upload", upload.single("file"), fileUpload);

module.exports = router;
