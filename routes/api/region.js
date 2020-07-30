const express  = require('express');
const router = express.Router();

const {
  getCountry,
  getState
} = require("./../../controllers/region");

router.get('/country', getCountry);
router.get('/state', getState);

module.exports = router;
