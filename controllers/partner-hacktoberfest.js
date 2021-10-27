const express  = require('express');
const router = express.Router();
const pool = require('./../database/queries');

exports.getHACKPartner = async (req, res) => {
  pool.query('SELECT * FROM partnerHack')
  .then((results)=>{
    res.status(200).json({
      status: 'sucess',
      requestTime: req.requestTime,
      data: results.rows,
    });
  })
};
