const express  = require('express');
const router = express.Router();
const multer = require("multer");

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

const {
  getCompany,
  addCompany,
} = require("./../../controllers/company");

router.get('/showCompany', getCompany);
router.post('/addCompany', upload.single("file"), addCompany);

module.exports = router;
