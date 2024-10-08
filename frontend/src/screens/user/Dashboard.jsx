import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        "/api/getUserInfo",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setUser(res.data.data);
      } else {
        localStorage.removeItem("userToken");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  const Logouthandler = () => {
    localStorage.removeItem("userToken");
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center h-screen px-10">
        <div className="flex flex-col items-center shadow-lg md:py-12 py-5 md:px-20 px-10 rounded-2xl bg-gray-100 justify-center">
          <h1 className="md:text-2xl text-xl font-bold">Welcome {user.userName}</h1>
          <h2 className="md:text-xl text-sm font-semibold mt-3">Email: {user.email}</h2>
          <button
            onClick={Logouthandler}
            className="bg-red-600 mt-5 text-white py-2 px-5 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
