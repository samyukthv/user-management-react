
const userController=require('../Controllers/userController')
const express = require('express');
const { checkUser } = require('../Middlewares/auth');
const router_user=express.Router()
const upload= require('../Middlewares/multer')



router_user.post('/',checkUser);
router_user.post('/register',userController.register)
router_user.post('/login',userController.login)
router_user.post('/updateImage', upload.single('image'), userController.updateImage)



module.exports=router_user;
