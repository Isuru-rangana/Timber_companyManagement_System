const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const SaleSchema = new Schema({

    OrderNo: {
        type: Number,
        required: true,
    },
    Date: {
        type: Date,
        required: true,
        default: Date.now
    },
    CustomerID: {
        type: Number,
       required: true,
    },
    Saleprice: {
        type: Number,
        required: true
    },

    Status: {
        type: String,
        required: true,
        default: 'Pending'
    },
})

  autoIncrement.initialize(mongoose.connection);
  SaleSchema.plugin(autoIncrement.plugin, {
      model: 'sales',
      field: 'OrderNo',
      startAt: 1,
      incrementBy: 1
    });

const Sales = mongoose.model("sales", SaleSchema); //sales - DB table name

module.exports = Sales;
