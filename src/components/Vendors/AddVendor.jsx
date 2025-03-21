import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import InputField from "../MUIComponents/InputField";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addVendors } from "../Redux/UserSlice";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

function AddVendor() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showAddVendorUrl = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      to="/vendors"
      className="hover:underline"
    >
      Vendors
    </Link>,
    <Typography key="3" sx={{ color: "text.primary" }}>
      addVendor
    </Typography>,
  ];

  const onSubmit = (data) => {
    const storeVendorData = {
      vendorName: data.vendorName,
      vendorEmail: data.vendorEmail,
      vendorPhone: data.vendorPhone,
      type: "vendor",
      vendorId: uuidv4()
    };
    console.log("storeVendorData", storeVendorData);
    
    dispatch(addVendors(storeVendorData));
    navigate("/vendors");
  };

  return (
    <div className="min-h-screen ml-56 mt-16">
      <div className="p-4">
        <div className="w-fit rounded-md bg-gray-300 p-3">
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {showAddVendorUrl}
          </Breadcrumbs>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <div className="mb-4">
              <InputField
                label="Name"
                type="text"
                {...register("vendorName", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters long",
                  },
                })}
              />
              {errors.vendorName && (
                <p className="text-red-500">{errors.vendorName.message}</p>
              )}
            </div>
            <div className="mb-4">
              <InputField
                label="Email"
                type="text"
                {...register("vendorEmail", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Plese enter valid email",
                  },
                })}
              />
              {errors.vendorEmail && (
                <p className="text-red-500">{errors.vendorEmail.message}</p>
              )}
            </div>
            <div className="mb-4">
              <InputField
                label="Phone No"
                type="number"
                {...register("vendorPhone", {
                  required: "Phone is required",
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
              {errors.vendorPhone && (
                <p className="text-red-500">{errors.vendorPhone.message}</p>
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

export default AddVendor;
