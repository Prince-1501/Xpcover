const mongoose = require("mongoose");
const schema = mongoose.Schema;

const customerSchema = new schema({

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
  addons:{
    0:{
      quotationId:{type: String},
      addonsId:{type: String},
      addonsName:{type: String},
      addonsAmount:{
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

  bankDetails:{
    bankName:{
      type: String
    },
    iban:{
      type: String
    }
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

//// insurance company
  intermediaryDetails:{
    intermediaryCode:{
      type: String
    },
    intermediaryName:{
      type: String
    },
    contact:{
      type: [Number]
    },
    intermediaryAddress:{
      type: String
    },
    intermediaryFax:{
      type: String
    }
  },


  policyHolderDetails:{
    NameOfPolicyHolder:{
      type: String
    },
    policyHolderDateOfBirth:{
      type: Date
    },
    country:{
      type: String
    },
    occupation:{
      type: String
    },
    mobileNumber:{
      type: Number
    },
    email:{
      type: String
    },
    gender:{
      type: String
    },
    uniqueCountryId:{
      type: String
    },
    uniqueCountryIdExpireDate:{
      type: Date
    },
    customerId:{
      type: String
    },
    customerGstinNumber:{
      type: String
    },
    address:{
      addressLine1: {type: String},
      country: {type: String},
      countryId: {type: Number},
      state: {type: String},
      stateId: {type: String},
      city: {type: String},
      pinCode: {type: String},
      ipAddress: {type: String},
      longitude: {type: String},
      latitude: {type: String}
    }
  },


  nomineeDetails:{
    nomineeName:{
      type: String
    },
    nomineeAddress:{
      address:{
        addressLine1: {type: String},
        country: {type: String},
        countryId: {type: Number},
        state: {type: String},
        stateId: {type: String},
        city: {type: String},
        pinCode: {type: String},
        ipAddress: {type: String},
        longitude: {type: String},
        latitude: {type: String}
      }
    },
    relationship:{
      type: String
    }
  },

  premium_calculation:{
    type: Object
  },

  premiumAndGstDetails:{
    totalGrossPremium:{
      type: Number
    },
    sgst:{
      rateOfTax:{
        type: Number
      },
      amount:{
        type: Number
      }
    },
    cgst:{
      rateOfTax:{
        type: Number
      },
      amount:{
        type: Number
      }
    },
    igst:{
      rateOfTax:{
        type: Number
      },
      amount:{
        type: Number
      }
    },
    vat:{
      rateOfTax:{
        type: Number
      },
      amount:{
        type: Number
      }
    },
    netPremiumAmount:{
      type: Number
    }

  }
});

module.exports = mongoose.model("customer", customerSchema);
