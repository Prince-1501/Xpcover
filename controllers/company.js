const express  = require('express');
const router = express.Router();
const pool = require('./../database/queries');
const { fileUpload } = require("./../Helpers/uploads");

exports.addCompany = async (req, res) => {
  let data = req.body.document;
  let {confirm} = JSON.parse(data);
  if(confirm){
    pool.query('SELECT * FROM insurance_company')
    .then((results)=>{
      res.status(200).json({
        insuranceCompanyIdAssigned: results.rowCount +1
      });
    })
  }else{
    //Get data from req.body
    const {confirm, registered_company_name, partner_brand_name, company_registration_id, company_vat, website_url, country_present_in, state_present_in, select_insurance_product, head_sales_name, head_sales_email, head_sales_phone, admin_name, admin_email, admin_phone, createdate, updatedate, status, intermediary_code, intermediary_name, contact, intermediary_address, intermediary_fax} = JSON.parse(data);
    const file = req.file;
    const upload = await fileUpload(file, 'xpcfiles', 'insurancedocs')
    let upload_partner_registration_proof = upload.Location;

    //save data to insurance_company database
    await pool.query(
    'INSERT INTO insurance_company  (registered_company_name, partner_brand_name, company_registration_id, company_vat, website_url, country_present_in, state_present_in, select_insurance_product, upload_partner_registration_proof, head_sales_name, head_sales_email, head_sales_phone, admin_name, admin_email, admin_phone, createdate, updatedate, status, intermediary_code, intermediary_name, contact, intermediary_address, intermediary_fax) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)',
    [registered_company_name, partner_brand_name, company_registration_id, company_vat, website_url, country_present_in, state_present_in, select_insurance_product, upload_partner_registration_proof, head_sales_name, head_sales_email, head_sales_phone, admin_name, admin_email, admin_phone, createdate, updatedate, status, intermediary_code, intermediary_name, contact, intermediary_address, intermediary_fax], (error, results) => {
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

// for our purpose --> API to get insurance_company details from insurance_company.sql
exports.getCompany = (req, res) => {
  pool.query('SELECT * FROM insurance_company')
  .then((results)=>{
    res.status(200).json({
      status: 'sucess',
      requestTime: req.requestTime,
      data: results.rows,
    });
  })
};


/*
try{
  const file = req.file;
  const upload = await fileUpload(file, 'xpcfiles', 'insurancedocs')
  let upload_partner_registration_proof = upload.Location;
  console.log(upload);
  console.log(`upload_partner_registration_proof : ${upload_partner_registration_proof}`);
}catch(error){
  console.log(error);
}

*/
