const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deliverySchema = new Schema({

    date: {
        type: String,
        required: true
    },
    orderNo: {
        type: String,
        required: true
    },
    vehicleNo: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
   
})

const delivery = mongoose.model("Deliveries", deliverySchema); //vehicle - DB table name

module.exports = delivery;