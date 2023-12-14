const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sinvoiceSchema = new Schema({

   
    date: {
        type: Date,
        required: true
    },
    invoiceNo: {
        type: String,
        required: true
    },
    supplier: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    purchaseOrderNo: {
        type: String,
        required: true
    },
   
})

const sinvoice = mongoose.model("sinvoice", sinvoiceSchema); 

module.exports = sinvoice;