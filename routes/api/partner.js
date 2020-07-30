const express  = require('express');
const router = express.Router();

const {
  getPartner,
  addPartner
} = require("./../../controllers/partner");


router.get('/showPartner', getPartner);
router.post('/addPartner', addPartner);

module.exports = router;
