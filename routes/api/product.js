const express  = require('express');
const router = express.Router();

const {
  sendData,
  getProduct,
  postProduct
} = require("./../../controllers/product");

router.get('/addProduct/data', sendData);
router.get('/showProduct', getProduct);
router.post('/addProduct', postProduct);

module.exports = router;
