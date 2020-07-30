const express = require('express');
const router = express.Router();

const { sendMail, createPDF } = require('../controllers/pdf');


//router.get('/sendmail', sendMail);
router.get('/policy/:customerId/:transactionId', createPDF);

module.exports = router;