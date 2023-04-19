import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CreateUser() {
    const navigate= useNavigate()
const[create,setCreate]=useState({email:"",password:"",mobile:"",name:""})


const handleCreate =(e)=>{
    e.preventDefault()
axios.post("http://localhost:8000/register",{
    ...create
}).then((response)=>{
    console.log(response);
if(response.data.created){
  navigate('/adminHome')  
}
})
}


  return (
    <div>
       <div className='container'>
      <h2>Create User</h2>
      <form className='form' onSubmit={(e)=>handleCreate(e)} >
      <div>
            <label htmlFor='name'>User Name</label>
            <input className='input' type="text"  name='name'  placeholder='user name' onChange={(e)=>setCreate({...create,[e.target.name]:e.target.value})}/>

        </div>
        <div>
            <label htmlFor='email'>Email</label>
            <input className='input' type="email"   name='email'placeholder='email' onChange={(e)=>setCreate({...create,[e.target.name]:e.target.value})} />

        </div>
        <div>
            <label htmlFor='email'>Mobile</label>
            <input className='input' type="number"   name='mobile' placeholder='Mobile No.'  onChange={(e)=>setCreate({...create,[e.target.name]:e.target.value})} />
        
        </div>
        <div>
            <label htmlFor='password'>password</label>
            <input className='input' id='input' type="password"  name='password' placeholder='password'onChange={(e)=>setCreate({...create,[e.target.name]:e.target.value})} />

        </div>
        
        <button className='button' id='button' type='submit'>submit</button>
        
      </form>
      
    </div>
  
    </div>
  )
}

export default CreateUser
