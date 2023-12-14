const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const loginSchema = new Schema({

  
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },

   
})


const login = mongoose.model("login", loginSchema); //customer - DB table name

module.exports = login;