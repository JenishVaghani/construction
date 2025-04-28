import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TEQNODUX, CONSTRUCTION } from "../../utils/constants";
import { addIsAdmin } from "../Redux/UserSlice";
import { useDispatch } from "react-redux";
import Loading from "../Loading/Loading";

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const teqnodux = TEQNODUX;
  const construction = CONSTRUCTION;
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const storeUserData = {
        username: data.username,
        password: data.password,
      };
      const response = await axios.post(
        "http://192.168.1.3:5000/login",
        storeUserData
      );

      const isAdminData = response.data.data.isAdmin;
      dispatch(addIsAdmin(isAdminData));
      if (response.status === 200) {
        localStorage.setItem("user", watch("username"));
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Invalid username or password from backend
        setErrorMessage(error.response.message);
      } else {
        console.error("Error during login:", error);
        setErrorMessage("Server Error! Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${construction.img})`,
      }}
    >
      {/* Overlay for dark effect */}
      <div className="absolute inset-0 bg-[#00000080] z-0" />
      {loading ? (
        <div className="relative z-10">
          <Loading />
        </div>
      ) : (
        <div className="bg-white p-8 rounded-xl shadow-xl w-[400px] relative z-10">
          {/* Login Heading */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#15616D]"></div>
            </div>
            <div className="relative px-4 bg-white  text-[#15616D] text-3xl font-bold">
              Login
            </div>
          </div>

          {/* LOGO & BRANDING */}
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center space-x-3">
              <img
                src={teqnodux.img}
                alt={teqnodux.name}
                className="h-12 w-12 object-contain"
              />
              <div>
                <h1 className="text-xl font-semibold text-[#0E4A52]">
                  Constructions
                </h1>
                <span className="text-md text-[#0E4A52]">Teqnodux</span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 mt-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15616D]"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Enter a valid name",
                },
              })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}

            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mt-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15616D]"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#15616D] text-white p-2 mt-4 rounded-lg hover:bg-[#0E4A52] transition-colors duration-200 cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
