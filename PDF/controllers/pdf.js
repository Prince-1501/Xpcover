const customerModel = require(".../models/customer");
const aws = require('aws-sdk');
require('dotenv').config();
const s3 = new aws.S3({ accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET_KEY, region: 'ap-south-1' });
const fs = require('fs');






exports.createPDF = async (req, res) => {
    var clientList = [];
    const customerid = req.params.customerId;
    var template;

    try {

      await customerModel.find({"policyHolderDetails.customerId": customerid}).exec(function(err,clientDetails){
        if (err) throw err;
        
        clientList.push( {email: clientDetails.policyHolderDetails.email, customerName: clientDetails.policyHolderDetails.NameOfPolicyHolder, 
                        policyNo: clientDetails.policyDetails.policyNumber, DateIssued: clientDetails.policyDetails.DateIssued, 
                        productName: clientDetails.policyDetails.productName, renewalDueDate: clientDetails.policyDetails.renewalDueDate,
                        policyCommencementDate: clientDetails.policyDetails.policyCommencementDate, planName: clientDetails.policyDetails.planName,
                        coverType: clientDetails.policyDetails.coverType, sumInsured: clientDetails.policyDetails.sumInsured, policyPeriod: clientDetails.policyDetails.policyPeriod,  
                        customerId: clientDetails.policyHolderDetails.customerId, clientDOB: clientDetails.policyHolderDetails.PolicyHolderDateOfBirth,
                        country: clientDetails.policyHolderDetails.country, mobileNumber: clientDetails.policyHolderDetails.mobileNumber,
                        occupation: clientDetails.policyHolderDetails.occupation, clientAddressLine1: clientDetails.policyHolderDetails.address.addressLine1,
                        clientAddressState: clientDetails.policyHolderDetails.address.state, clientAddressCity: clientDetails.policyHolderDetails.address.city,
                        clientAddressPincode: clientDetails.policyHolderDetails.address.pincode,   
                        nomineeName: clientDetails.nomineeDetails.nomineeName, relationship: clientDetails.nomineeDetails.relationship,
                        templateId: clientDetails.template_id,insuranceCompany: clientDetails.insurance_company});
        

        const getParams = {
          Bucket: 'templatexpcover',
          Key: clientList[0].insuranceCompany+'/'+clientList[0].templateId+'.html'
      };
      
        
        s3.getObject(getParams, function (err, data) {
          if (err) {
              console.log(err);
          } else {
              var Cname = clientList[0].customerName
              var Company = clientList[0].insuranceCompany
              var Pno = clientList[0].policyNo
              template = data.Body.toString();
              template = template.replace("<%= CustName %>",Cname);
              template = template.replace("<%= compName %>",Company);
              template = template.replace("<%= polNo %>",Pno);
              template = template.replace("<%= InsComp %>",'Indian Insurance');
              var script = fs.readFileSync(__dirname +'\\script.txt', 'utf8');
              var temp1 = template.split("</html>");
              template= temp1[0].concat(script);
              template = template.concat("</html>");
             
              
              
              res.send(template);
            }
      
          });

      });
    }

    catch(err){

      return res.status(400).json({
          statusCode: 400,
          status: "fail",
          message: "Something went wrong, please try again",
          error: error,
        });

  }


};
