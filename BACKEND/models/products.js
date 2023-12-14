const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    itemNo: { type: String, required: true },
    itemName: { type: String, required: true },
    category: { type: String, required: true },
    timberType: { type: String, required: true },
    size: { type: String, required: false },
    price: { type: Number, required: true },
    image: { type: String, required: true }
});

module.exports = mongoose.model("product", productSchema);