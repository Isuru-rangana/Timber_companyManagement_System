const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const furnitureSchema = new Schema({

    Item_Code: {
        type: String,
        required: true
    },
    Item_Name: {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
})

const furniture = mongoose.model("furnitureStock", furnitureSchema ); //furniture - DB table name

module.exports = furniture;