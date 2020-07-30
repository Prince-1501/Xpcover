const mongoose = require("mongoose");
const schema = mongoose.Schema;

const masterCustomerSchema = new schema({

  transactionId:{
    type: String
  },
  
  transactionType:{
    type: Number
  },

  quotation:{
    0:{
      quotationId:{type: String},
      quotationName:{type: String},
      quotationAmount:{
        amountActual:{type: Number},
        amountFormatted:{type: String}
      }
    }
  },
  
  productId:{
    type: String
  },

  productName:{
    type: String
  },

  payment:{
    paymentId:{
      type: String
    },
    paymentAmount: {
      type: Number
    },
  },

// batch Number
  policyDetails: {
    policyNumber: {
      type: String
    },
    receiptNumber:{
      type: String
    },
    DateIssued:{
      type: Date
    },
    policyProducerCode:{
      type: String
    },
    policyCommencementDate:{
      type: Date
    },
    policyCommencementTime:{
      type: String
    },
    productName:{
      type: String
    },
    planName:{
      type: String
    },
    coverType:{
      type: String
    },
    sumInsured:{
      type: String
    },
    renewalDueDate:{
      type: String
    },
    periodOfInsurance:{
      from:{
        type: Date
      },
      to:{
        type: Date
      }
    },
    policyPeriod:{
      type: String
    },
    clientType:{
      type: String
    }
  },

});

module.exports = mongoose.model("master_customer", masterCustomerSchema);
