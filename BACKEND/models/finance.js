const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const financeSchema = new Schema ({

    transaction_id: {
        type: String,
        required: true
    },

    transaction: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    }
    
})

const Finance = mongoose.model("Finance", financeSchema); //finance - DB table name

module.exports = Finance;