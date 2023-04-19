const multer = require("multer")
const path = require('path')


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../../frontend/public/images/"))

    },
    filename:function(req,file,cb){
        const unique = Date.now() + ".jpg"
        cb(null,file.fieldname + "-" + unique)

    }
})

module.exports =upload= multer({storage:storage})