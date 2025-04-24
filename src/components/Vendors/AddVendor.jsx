import { Breadcrumbs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputField from "../MUIComponents/InputField";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function AddVendor() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      vendorName: "",
      vendorEmail: "",
      vendorPhone: "",
    },
  });
  const [getVendors, setGetVendors] = useState();
  const [responseMessage, setResponseMessage] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  // vendor fetch API
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get("http://192.168.1.3:5000/getVendors");
        setGetVendors(response.data || "");
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };
    fetchVendors();
  }, []);

  const vendorToEdit = isEditMode
    ? getVendors?.find((vendor) => vendor.id === id)
    : null;

  useEffect(() => {
    if (isEditMode && vendorToEdit) {
      setValue("vendorName", vendorToEdit.name);
      setValue("vendorEmail", vendorToEdit.email);
      setValue("vendorPhone", vendorToEdit.phone);
    }
  }, [isEditMode, vendorToEdit, setValue]);

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
      {isEditMode ? "Edit Vendor" : "Add Vendor"}
    </Typography>,
  ];

  const onSubmit = async (data) => {
    const storeVendorData = {
      id: isEditMode ? id : uuidv4(),
      type: "vendor",
      name: data.vendorName,
      email: data.vendorEmail,
      phone: data.vendorPhone,
    };
    try {
      let response;
      if (isEditMode) {
        response = await axios.put(
          "http://192.168.1.3:5000/updateVendor",
          storeVendorData
        );
      } else {
        response = await axios.post(
          "http://192.168.1.3:5000/addVendor",
          storeVendorData
        );
      }
      setResponseMessage(response.data.Message);
      navigate("/vendors");
    } catch (error) {
      console.error("Error sending data to server", error);

      if (error.response && error.response.status === 409) {
        setResponseMessage(error.response.data.Message);
      }
    }
  };

  return (
    <div className="min-h-screen">
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
              {(errors.vendorName || responseMessage) && (
                <p className="text-red-500">
                  {errors.vendorName?.message || responseMessage}
                </p>
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
                className="px-10 py-2 bg-[#15616D] text-white rounded-xl hover:bg-[#0E4A52] cursor-pointer"
              >
                {isEditMode ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddVendor;
