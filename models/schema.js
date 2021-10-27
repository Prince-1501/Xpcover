const mongoose = require("mongoose");
const schema = mongoose.Schema;

const customerSchemaHacktoberFest = new schema({
  transactionId: {
    type: String,
  },
  transactionTypeHacktoberFest: {
    type: Number,
  },
  quotation: {
    type: Object,
    // 0:{
    //   quotationId:{type: String},
    //   quotationName:{type: String},
    //   quotationAmount:{
    //     amountActual:{type: Number},
    //     amountFormatted:{type: String}
    //   }
    // }
  },
  productId: {
    type: String,
  },
  productName: {
    type: String,
  },

  // 1 - Payment

  paymentHacktoberFest: {
    paymentId: {
      type: String,
    },
    paymentAmount: {
      type: Number,
    },
  },

  bankDetails: {
    bankName: {
      type: String,
    },
    iban: {
      type: String,
    },
  },

  // batch Number
  policyDetailsHacktoberFest: {
    policyNumber: {
      type: String,
    },
    receiptNumber: {
      type: String,
    },
    DateIssued: {
      type: Date,
    },
    policyProducerCode: {
      type: String,
    },
    policyCommencementDate: {
      type: Date,
    },
    policyCommencementTime: {
      type: String,
    },
    productName: {
      type: String,
    },
    planName: {
      type: String,
    },
    coverType: {
      type: String,
    },
    sumInsured: {
      type: String,
    },
    renewalDueDate: {
      type: String,
    },
    periodOfInsurance: {
      from: {
        type: Date,
      },
      to: {
        type: Date,
      },
    },
    policyPeriod: {
      type: String,
    },
    clientType: {
      type: String,
    },
  }
module.exports = mongoose.model("customerModel", customerSchema);
