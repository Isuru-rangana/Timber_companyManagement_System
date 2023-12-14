const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({

    vehicleNo: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    fuelConsumptionRate: {
        type: Number,
        required: true
    },
    driverID: {
        type: String,
        required: true
    },
    drivingLicenseNo: {
        type: String,
        required: true,
    },
   
})

const vehicle = mongoose.model("vehicle", vehicleSchema); //vehicle - DB table name

module.exports = vehicle;