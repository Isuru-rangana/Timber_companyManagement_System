const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({

    CustomerID:{
        type: Number,
        unique: true,
        default: 0
    },

    CustomerName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    ContactNo: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
   
})

autoIncrement.initialize(mongoose.connection);
CustomerSchema.plugin(autoIncrement.plugin, {
    model: 'Customer',
    field: 'CustomerID',
    startAt: 1,
    incrementBy: 1
  });


const Customer = mongoose.model("Customer", CustomerSchema); //customer - DB table name

module.exports = Customer;