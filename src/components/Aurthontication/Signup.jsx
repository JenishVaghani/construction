import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log({
      name: data.name,
      phone: data.phone,
      userName: data.username,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-[#15616D] text-center mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15616D]"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          <input
            type="number"
            placeholder="Phone"
            className="w-full p-2 mt-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15616D]"
            {...register("phone", {
              required: "Phone is required",
            })}
          />
          {errors.phone && (
            <p className="text-red-500  mb-3">{errors.phone.message}</p>
          )}

          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mt-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15616D]"
            {...register("username", {
              required: "Username is required",
            })}
          />
          {errors.username && (
            <p className="text-red-500  mb-3">{errors.username.message}</p>
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
