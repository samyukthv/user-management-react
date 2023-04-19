import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies, Cookies } from "react-cookie";

import './Header.css'
function Header() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
 
  return (
    <div>
   
      <nav id="nav" className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#" style={{marginLeft:"20px"}}>
          Admin Home
        </a>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            
          <button className="btn btn-primary"  onClick={() => {
            navigate("/createUser");
          }}>Create User</button>
             
           
      

            <button
              id="logouts"
              onClick={() => {
                removeCookie("jwt");
                navigate("/admin");
              }}
              className="btn btn-primary"
              style={{ position: "fixed", right: "20px" }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
