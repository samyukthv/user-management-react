import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from  "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import "../pages/Register.css"
import {useDispatch,useSelector} from "react-redux"
import {setUserDetails} from '../redux/userSlice'
import axios, { Axios } from 'axios';


function Register() {
  const user = useSelector((state)=>state.user)

  const dispatch= useDispatch()

const navigate= useNavigate()
const [values,setValues]= useState({email:"",password:"",mobile:"",name:""});

const handlesubmit= async(e)=>{
    e.preventDefault()
    console.log("reached");

try {
    console.log(values);
    const {data} = await axios.post('http://localhost:8000/register',
    {
        ...values,
    },{
        withCredentials:true,
    });
    console.log(data);
 
    if(data){
        if(data.errors){
          toast.error(data.error);
        }else{
          dispatch(
            setUserDetails({
                name:data.user.name,
                id: data.user._id,
                email: data.user.email,
                mobile: data.user.mobile,
                image:data.user.image
          
            })
        )

             toast.success("Registration successful!");
           navigate('/')
            
        }
    }
} catch (error) {
console.log(error);
    
if (error.response && error.response.data.error === "Email already exists") {
  // Show error toast message
  toast.error("Email already exists");
}
if (error.response && error.response.data.error === "Please enter Email") {
  // Show error toast message
  toast.error("Please enter Email");
}

if (error.response && error.response.data.error === "Please enter Password") {
  // Show error toast message
  toast.error("Please enter Password");
}

}


}



  return (
    <div className='container' id='container'>
      <h2>Register  Account</h2>
      <form className='form' onSubmit={(e)=>handlesubmit(e)}>
      <div>
            <label htmlFor='name'>User Name</label>
            <input className='input' type="text"  name='name' placeholder='user name' onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />

        </div>
        <div>
            <label htmlFor='email'>Email</label>
            <input className='input' type="email"  name='email' placeholder='email' onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />

        </div>
        <div>
            <label htmlFor='email'>Mobile</label>
            <input className='input' type="number"  name='mobile'  placeholder='Mobile No.' onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />

        </div>
        <div>
            <label htmlFor='password'>password</label>
            <input className='input' id='input' type="password"  name='password' placeholder='password'onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />

        </div>
        <button className='button' id='button' type='submit'>submit</button>
        <span>
           Already have an account ? <Link to="/login">Login</Link> 
        </span>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Register
