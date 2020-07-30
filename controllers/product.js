const express  = require('express');
const router = express.Router();
const pool = require('./../database/queries');

const data = {
	insurance_type: [
		{ id: 'A', value: 'Accident and Health' },
		{ id: 'B', value: 'Aviation' },
		{ id: 'C', value: 'Commercial' },
		{ id: 'D', value: 'Engg' },
		{ id: 'E', value: 'Fire' },
    { id: 'F', value: 'Hull' },
		{ id: 'G', value: 'Marine Cargo' },
		{ id: 'H', value: 'Misc' },
		{ id: 'I', value: 'Motor' },
    { id: 'J', value: 'Other Liability' },
    { id: 'K', value: 'Rural' },
    { id: 'L', value: 'Speciality' }
	],
	insurance_category: [
		{ id: 'A', value: 'Add-on' },
		{ id: 'B', value: 'Main Product' },
		{ id: 'C', value: 'Micro' },
    { id: 'D', value: 'POS' },
    { id: 'E', value: 'Rural' }
	],
};

// Send Above data as a API
exports.sendData = (req, res) => {
  res.send(data);
};

// Get request of Product Table
exports.getProduct = async (req, res) => {
  pool.query('SELECT * FROM insurance_product')
  .then((results)=>{
    res.send(results.rows);
  })
};

// Post request of Product Table
exports.postProduct = async (req, res) => {

  // Get data from req.body
  let product_name = req.body.product_name;
  let insurance_type = req.body.insurance_type;
  let insurance_category = req.body.insurance_category;
  let tags = req.body.tags;

  // Fetch Basic product_id from sql table
  let numberOfRow =  await pool.query('SELECT * FROM insurance_product');
  numberOfRow = numberOfRow.rowCount;
  let coreId =  await pool.query('SELECT * FROM product_id');
  coreId = coreId.rows[numberOfRow].product_id
  //console.log(coreId);

  const insurance_product_id = `${insurance_type}${insurance_category}${coreId}`;

  data['insurance_type'].map((val)=>{
    if(val.id == insurance_type){
      insurance_type = val.value
    }
  })
  console.log(insurance_type);
  data['insurance_category'].map((val)=>{
    if(val.id == insurance_category){
      insurance_category = val.value
    }
  })

  // save data to insurance_product database
  await pool.query(
  'INSERT INTO insurance_product  (product_name, insurance_type, insurance_category, tags, insurance_product_id) VALUES ($1, $2, $3, $4, $5)',
  [product_name, insurance_type, insurance_category, tags, insurance_product_id], (error, results) => {
  if (error) {
  throw error;
  }
  res.status(201).json({
    productIdAssigned : insurance_product_id
  });
  });
};


/*
Dummay data
{
"product_name" : "VechiDrilling work for water wells - CARcle",
"insurance_type": "A",
"insurance_category": "D",
"tags": "Construction All Risk"
}
*/
