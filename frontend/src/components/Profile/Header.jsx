import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../strore/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      const fetchuserDetails = async () => {
        try{
          const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user-details`,
             { withCredentials: true });
          setUserData(res.data.user);
        }catch(error){
            console.log(error);
        }
    };
        fetchuserDetails();
  }, []);

  const LogoutHandler = async()=>{
    try {  
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/logout` , {withCredentials : true});
        console.log(res);
        dispatch(authActions.logout());
        navigate('/');
    } catch (error) {
        
    }
  }

  return (
    <>
      {userData && (
        <div className="bg-green-900 rounded py-8 flex flex-col md:flex-row items-center justify-center gap-4 md:justify-between px-4 lg:px-12">
          <div className="flex flex-col items-center md:items-start ">
            <p className="text-zinc-300">Profile</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-zinc-100 font-bold text-center">
              {userData.username}
            </h1>
            <p className="text-zinc-300 mt-1">{userData.email}</p>
          </div>
          <div>
            <button className="bg-white px-4 py-2 rounded text-zinc-800 font-semibold hover:shadow-xl transition-all duration-300"
            onClick={LogoutHandler}>
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
