const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pOrderSchema = new Schema({
    
    date: {
        type: Date,
        required: true
    },
    purchaseOrderNo: {
        type: String,
        required: true
    },
    supplierName: {
        type: String,
        required: true
    },
    
    itemName: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    amount: {
        type:String,
        required: true
    },
   
})

const purchaseOrder = mongoose.model("purchaseOrder", pOrderSchema); //purchaseOrder - DB table name

module.exports = purchaseOrder;