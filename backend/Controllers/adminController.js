const Admin = require('../Models/adminModel')
const jwt = require("jsonwebtoken");
const User= require('../Models/userModel')

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, "samyukth jwt token", {
      expiresIn: maxAge,
    });
  };



  const adminLogin = async (req, res, next) => {
    try {
      const adminData = req.body;
      console.log("hello");
      console.log(req.body);
  
      let admin = await Admin.findOne({ email: adminData.email });
  
      console.log("hello   2")
      if (admin) {
        console.log("hello   3");
        if(adminData.password==admin.password){
           console.log("hello   4");
            const token = createToken(admin._id);

            res.cookie("jwt", token, {
              withCredentials: true,
              httpOnly: false,
              maxAge: maxAge * 1000,
            });
            console.log("hello   5");
            res.json({ success: true, token: token });
        console.log("checked");
        
        }else{
            res.json({ success: false, message: "Invalid Password " });
 
        }
      } else {
        res.json({ success: false, message: "Invalid Email " });
      }
    } catch (error) {

    }
  };


const adminHome =async(req,res)=>{
  try {
    
    const userData= await User.find({})
    res.json({user:userData})
  } catch (error) {
    
  }
}


const deleteUser= async(req,res)=>{
  try {
    const id =req.params.id
    console.log("reached delete");
    await User.deleteOne({_id:id}).then((result)=>{
      res.json({message:" User deleted successfully" ,status:true})
    })
  } catch (error) {
    console.log(error.message);
  }
}


const  admin= async(req,res)=>{
  try {

    console.log("hy");
    
    const data = await User.find()
   res.status(200).json({data:data})
  } catch (error) {
    console.log(error.message);
  }
}


const editUser= async(req,res)=>{
  try {
    const  id = req.body.id
    const user = await User.findOne({_id:id})
    console.log(user);
    res.json({user:user})
    console.log(id);
  } catch (error) {
    
  }
}

const updateUser= async(req,res)=>{
  try {
    const values = req.body
    console.log(values);
    if(values.email==""){
      res.json({success:false,message:"email is requied"})
    }else if(values.name==""){
      res.json({success:false,message:"name is requied"})
    }else if(values.mobile==""){
      res.json({success:false,message:"mobile is requied"})
    }else{
      console.log("helloo");
      console.log("update");
      console.log(values);
      const update = await User.updateOne({_id:values.id},{$set:{email:values.email,name:values.name,mobile:values.mobile}})
      res.json({success:true})
    }
  } catch (error) {
    
  }
}

  module.exports={
    
    
    adminLogin,
    adminHome,
    deleteUser,
    admin,
    editUser,
    updateUser
    
  }