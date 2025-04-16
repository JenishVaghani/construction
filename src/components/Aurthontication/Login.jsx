// import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    const loginData = {
      username: data.username,
      password: data.password,
    };
    console.log("loginData = ", loginData);
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-[#15616D] text-center mb-6">
          Login
        </h2>
        {/* {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )} */}
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
            <p className="text-red-500">{errors.username.message}</p>
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
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <button
            type="submit"
            className="w-full bg-[#15616D] text-white p-2 mt-4 rounded-lg hover:bg-[#0E4A52] cursor-pointer"
          >
            Login
          </button>
        </form>
       
      </div>
    </div>
  );
}
