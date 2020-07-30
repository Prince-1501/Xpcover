const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const compression = require("compression");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

require("dotenv").config();
const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 7, // 7 requests,
});
app.use(limiter);

// Importing Routers
const customerRouter = require("./routes/customer");
//const mailsenderRouter = require('./mails/routes/mailsender');

// Importing Routers
app.use("/api", customerRouter);
//app.use("/generate", mailsenderRouter);

// Api for connection between Frontend And backend
const productRouter = require("./routes/api/product");
const aliasRouter = require("./routes/api/fieldMapping");
const companyRouter = require("./routes/api/company");
const partnerRouter = require("./routes/api/partner");
const testRouter = require("./routes/api/test");
const regionRouter = require("./routes/api/region");

app.use("/", productRouter);
app.use("/", aliasRouter);
app.use("/", companyRouter);
app.use("/", partnerRouter);
app.use("/", testRouter);
app.use("/", regionRouter);


// Importing MongoDB
const mongoDB = require("./database/mongo");

const PORT = process.env.PORT || 3000;
mongoDB
  .mongoConnection()
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Application is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
