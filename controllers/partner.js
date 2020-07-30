const express  = require('express');
const router = express.Router();
const pool = require('./../database/queries');
const { fileUpload } = require("./../Helpers/uploads");

exports.addPartner = async (req, res) => {
  let data = req.body.document;
  let {confirm} = JSON.parse(data);
  if(confirm){
    pool.query('SELECT * FROM partner')
    .then((results)=>{
      res.status(200).json({
        partnerIdAssigned: results.rowCount +1
      });
    })
  }else{
    const {company_name, registration_id, vat, brand_name, country_present_in, state_present_in, main_product, insurance_product_name, company_metadata, createdate, updatedate, status} = JSON.parse(data);
    const file = req.file;
    const upload = await fileUpload(file, 'xpcfiles', 'insurancedocs')
    let upload_doc = upload.Location;
    // save data to insurance_company database
    await pool.query(
    'INSERT INTO partner  (company_name, registration_id, vat, brand_name, country_present_in, state_present_in, main_product, insurance_product_name, upload_doc, company_metadata, createdate, updatedate, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
    [company_name, registration_id, vat, brand_name, country_present_in, state_present_in, main_product, insurance_product_name, upload_doc, company_metadata, createdate, updatedate, status], (error, results) => {
    if (error) {
    throw error;
    }
    res.status(201).json({
      status: 'sucess',
      data: results.rows
    });
    });
  }
};


// for our purpose --> API to get partner details from partner.sql
exports.getPartner = async (req, res) => {
  pool.query('SELECT * FROM partner')
  .then((results)=>{
    res.status(200).json({
      status: 'sucess',
      requestTime: req.requestTime,
      data: results.rows,
    });
  })
};
