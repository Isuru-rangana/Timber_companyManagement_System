const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({

    employeeNo: {
        type: String,
        required: true
    },
    NIC:{
        type: String,
        required: true
    },
    employeeName: {
        type: String,
        required: true
    },
    employeeAddress: {
        type: String,
        required: true
    },
    employeeContactNo: {
        type: String,
        required: true
    },
    employeeJobTitle: {
        type: String,
        required: true
    },

})
const employees = mongoose.model("employees", employeeSchema);

module.exports = employees;