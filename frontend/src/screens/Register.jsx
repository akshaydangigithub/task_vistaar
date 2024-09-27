import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/signup", formData);

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center flex-col">
      <Navbar />

      <h1 className="text-center font-bold text-lg">
        Register Your Account Now
      </h1>

      <form
        onSubmit={handleSubmit}
        className="shadow-sm shadow-black rounded-xl py-3 px-6 mt-10 w-[35%]"
      >
        <div className="mb-5">
          <label
            htmlFor="userName"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your Username
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     "
            placeholder="dummy123"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     "
            placeholder="name@dummy.com"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="*****"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     "
          />
        </div>

        <p>
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500"
          >
            Login
          </Link>
        </p>

        <button
          type="submit"
          className="mt-5 bg-black py-2 px-5 rounded-lg text-white"
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
