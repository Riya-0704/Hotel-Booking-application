const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
    {
        username: {
            type:String,
            required:true,
            unique:true,
        },
        email: {
            type:String,
            required:true,
            unique:true,
        },
        img: {
            type:String,
            required:true,
           
        },
        text:{
            type:String,
            required:true,
        },
        
    })

    module.exports = mongoose.model("Review", ReviewSchema);