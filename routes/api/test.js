const express  = require('express');
const router = express.Router();

router.post('/test', (req, res)=>{
  console.log(req.body);
  console.log(req.file);
})

module.exports = router;
