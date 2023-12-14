const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CounterSchema = new Schema({

    model:{
        type: String,
        unique: true,
    },

    field: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true,
    },
   
})


const Counter = mongoose.model("identitycounters", CounterSchema); //customer - DB table name

module.exports = Counter;