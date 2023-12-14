const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderItemsSchema = new Schema({

    OrderNo: {
        type: Number,
        required: true
    },
    ItemNo: {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
   
   
})

const OrderItems = mongoose.model("OrderedItems", OrderItemsSchema); //orderitems - DB table name

module.exports = OrderItems;