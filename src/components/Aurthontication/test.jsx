import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    const signupData = {
      username: data.username,
      email: data.email,
      phone: data.phone,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    console.log("signupData", signupData);

    try {
      const response = await axios.post(
        "http://localhost:5000/signup",
        signupData
      );
      if (response.data.isSignup) {
        navigate("/login");
      } else {
        setErrorMessage(response.data.Message);
      }
    } catch (err) {
      console.log("catch error", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-[#15616D] text-center mb-6">
          Sign Up
        </h2>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
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
            <p className="text-red-500  mb-3">{errors.username.message}</p>
          )}
          <input
            type="text"
            placeholder="Email"
            className="w-full p-2 mt-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15616D]"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email address",
              },
            })}
          />

          {errors.email && (
            <p className="text-red-500  mb-3">{errors.email.message}</p>
          )}
          <input
            type="number"
            placeholder="Phone"
            className="w-full p-2 mt-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15616D]"
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number must be 10 digits",
              },
            })}
          />
          {errors.phone && (
            <p className="text-red-500  mb-3">{errors.phone.message}</p>
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
            <p className="text-red-500  mb-3">{errors.password.message}</p>
          )}
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 mt-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15616D]"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value)=> value===watch("password") || "Password do not match"
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500  mb-3">
              {errors.confirmPassword.message}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-[#15616D] text-white p-2 mt-4 rounded-lg hover:bg-[#0E4A52] cursor-pointer"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#15616D] font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
