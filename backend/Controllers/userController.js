const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path= require('path')
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "samyukth jwt token", {
    expiresIn: maxAge,
  });
};



const register = async (req, res, next) => {
  try {
    const userData = req.body;
console.log(req.body);
    if (userData.email === "") {
      return res.status(400).json({ error: "Please enter Email" });
    }

    if (userData.password === "") {
      return res.status(400).json({ error: "Please enter Password" });
    }

    const userFind = await User.findOne({ email: userData.email });
    if (userFind) {
      return res.status(400).json({ error: "Email already exists" });
    }
    userData.password = await bcrypt.hash(userData.password, 10);
    const newUser = new User(userData);
    newUser.save();
    console.log(newUser);

    const token = createToken(newUser.id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    console.log("user created");
    res.status(201).json({ newUser: newUser, created: true });
    console.log("after response");
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res, next) => {
  try {
    const userData = req.body;
    console.log("hello");
    console.log(req.body);

    let user = await User.findOne({ email: userData.email });

    if (user) {
      bcrypt.compare(userData.password, user.password).then((data) => {
        if (data) {
          const token = createToken(user._id);

          res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
          });
          console.log("success: true");
          res.json({ success: true, token: token ,user});
        } else {
          console.log("message: Invalid  password");
          res.json({ success: false, message: "Invalid  password" });
        }
      });
    } else {
      console.log("Invalid Email");
      res.json({ success: false, message: "Invalid Email " });
    }
  } catch (error) {}
};



const updateImage = async(req,res)=>{
  try {
    const userId=req.body.userId;
 const imageName=req.file.filename;
console.log(req.body.userId);
console.log(req.file.filename);
 const userFind = await User.findOne({_id:userId})
 if(userFind.image!==undefined){
  fs.unlink(path.join(__dirname,"../../frontend/public/images/",userFind.image),(error)=>{
    if(error){
      console.log(error);
    }else{
      console.log("image deleted");
    }
  })
 }
 
 const setImage = await User.updateOne({_id:userId},{$set:{image:imageName}}).then(async ()=>{
  const data = await User.findOne({_id:userId})

  res.status(201).json({updated:true,data:data})
})


  } catch (error) {
    console.log(error.message);
  }

}

module.exports = {
  register,
  login,
  updateImage
  
};
