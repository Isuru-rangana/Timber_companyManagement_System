const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supplierSchema = new Schema({

    supplierId: {
        type: String,
        required: true
    },
    supplierName: {
        type: String,
        required: true
    },
    
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    
   
})

const supplier = mongoose.model("supplier", supplierSchema); //supplier - DB table name

module.exports = supplier;