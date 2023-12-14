const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const timberSchema = new Schema({

    Log_No: {
        type: String,
        required: true
    },
    Timber_Type: {
        type: String,
        required: true
    },
    Length: {
        type: String,
        required: true
    },
    Girth: {
        type: String,
        required: true
    },
    Volume: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        required: true
    },


})

const timberlogs = mongoose.model("timberlogs", timberSchema); //timberlogs - DB table name

module.exports = timberlogs;