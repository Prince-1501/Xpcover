const mongoose = require('mongoose');
const schema = mongoose.Schema;

const mailSchema = new schema({
    customer_name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
    },

    policy_no: {
        type: String,
    },

    insurance_company: {
        type: String,
    },

    template_id: {
        type: String,
    },

    email_sent: {
        type: Boolean,
        default: false,
    },


});

const mailModel = mongoose.model("mail", mailSchema);

module.exports = mailModel;