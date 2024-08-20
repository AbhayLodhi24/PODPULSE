import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);
  const [mobileNav, setMobileNav] = useState(false);

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Categories",
      path: "/categories",
    },
    {
      name: "All Podcasts",
      path: "/all-podcasts",
    },
    // {
    //     name: "Profile",
    //     path: "/profile",
    // },
  ];
  return (
    <nav className="px-4 md:px-8 lg:px-12 py-2 relative">
      <div className="flex items-center justify-between">
        <div className="logo brand-name w-2/6 flex items-center gap-4 ">
          <img
            src="https://cdn-icons-png.flaticon.com/128/9043/9043096.png"
            alt="logoImage"
            className="h-12"
          />
          <Link to="/" className="text-2xl font-bold">
            PodPulse
          </Link>
        </div>
        <div className="hidden w-2/6 lg:flex items-center justify-center">
          {navLinks.map((items, i) => (
            <Link
              key={i}
              to={items.path}
              className="ms-4 hover:font-semibold transition-all duration-300"
            >
              {items.name}
            </Link>
          ))}
        </div>
        <div className="hidden w-2/6 lg:flex items-center justify-end">
          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="px-6 py-3 border border-black rounded-full"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="ms-4 px-6 py-3 bg-black text-white rounded-full"
              >
                SignUp
              </Link>
            </>
          )}
          {isLoggedIn && (
            <Link
              to="/profile"
              className="px-6 py-3 border border-black rounded-full"
            >
              Profile
            </Link>
          )}
        </div>
        <div className="w-4/6 flex items-center justify-end lg:hidden z-[100]">
          <button
            className={`text-4xl ${
              mobileNav ? "rotate-360" : "rotate-180"
            } transition-all duration-300 `}
            onClick={() => setMobileNav(!mobileNav)}
          >
            {mobileNav ? <RxCross2 /> : <IoReorderThreeOutline />}
          </button>
        </div>
      </div>
      {/* Mobile Nav */}
      <div
        className={`fixed w-full top-0 left-0 h-screen bg-blue-200 ${
          mobileNav ? "translate-y-[0%]" : "translate-y-[-100%]"
        } transition-transform duration-500 ease-in-out`}
      >
        <div className="h-full flex flex-col items-center justify-center ">
          {navLinks.map((items, i) => (
            <Link
              key={i}
              to={items.path}
              className="mb-12 text-3xl hover:font-semibold transition-all duration-300"
            >
              {items.name}
            </Link>
          ))}
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="mb-12 text-3xl hover:font-semibold transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="mb-12 text-3xl hover:font-semibold transition-all duration-300"
              >
                Signup
              </Link>
            </>
          ) : (
            <Link
              to="/profile"
              className="mb-12 text-3xl hover:font-semibold transition-all duration-300"
            >
              Profile
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
