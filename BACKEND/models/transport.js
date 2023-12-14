const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const transportSchema = new Schema({

    id:{
        type: Number,
        unique: true,
        default: 0
    },

    date: {
        type: Date,
        required: true
    },
    vehicleNo: {
        type: String,
        required: true
    },
    purchaseOrderNo: {
        type: String,
        required: true
    },
    noOfKms: {
        type: Number,
        required: true
    },
    fuelConsumption: {
        type: Number,
        required: true
    },
    timberVolume: {
        type: Number,
        required: true
    },

})
autoIncrement.initialize(mongoose.connection);
transportSchema.plugin(autoIncrement.plugin, {
    model: 'logstransportation',
    field: 'id',
    startAt: 1,
    incrementBy: 1
  });

const transportation = mongoose.model("logstransportation", transportSchema); //vehicle - DB table name

module.exports = transportation;