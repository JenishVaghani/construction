import { Breadcrumbs, Typography } from "@mui/material";
import React, { useEffect } from "react";
import InputField from "../MUIComponents/InputField";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addVendors, updateVendor } from "../Redux/UserSlice";
import { useForm } from "react-hook-form";

function AddVendor() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const vendors = useSelector((state) => state.users.vendors);
  const vendorToEdit = isEditMode
    ? vendors.find((vendor) => vendor.id === id)
    : null;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    }
  });

  useEffect(() => {
    if (isEditMode && vendorToEdit) {
      setValue("name", vendorToEdit.name);
      setValue("email", vendorToEdit.email);
      setValue("phone", vendorToEdit.phone);
    }
  }, [isEditMode, vendorToEdit, setValue]);

  const breadcrumbItems = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      to="/vendors"
      className="hover:underline"
    >
      Vendors
    </Link>,
    <Typography key="2" sx={{ color: "text.primary" }}>
      {isEditMode ? "Edit Vendor" : "Add Vendor"}
    </Typography>
  ];

  const onSubmit = (data) => {
    const vendorData = {
      ...data,
      type: "vendor"
    };

    if (isEditMode) {
      dispatch(updateVendor({ id, updatedData: vendorData }));
    } else {
      dispatch(addVendors(vendorData));
    }

    navigate("/vendors");
  };

  return (
    <div className="min-h-screen ml-56 mt-16">
      <div className="p-4">
        <div className="w-fit rounded-md bg-gray-300 p-3">
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbItems}
          </Breadcrumbs>
        </div>

        <div className="mt-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center mb-4">
              <InputField
                label="Name"
                type="text"
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register("name", {
                  required: "Name is required"
                })}
              />
            </div>
            <div className="flex items-center mb-4">
              <InputField
                label="Email"
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
            </div>
            <div className="flex items-center mb-4">
              <InputField
                label="Phone No"
                type="text"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits"
                  }
                })}
              />
            </div>
            <div className="flex items-center mb-4 pl-12">
              <button
                type="submit"
                className="px-10 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer"
              >
                {isEditMode ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddVendor;