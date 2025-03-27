import { Breadcrumbs, Typography } from "@mui/material";
import React, { useEffect } from "react";
import InputField from "../MUIComponents/InputField";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addSellers, updateSeller } from "../Redux/UserSlice";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

function AddSeller() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sellerName: "",
      sellerEmail: "",
      sellerPhone: "",
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const sellers = useSelector((state) => state.users.sellers);

  const sellerToEdit = isEditMode
    ? sellers.find((seller) => seller.id === id)
    : null;

  useEffect(() => {
    if (isEditMode && sellerToEdit) {
      setValue("sellerName", sellerToEdit.name);
      setValue("sellerEmail", sellerToEdit.email);
      setValue("sellerPhone", sellerToEdit.phone);
    }
  }, [isEditMode, sellerToEdit, setValue]);

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
      {isEditMode ? "Edit Seller" : "Add Seller"}
    </Typography>,
  ];

  const onSubmit = (data) => {
    const storeSellerData = {
      id: isEditMode ? id : uuidv4(),
      type: "seller",
      name: data.sellerName,
      email: data.sellerEmail,
      phone: data.sellerPhone,
    };

    if (isEditMode) {
      dispatch(updateSeller(storeSellerData));
    } else {
      dispatch(addSellers(storeSellerData));
    }

    navigate("/sellers");
  };

  return (
    <div className="min-h-screen bg-gray-100">
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

export default AddSeller;
