const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");

const { pool } = require("../database/pg");
const customerModel = require("../models/customer");
const { ratingEngine } = require("../rating_engine/main");

const {
  statusCode,
  returnErrorJsonResponse,
  returnJsonResponse,
} = require("../Helpers/status.js");
const { mongoConnection } = require("../database/mongo");

const { fileUpload } = require("../Helpers/uploads");

exports.createCustomerRequest = async (req, res) => {
  try {
    const partnerId = req.partnerDetails.partnerid;
    const productId = req.headers.productid;
    const transaction_type = req.headers.transactiontype;

    const partnerData = req.body;

    let getInsuranceProductQuery =
      "SELECT ip.insurance_product_id, ipppm.partner_product_id, ipppm.start_date, ip.insurance_type, ip.insurance_category, ip.country_id, ip.insurance_company_id, ip.product_name as insurance_product_name, pd.product_name as partner_product_name, pd.partner_id FROM insurance_product_and_partner_product_mapping as ipppm JOIN insurance_product as ip ON ipppm.insurance_product_id = ip.id JOIN partner_product as pd ON ipppm.partner_product_id = pd.id where ipppm.partner_product_id ='" +
      productId +
      "' ";
    const getInsuranceProduct = await pool.query(getInsuranceProductQuery);

    if (
      !getInsuranceProduct.rows ||
      getInsuranceProduct.rows == [] ||
      getInsuranceProduct.rows.length === 0
    ) {
      return res
        .status(statusCode.bad)
        .json(
          returnErrorJsonResponse(
            statusCode.notfound,
            "fail",
            "Product Id not valid, please send correct product id in headers"
          )
        );
    }

    const insurancePolicyData = getInsuranceProduct.rows;

    // transaction_type = 0 - quotation, 1 - Payment, 2 - Endorsement, 3 - Cancellataion, 4 - Claim;

    switch (transaction_type) {
      case "0":
        // Show quotation
        const transactionId = uuidv4();
        const requestDetails = {
          partnerId: partnerId,
          productId: productId,
          transaction_type: transaction_type,
          transactionId: transactionId,
        };

        const quotations = await showQuotations(
          partnerData,
          insurancePolicyData,
          requestDetails
        );
        return res
          .status(statusCode.success)
          .json(
            returnJsonResponse(
              statusCode.success,
              "success",
              "Quotations Fetched Successfully",
              quotations
            )
          );

        break;

      case "1":
        const tid = { transactionId: req.body.transactionId };
        const paymentDetails = {
          transactionType: req.body.transaction_type,
          payment: {
            paymentId: req.body.paymentId,
            paymentAmount: req.body.paymentAmount,
          },
          bankDetails: { bankName: req.body.bankName, iban: req.body.iban },
          policyDetails: {
            policyNumber: req.body.policyNumber,
            receiptNumber: req.body.receiptNumber,
            DateIssued: req.body.DateIssued,
            policyProducerCode: req.body.policyProducerCode,
            policyCommencementDate: req.body.policyCommencementDate,
            policyCommencementTime: req.body.policyCommencementTime,
            productName: req.body.productName,
            planName: req.body.planName,
            coverType: req.body.coverType,
            sumInsured: req.body.sumInsured,
            renewalDueDate: req.body.renewalDueDate,
            periodOfInsurance: { from: req.body.from, to: req.body.to },
            policyPeriod: req.body.policyPeriod,
            clientType: req.body.client,
          },
          policyHolderDetails: {
            NameOfPolicyHolder: req.body.NameOfPolicyHolder,
            policyHolderDateOfBirth: req.body.policyHolderDateOfBirth,
            country: req.body.country,
            occupation: req.body.occupation,
            mobileNumber: req.body.mobileNumber,
            email: req.body.email,
            gender: req.body.gender,
            uniqueCountryId: req.body.uniqueCountryId,
            uniqueCountryIdExpiryDate: req.body.uniqueCountryIdExpiryDate,
            customerId: req.body.customerId,
            customerGstinNumber: req.body.customerGstinNumber,
            address: {
              addressLine1: req.body.addressLine1,
              country: req.body.country,
              countryId: req.body.countryId,
              state: req.body.state,
              stateId: req.body.stateId,
              city: req.body.city,
              pincode: req.body.pincode,
              ipAddress: req.body.ipAddress,
              longitude: req.body.longitude,
              latitude: req.body.latitude,
            },
          },
          nomineeDetails: {
            nomineeName: req.body.nomineeName,
            nomineeAddress: {
              address: {
                addressLine1: req.body.addressLine1,
                country: req.body.country,
                countryId: req.body.countryId,
                state: req.body.state,
                stateId: req.body.stateId,
                city: req.body.city,
                pincode: req.body.pincode,
                ipAddress: req.body.ipAddress,
                longitude: req.body.longitude,
                latitude: req.body.latitude,
              },
            },
            relationship: req.body.relationship,
          },
        };

        // Save payment details
        const savedResult = await savePaymentDetals(paymentDetails, tid);

        return res
          .status(statusCode.success)
          .json(
            returnJsonResponse(
              statusCode.success,
              "success",
              "Payment Done and Policy Issued Successfully",
              savedResult
            )
          );
        break;

      case "2":
        // Endorsement Related Details

        break;

      case "3":
        // Cancellation related details

        break;

      case "4":
        // Claims

        break;

      default:
        break;
    }
  } catch (error) {
    return res
      .status(statusCode.bad)
      .json(
        returnErrorJsonResponse(
          statusCode.bad,
          "fail",
          "Something went wrong, Please try again",
          error
        )
      );
  }
};

