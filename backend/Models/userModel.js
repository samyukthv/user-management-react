const mongoose = require("mongoose")

const  userSchema = new mongoose.Schema({
email:{
    type:String,
    required:[true,"Email is Required"]
},
password:{
    type:String,
    required:[true,"Password is Required"]
},
mobile:{
    type:Number,
    required:true
},
name:{
    type:String,
    required:true
},
image:{
    type:String,

}

});


const user= mongoose.model('User',userSchema)
module.exports=user

