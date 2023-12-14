const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rawMaterialsSchema = new Schema({

    Materials_Id: {
        type: String,
        required: true
    },
    Materials_Name: {
        type: String,
        required: true
    },
    Quantity: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },

})

const rawmaterials = mongoose.model("rawmaterials", rawMaterialsSchema); //rawMaterials - DB table name

module.exports = rawmaterials;