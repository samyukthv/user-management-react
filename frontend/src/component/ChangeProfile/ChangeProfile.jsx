import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./ChangeProfile.css";
import { useSelector } from "react-redux";
import axios from "axios";
import {useDispatch} from 'react-redux'
import {setUserDetails} from '../../redux/userSlice'



function ChangeProfile() {

  const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();
  const dispatch =useDispatch()
  const {name,mobile,email,id,image} = useSelector((state) => state.user);
  const [image1, setImage] = useState('');
  const handleImage =async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image1);
    formData.append("userId", id);
    
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        userId:id,
      },
      withCredentials:true,
    };
    try {
        console.log(id);
        const {data}= await axios.post("http://localhost:8000/updateImage",formData,config)
        console.log(data
          ,98989);
        dispatch(setUserDetails({image:data.data.image,id:data.data._id,mobile:data.data.mobile,name:data.data.name,email:data.data.email}))
      
    } catch (error) {
        
    }
  };

  return (
    <div id="main">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px",
        }}
      >
        <button
          onClick={() => {
            navigate("/");
          }}
          className="btn btn-primary"
        >
          Home
        </button>

        <button
          onClick={() => {
            removeCookie("jwt");
            navigate("/login");
          }}
          className="btn btn-danger"
        >
          Logout
        </button>
      </div>
      <div id="detailsMain">
        <img
          id="imgdis"
          className="rounded-circle img-fluid"
          src={image?  process.env.PUBLIC_URL+  `/images/${image}`:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAOVBMVEXk5ueutLersbTq6+ypr7Ln6enj5ebY29ywtrnKztDd4OG0uby7wMPQ09XLz9HBxsjV19nEyMu4vMAHbDFAAAAGgUlEQVR4nO2d23asIAyGFYgHREXf/2E3aufYsTpKEnDzXXT1cv6VAEmEJMsSiUQikUgkEolEIpFIJBKJRCI4AKSEGe5f4h2nrNC2HnpjxtGYfqhbXTi13L/LEwC6M5Vw5CKfcf84KtPpLH5zSrAmVz/K3hEq7y1I7t94AoDSrKl7qDRlrIYE6Cr1t7wFVXUxaoSsFhvmezKkqLPINAJ8oW/RGJcdpa2+0jdrzG00ew4UZtf6e0eZIg4zyvY7B322YxuDGaE/ZMCbGYO3IhTfr8AXK1Y6bI2yPKVv1mhDlii7Ex56Q3XhLkZZexDoJA6hSpSDF4HhSpT16TV4QwQp0ZOLLqg6PInQehToJLah7ahQehXoJJaBSSy8rcG7xIJb0wuy8i0wz5uQjCh77yZ0G2ofzm4D1vMiXFABxW8IFpwQ3LpuSIOkMDeB+Knvg+KBKrm1zQDCPnonBCNCh+WjDlEHsNkAmo/OErnlOYEDogmnLIPfiKgCAzAi+EsKVxRyGxGQBbIbEVp8hbyZIjTYAl2OwXomatSjYoE1sIEeX6DLohjdFAgEOomMbnq+hr8HRjdFjmfu8LmpJNGX5xWbwoJgJ51QmkkgwXG/IFomhdLQCOSrZqAm968wKfRf516Dq/6NV4F6R1gehZgFmjeFHct5QRKU/sBz5kuCzOnGyKOQTiBTVINfwHjAU8qgitkmeI4Livz+rpAlMtWEXsqjkCb9/VHIkgTThTRsCiltyBK22eSl8Su8vA2vf1pcP6bJLq9QEnppzpM90RWimG7xyZFOIc9DE6qvFhNMXy6oSt58RW+6oIbr+xphRZhHIMk1hYWK67sFWcGU7RMpVf7EVdTPyOI2wfYwgarqzfcuAf3a3gLnNVqakinbZ/yMyk25zooJEjflvetNkefz7aQTQHAdg/lZCX70zf2qBD/R57vy9QN2ksh8CTojuDbE/i4I+XIbvwmxVyL7KpzAeUC6wPNV7R3MK4oj+yqcwQtsQnmxjvYCMYjXhzNYKQbva5kXcOqKgjEvfMdz24+FsJp/IDRVCKmlwoT/6jBnZv8Z3woDOSie8HtxIaRd5obXHjzB9d+Z8SgxTIEeJYYq0En0sxZFsAIniT4EBt4bsjlpRtFwK9hCnmlf6pYg57PmncgzOb+KowltNh70VOeh4Vtw5lgnYRFCXW0vkH2/GlUfiwEXQH/X8VqMgZ8RH5D7NQpldAw7zC9k0ec7RArRF1Hqm4DMjn9vOkKMNq719wuZtf3KCA+hKmOzaM33BIBu+2aew3LDSW76Vkc1DmEDkFDo0rado7WlLuAyc3QS8QPTGCvnkYXW5YS101+ti3kKVNTDrabRXIW23dCbpsrFb/K8Gc3QWbcmoxPqbKNtbZpcKbEVg7t9VeWNGVqdxTHEy9mt7PpKbY15+nA4qtzUZRG0OUEWtm/E1+KeZYrKtDpIW87qVsePfSszOJUuaKmbzRX3lUpRDcEMKwNZDpUX470Rxtg5Z71B4N02EYJ57Jws6gbDes+oqufKjgHs5ug/TyKbliHHgqLO6R7niZzakFL3NOZ7oExJpxHKkVrfhKgsza4jnT56eYvGhmCAoCwbLn2zxhx55sXRyYY+NTaI6xGKc1/OPIFXPobjkxs9owaMEqvUZ7/uegRlZmkQDvpAjX5nlsqSMIDZideZpadGi6IhGl9mBH1utCgews9q9Dr1zzPKyx3Uo9cOSDg/ehZ0eFvMK+qcp0qM+9ueOTW01NvoVFTE8fY8Jy9wkXH4KhwEFKZtcehSeEwCj93YJOzk5YEDEuMSeEBibAK/fb9AOPXAH9/0XoCgI7V1dkvEmyuKzN5n0R5npBMj9rXQQHlLSMS+F32Urda9s+dVJs2gMTS2Oy7Rzf9BotqyIN1kFSS2dhvK7sdI/D2vnK7XIyJ/Tfsg6jCHzF9+SteQFJX1hijR76N31oxIOQoAlbWOIZfYZhZWEinMXkHEfI5PKQdUofOpdQ/ZQEoaPjy2jbJwsc4HI15oFU78HjpPOQiPhF+xW9R57yfeW/FTzjkg4q2NFuWkPyLesv3LBGwPXvcaima55LxUTy92GC68fMi4oJNOI3YvvZNOPO2mlzvuF9RjIcIVnfSlT/Yll+Fzqh9/GXiF+0UbygHbpNzv2VyoQPPKI7/g/iVY3EPTC3ys+Mx9xtDlcsMb9xzxoofF03HRqg8dD66Auh0XU+OKaxLIY/BE4r/nHymVebMSiM/LAAAAAElFTkSuQmCC"}
          alt=""
        />
        <div id="details">
          <h6 style={{ fontWeight: "lighter" }}>
            User Name :<span style={{ fontWeight: "700" }}> {name}</span>
          </h6>
          <h6 style={{ fontWeight: "lighter" }}>
            Email : <span style={{ fontWeight: "700" }}>{email}</span>
          </h6>
          <h6 style={{ fontWeight: "lighter" }}>
            Mobile No :{" "}
            <span style={{ fontWeight: "700" }}>{mobile}</span>
          </h6>
        </div>
      </div>
      <div id="formdiv">
        <form  onSubmit={handleImage}>
          {!image1 ? (
            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              id="imgin"
              type="file"
            />
          ) : (
            <button
              type="submit"
             
              className="btn btn-success"
              style={{ marginLeft: "100px" }}
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ChangeProfile;
