const mongoose= require("mongoose")


const adminSchema= new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is Required"]
    },
    password:{
        type:String,
        required:[true,"Password is Required"]
    }  
})


const admin = mongoose.model('Admin',adminSchema)
 module.exports=admin