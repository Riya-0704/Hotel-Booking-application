const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
            unique:true,
        },
        email:{
            type:String,
            required: true,
            unique:true,
        },
        Password:{
            type:String,
            required: true,
        },
        img:{
            type:String,
           
        },
        isAdmin:{
            type:Boolean,
            default: false,
        } 
    },
    {timestamps:true}
);

module.exports = mongoose.model("User", UserSchema);
