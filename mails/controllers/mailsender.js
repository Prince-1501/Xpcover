const mailModel = require("../models/mailsender");
const aws = require("aws-sdk");
require("dotenv").config();
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "ap-south-1",
});
const fs = require("fs");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dbs = require("C:\\Users\\Dell 15R\\Desktop\\xpcbe\\config\\dbs.js");
var db = "";

exports.sendMail = async (req, res) => {
  try {
    //req.headers['country']='india';

    const country = req.headers.country; /////// storing the country name passed in header in a variable 'country'
    // console.log( 'check',country);
    db = dbs[country]; /////  storing the key value pair of 'uri:Mongo db connection url' as per the country from 'dbs.js' in variable 'db'

    const DBURL = db.uri || "mongodb://localhost:27017/xpcover"; //// storing the value of mongodb connection string in DBURL

    //console.log("Line 2", DBURL);

    mongoose //////////////// updating the connection of mongo db as per the specifed country
      .connect(DBURL, {
        //////////////// which is passed in the request
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
      });

    const query = { email_sent: false };
    await mailModel.find(query).exec(function (err, result) {
      if (err) throw err;
      var userDetails = result;
      var mailList = [];

      for (var i = 0; i < userDetails.length; i++) {
        mailList.push({
          email: userDetails[i].email,
          customerName: userDetails[i].customer_name,
          policyNo: userDetails[i].policy_no,
          insuranceCompany: userDetails[i].insurance_company,
          customerId: userDetails[i]._id,
        });
      }

      ////////////////Sending Email Part
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secure: true,
        port: 465,
        tls: {
          rejectUnauthorized: false,
        },
        auth: {
          user: "seekerofsecret@gmail.com",
          pass: "leftalone2022",
        },
      });

      for (var m = 0; m < mailList.length; m++) {
        let mailOptions = {
          from: "seekerofsecret@gmail.com",
          to: mailList[m].email,
          subject: "Mail regarding your Insurance",
          text: "",
          html:
            "Hi " +
            mailList[m].customerName +
            " Thank you for purchasing your insurance from " +
            mailList[m].insuranceCompany +
            " you insurance number is " +
            mailList[m].policyNo +
            " .Hope to see you soon again. you can download your policy pdf here at http://localhost:3000/generate/policy/" +
            mailList[m].customerId +
            "/" +
            mailList[m].policyNo,
        };

        transporter.sendMail(mailOptions);
      }

      console.log("Mail Sent!!!");
    });

    const res = await mailModel.updateMany(
      { email_sent: false },
      { email_sent: true }
    );
  } catch (err) {
    return res.status(400).json({
      statusCode: 400,
      status: "fail",
      message: "Something went wrong, please try again",
      error: error,
    });
  }
};

exports.createPDF = async (req, res) => {
  var clientList = [];
  const customerid = req.params.customerId;
  var template;

  try {
    //console.log("inside sendmail",req.headers);    ///// logging the header passed in request in console

    const country = req.headers.country; /////// storing the country name passed in header in a variable
    //console.log( 'check',country);
    db = dbs[country]; /////  storing the key value pair of 'uri:Mongo db connection url' as per the country from 'dbs.js' in variable 'db'

    const DBURL = db.uri || "mongodb://localhost:27017/xpcover"; //// storing the value of mongodb connection string in DBURL

    //console.log("Line 2", DBURL);
    mongoose //////////////// updating the connection of mongo db as per the specifed country
      .connect(DBURL, {
        //////////////// which is passed in the request
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
      });

    await mailModel.findById(customerid).exec(function (err, result) {
      if (err) throw err;
      var clientDetails = result;

      clientList.push({
        email: clientDetails.email,
        customerName: clientDetails.customer_name,
        policyNo: clientDetails.policy_no,
        insuranceCompany: clientDetails.insurance_company,
        customerId: clientDetails._id,
        templateId: clientDetails.template_id,
      });

      const getParams = {
        Bucket: "templatexpcover",
        Key:
          clientList[0].insuranceCompany +
          "/" +
          clientList[0].templateId +
          ".html",
      };

      s3.getObject(getParams, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          var Cname = clientList[0].customerName;
          var Company = clientList[0].insuranceCompany;
          var Pno = clientList[0].policyNo;
          template = data.Body.toString();
          template = template.replace("<%= CustName %>", Cname);
          template = template.replace("<%= compName %>", Company);
          template = template.replace("<%= polNo %>", Pno);
          template = template.replace("<%= InsComp %>", "Indian Insurance");
          var script = fs.readFileSync(__dirname + "\\script.txt", "utf8");
          var temp1 = template.split("</html>");
          template = temp1[0].concat(script);
          template = template.concat("</html>");
          //console.log(template);

          res.send(template);
        }
      });
    });
  } catch (err) {
    return res.status(400).json({
      statusCode: 400,
      status: "fail",
      message: "Something went wrong, please try again",
      error: error,
    });
  }
};
