import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from  "react-toastify"
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import {setUserDetails} from '../redux/userSlice'


function Login() {
 const user = useSelector((state)=>state.user)
  const navigate= useNavigate()
  const dispatch = useDispatch()



  const [values,setValues]= useState({email:"",password:""});
  


  const handlesubmit= async(e)=>{
      e.preventDefault()
      console.log("reached");
  


  try {
    console.log("entered");
      console.log(values);
      const {data} = await axios.post('http://localhost:8000/login',
      {
          ...values,
      },{
          withCredentials:true,
      });
      console.log(data,"frontend data");
   
      if (data.success) {
        
        console.log("login frontend");
        dispatch(
          
          setUserDetails({
              name:data.user.name,
              id: data.user._id,
              email: data.user.email,
              mobile: data.user.mobile,
              image:data.user.image
        
          })
      )
        navigate("/");
      } else {
        toast.error(data.message);
      }
  } catch (error) {
  console.log(error);
      

  
  }
  
  
  }
  
  


  return (
    <div className='container'>
      <h2>Login  Account</h2>
      <form className='form' onSubmit={(e)=>handlesubmit(e)}>
        <div className='form div'>
            <label htmlFor='email'>Email</label>
            <input className='input' type="email"  name='email' placeholder='email' onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />

        </div>
        <div>
            <label htmlFor='password'>password</label>
            <input className='input' type="password"  name='password' placeholder='password'  onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />

        </div>
        <button className='button' type='submit'>submit</button>
        <span>
           Do not have an account ? <Link to="/register">register</Link> 
        </span>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Login