const showQuotations = async (
  partnerData,
  insurancePolicyData,
  requestDetails
) => {
  // x1 = name // RDBMS
  // x1 = "Rishabh" // Partner
  // insurance_product -> precalculations -> data fetch

  // premium_calculation:{
  //   name: "Rishabh",
  //   lastname: "Porwal",
  //   relationship: "Brother"
  // },

  const output = await ratingEngine(partnerData, insurancePolicyData);

  const customer = new customerModel({
    transactionId: requestDetails.transactionId,
    transactionType: requestDetails.transaction_type,
    quotation: output,
    productId: insurancePolicyData[0].insurance_product_id,
    productName: insurancePolicyData[0].partner_product_name,
  });
  const customerResult = await customer.save();

  const quotationResult = {
    transactionid: customerResult.transactionId,
    quotation: customerResult.quotation,
  };
  return quotationResult;
};

const savePaymentDetals = async (paymentDetails, tid) => {
  try {
    const customer = await customerModel.findOneAndUpdate(tid, {
      $set: paymentDetails,
    });

    if (customer) {
      const mailDetails = await sendMail(tid);
      return mailDetails;
    } else {
      return json(
        returnErrorJsonResponse(
          statusCode.bad,
          "fail",
          "Something went wrong, Please try again"
        )
      );
    }
  } catch (error) {
    return res
      .status(statusCode.bad)
      .json(
        returnErrorJsonResponse(
          statusCode.bad,
          "fail",
          "Something went wrong, Please try again",
          error
        )
      );
  }
};

const sendMail = async (tid) => {
  try {
    const customerData = await customerModel.find(tid);
    if (customerData) {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secure: true,
        port: 465,
        tls: {
          rejectUnauthorized: false,
        },
        auth: {
          user: "seekerofsecret@gmail.com",
          pass: "seekerofmagic",
        },
      });

      let mailOptions = {
        from: "seekerofsecret@gmail.com",
        to: customerData[0].policyHolderDetails.email,
        subject: "Mail regarding your Insurance",
        text: "",
        html:
          "Hello " +
          customerData[0].policyHolderDetails.NameOfPolicyHolder +
          " .Thank you for purchasing your " +
          customerData[0].policyDetails.planName +
          " .Your policy number is " +
          customerData[0].policyDetails.policyNumber +
          " .Hope to see you soon again. you can download your policy pdf here at " +
          process.env.CLIENTURL +
          "/generate/policy/" +
          customerData[0].policyHolderDetails.customerId +
          "/" +
          customerData[0].transactionId,
      };

      if (mailOptions) {
        const send = await transporter.sendMail(mailOptions);
        if (send.messageId) {
          return send.messageId;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  } catch (error) {
    return res
      .status(statusCode.bad)
      .json(
        returnErrorJsonResponse(
          statusCode.bad,
          "fail",
          "Something went wrong, Please try again123",
          error
        )
      );
  }
};

exports.fileUpload = async (req, res) => {
  try {
    
    const file = req.file;
    const upload =await fileUpload(file, 'xpcover', 'emailers')
    console.log(upload)
  } catch (error) {
    console.log( error);
  }
};
