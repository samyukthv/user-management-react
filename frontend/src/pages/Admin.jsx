import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from  "react-toastify"
import axios from 'axios'

import './Admin.css'


function Admin() {
    const navigate= useNavigate()
    const [values,setValues]=useState({email:"",password:""})


    const handlesubmit = async(e)=>{
        e.preventDefault()

       try {
        console.log(values);
        const {data} = await axios.post('http://localhost:8000/admin/adminLogin',
        {
            ...values,
        },{
            withCredentials:true,
        });
        console.log(data);
     
        if (data.success) {
          toast.success("Login successful!");
          navigate("/adminHome");
        } else {
          toast.error(data.message);
        }
    } catch (error) {
    console.log(error);
        
  
    
    }
    }

  return (

    <div className='container'>
    <h2>Admin Login</h2>
    <form  className='form' onSubmit={(e)=>handlesubmit(e)}>
      <div className='form div'>
          <label htmlFor='email'>Email</label>
          <input className='input'  type="email"  name='email' placeholder='email' onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}  />
      </div>
      <div>
          <label htmlFor='password'>password</label>
          <input className='input' type="password"  name='password' placeholder='password' onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}  />

      </div>
      <button className='button' type='submit'>submit</button>
      
    </form>
    <ToastContainer/>
   
  </div>
  )
}

export default Admin
