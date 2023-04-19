import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { Cookies, useCookies } from 'react-cookie';
import './Table.css'
import EditUser from '../editUser/EditUser';


function Table() {

const navigate= useNavigate()

 const [user,setUser]=useState([])
 const [edit,setEdit]=useState({name:"",mobile:"",email:""})
 const [search,setSearch]=useState("")

useEffect(()=>{
const findUser =async()=>{
  console.log("hello");
  const data= await axios.get("http://localhost:8000/admin/adminHome")
  console.log(data.data.user);
  setUser(data.data.user)
}
 findUser()
  

 console.log(typeof  user);
 console.log(  user);

},[])


function deleteUser(id) {
   console.log("delete function");
  axios.delete(`http://localhost:8000/admin/deleteUser/${id}`, {
    withCredentials: true,
  }).then((response) => {
    console.log("front");
    if (response.data.status) {
      console.log("delete response");
      toast.success(response.data.message);
      getUser()
      
    } else {
      toast.error(response.data.message, {
        position: "top-center",
      });
    }
  });
}

const getUser = ()=>{


  console.log('lkjh');
  axios.get("http://localhost:8000/admin/admin").then((result)=>{
    console.log("getuser");
    setUser(result.data.data)
  })
}


const editUser=(id)=>{

axios.post("http://localhost:8000/admin/editUser",{id}).then((data)=>{
  console.log(data,123456);
  setEdit({name:data.data.user.name,
  email:data.data.user.email,
  mobile:data.data.user.mobile,
  id:data.data.user._id

})
})  

}

  return (
    <div>


      {
 edit.email ?   <EditUser edit={edit}/> : 





<>

 
<input style={{marginTop:"50px",height:'40px'}}  onChange={(e)=>{setSearch(e.target.value)}} type="text" id="search" placeholder="search..."/>
     
     
     
      <table id='tableuser' className="table">
   <thead>
    <tr>
      <th scope="col">S.No</th>
      <th scope="col">User Name</th>
      <th scope="col">Email</th>
      <th scope="col">Mobile Number</th>
     
      <th scope="col">Edit User</th>
      <th scope="col">Delete User</th>
    </tr>
  </thead>
  <tbody>
    {
     user.filter((user) => 
     user.email.toLowerCase().includes(search))
    .map((user,index)=>{
 return(

    <tr>
      <th scope="row">{index+1}</th>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.mobile}</td>
      
      <td><button onClick={()=>{editUser(user._id)}} className='btn btn-primary'>Edit</button></td>
      <td><button onClick={()=>{deleteUser(user._id)}} className='btn btn-danger'>Delete</button></td>
    </tr>
 )
    
    })}
  </tbody>
</table>
</>
      }
<ToastContainer  />
    </div>
  )
}

export default Table
