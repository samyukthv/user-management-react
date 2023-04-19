import React, { useEffect } from "react";
import "../pages/Home.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import {useSelector} from "react-redux"

function Home() {

  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const user = useSelector((state)=>state.user)
  console.log(user,123456);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:8000/",
          {},
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        }
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logout = () => {
    removeCookie("jwt");

    navigate("/login");
  };

  return (

     
    <div id="homeMain" >
        <div id="nav" className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link active" onClick={()=>{navigate('/')}}>Home <span className="sr-only">(current)</span></a>
                     
                  <a className="nav-item nav-link active"  onClick={()=>{navigate('/changeProfile')}}>Edit Profile</a>    
             
              
            <button className="btn btn-danger" style={{position:'fixed',right:'20px'}} onClick={logout}>Logout</button>
            </div>
          </div>
      
       
        </div>
    <h4 id="wel">Welcome Home  {user?.name}</h4>
       

</div>


  );
}

export default Home;
