import axios from 'axios';

import React, { useState } from 'react'
import {toast,ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { useNavigate} from 'react-router-dom';



function EditUser(props) {

const navigate= useNavigate()
console.log(props);
const edit = props.edit
const {name,mobile,email,id}=edit
console.log(id);
const[state,setState]=useState({name:name,mobile:mobile,email:email,id:id})



const handleUpdate =(e)=>{
    e.preventDefault()
    axios.post("http://localhost:8000/admin/updateUser",{
        ...state
    }).then((result)=>{
        console.log("reee",result);
        if(result.data.success){
            console.log('reached to home');
            props.email=''
            navigate("/adminHome")
        }
        else{
            console.log(result.data.message);
               toast.error(result.data.message)
        }
 
    })
}



  return (
        <div className='container'>
      <h2>Edit User</h2>
      <form className='form' onSubmit={(e)=>handleUpdate(e)} >
      <div>
            <label htmlFor='name'>User Name</label>
            <input className='input' type="text"  name='name' value={state.name} onChange={(e)=>{setState({name:e.target.value,email:state.email,mobile:state.mobile,id:state.id})}}  placeholder='user name' />

        </div>
        <div>
            <label htmlFor='email'>Email</label>
            <input className='input' type="email" value={state.email}  name='email'placeholder='email' onChange={(e)=>{setState({email:e.target.value,mobile:state.mobile,name:state.name,id:state.id})}} />

        </div>
        <div>
            <label htmlFor='email'>Mobile</label>
            <input className='input' type="number" value={state.mobile}  name='mobile' placeholder='Mobile No.' onChange={(e)=>{setState({mobile:e.target.value,email:state.email,name:state.name,id:state.id})}} />
        
        </div>
        
        <button className='button' id='button' type='submit'>submit</button>
        
      </form>
      <ToastContainer/>
    </div>
  
  )
}

export default EditUser
