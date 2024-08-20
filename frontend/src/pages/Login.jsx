import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../strore/auth";
import ErrorPage from "./ErrorPage";

const Login = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/sign-in`,
        input,
        { withCredentials: true }
      );

      dispatch(authActions.login());
      // console.log(res.data);
      navigate("/profile");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
    {
        isLoggedIn ? <ErrorPage/> : 
    <div className="h-screen bg-green-100 flex items-center justify-center">
      <ToastContainer position="top-center" draggable />
      <div className="w-4/6  md:3/6 lg:w-2/6 flex flex-col items-center justify-center">
        <Link to="/" className="text-2xl font-bold">
          PODPULSE
        </Link>
        <div className="mt-6 w-full">
          <div className="w-full flex flex-col mt-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              className="mt-2 px-2 py-2 rounded outline-none border border-black"
              placeholder="Email"
              name="email"
              value={input.email}
              onChange={change}
              required
            />
          </div>
          <div className="w-full flex flex-col mt-2">
            <label htmlFor="">Password</label>
            <input
              type="password"
              className="mt-2 px-2 py-2 rounded outline-none border border-black"
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={change}
              required
            />
          </div>
          <div className="w-full flex flex-col mt-4">
            <button
              className="bg-green-900 font-semibold text-xl text-white rounded py-2"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
          <div className="w-full flex flex-col mt-4">
            <p className="text-center ">
              Don't have an Account?{" "}
              <Link to="/signup" className="font-bold hover:text-blue-800">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    }
    </>
  );
};

export default Login;
