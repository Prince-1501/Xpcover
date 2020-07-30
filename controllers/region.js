const express  = require('express');
const router = express.Router();
const pool = require('./../database/queries');

// Get request of country Table
exports.getCountry = async (req, res) => {
  pool.query('SELECT * FROM country')
  .then((results)=>{
    res.send(results.rows);
  })
};

// Get request of state Table
exports.getState = async (req, res) => {
  pool.query('SELECT * FROM state')
  .then((results)=>{
    res.send(results.rows);
  })
};
