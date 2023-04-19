import './App.css';

import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import {Button} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"

import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import EditProfile from './pages/EditProfile';
import Admin from './pages/Admin';
import AdminHome from './pages/AdminHome';
import EditUser from './component/editUser/EditUser';
import CreateUser from './component/CreateUser';
import ChangeProfile from './component/ChangeProfile/ChangeProfile';



function App() {
  
  return (
   <BrowserRouter>
   <Routes>
    <Route exact path="/register" element={<Register/>} />
    <Route exact path="/login" element={<Login/>} />
    <Route exact path="/" element={<Home/>} />
    <Route exact path="/editProfile" element={<EditProfile/>} />
    <Route exact path="/admin" element={<Admin/>} />
    <Route exact path="/adminHome" element={<AdminHome/>} />
    <Route exact path="/editUser" element={<EditUser/>} />
    <Route exact path="/createUser" element={<CreateUser/>} />
    <Route exact path="/changeProfile" element={<ChangeProfile/>} />

   
   </Routes>
   </BrowserRouter>
  );
}

export default App;
