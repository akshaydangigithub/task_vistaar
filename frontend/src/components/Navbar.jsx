import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");
  return (
    <nav className="flex bg-gray-200 items-center absolute w-full left-0 top-0 justify-between py-4 px-20">
      <div className="flex items-center gap-16">
        <Link to="/">
          <h1 className="text-xl font-bold">Logo</h1>
        </Link>
        <div className="flex gap-16">
          <Link
            to="/"
            className="relative w-fit after:h-[2px] after:w-0 after:bg-black after:absolute after:-bottom-1 after:left-0 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="relative w-fit after:h-[2px] after:w-0 after:bg-black after:absolute after:-bottom-1 after:left-0 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
          >
            Register
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-8">
        {token && (
          <button
            onClick={() => navigate("/user/dashboard")}
            className="bg-black text-white py-1 px-3 rounded-lg"
          >
            Dashboard
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
