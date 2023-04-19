const adminController=require("../Controllers/adminController")
const express= require('express')
const admin_router=express.Router()


admin_router.post('/adminLogin',adminController.adminLogin)
admin_router.get("/adminHome",adminController.adminHome)
admin_router.delete("/deleteUser/:id",adminController.deleteUser)
admin_router.get('/admin',adminController.admin)
admin_router.post("/editUser",adminController.editUser)
admin_router.post("/updateUser",adminController.updateUser)



module.exports= admin_router