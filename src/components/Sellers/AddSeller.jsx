import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import InputField from "../MUIComponents/InputField";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addSellers } from "../Redux/UserSlice";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

function AddSeller() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showAddSellerUrl = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      to="/sellers"
      className="hover:underline"
    >
      Sellers
    </Link>,
    <Typography key="3" sx={{ color: "text.primary" }}>
      addSeller
    </Typography>,
  ];

  const onSubmit = (data) => {
    const storeSellerData = {
      sellerName: data.sellerName,
      sellerEmail: data.sellerEmail,
      sellerPhone: data.sellerPhone,
      type: "seller",
      sellerId: uuidv4()
    };
    console.log("storeSellerData", storeSellerData);
    
    dispatch(addSellers(storeSellerData));
    navigate("/sellers");
  };

  return (
    <div className="min-h-screen ml-56 mt-16 bg-gray-100">
      <div className="p-4">
        <div className="w-fit rounded-md bg-gray-300 p-3">
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {showAddSellerUrl}
          </Breadcrumbs>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <div className="mb-4">
              <InputField
                label="Name"
                type="text"
                {...register("sellerName", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters long",
                  },
                })}
              />
              {errors.sellerName && (
                <p className="text-red-500">{errors.sellerName.message}</p>
              )}
            </div>
            <div className="mb-4">
              <InputField
                label="Email"
                type="text"
                {...register("sellerEmail", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Plese enter valid email",
                  },
                })}
              />
              {errors.sellerEmail && (
                <p className="text-red-500">{errors.sellerEmail.message}</p>
              )}
            </div>
            <div className="mb-4">
              <InputField
                label="Phone No"
                type="number"
                {...register("sellerPhone", {
                  required: "Phone number is required",
                  minLength: {
                    value: 10,
                    message: "Phone number cannot be less than 10 digits",
                  },
                  maxLength: {
                    value: 10,
                    message: "Phone number cannot be more than 10 digits",
                  },
                })}
              />
              {errors.sellerPhone && (
                <p className="text-red-500">{errors.sellerPhone.message}</p>
              )}
            </div>
            <div className="flex items-center mb-4 pl-12">
              <button
                type="submit"
                className="px-10 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSeller;
