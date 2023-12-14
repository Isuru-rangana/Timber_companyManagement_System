const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leaveRequestSchema = new Schema({

    employeeNo: {
        type: String,
        required: true
    },
    employeeName: {
        type: String,
        required: true
    },
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },

})
const leaveRequests  = mongoose.model("leaveRequests", leaveRequestSchema );

module.exports = leaveRequests ;