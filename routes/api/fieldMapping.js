const express  = require('express');
const router = express.Router();

const {
  showAlias,
  addAlias,
} = require("./../../controllers/fieldMapping");

router.get('/alias', showAlias);
router.post('/alias', addAlias);

module.exports = router;
