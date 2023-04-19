const express = require('express')
const cors= require("cors")
const mongoose= require("mongoose")
const userRoutes =require('./Routes/userRoutes')
const adminRouter=require('./Routes/adminRoutes')
const cookieParser=require('cookie-parser')
const bodyParser = require('body-parser');



const app= express()

app.use(cors({
    origin:["http://localhost:3000"],
    method:["GET","POST","DELETE"],
    credentials:true,
}));




app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',userRoutes)
app.use('/admin',adminRouter)

const port=8000;




app.listen(port,()=>{console.log(`server is running on port ${port}`)});

mongoose.connect("mongodb://127.0.0.1:27017/jwt",{
    useNewUrlParser:true,
    useUnifiedTopology:true,

}).then(()=>{
    console.log("database connected successfully");
}).catch(error=>{
    console.log(error.message);
})
