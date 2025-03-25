import React, { useEffect } from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import InputField from "../MUIComponents/InputField";
import { useDispatch, useSelector } from "react-redux";
import { addMembers } from "../Redux/UserSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { updateMember } from "../Redux/UserSlice";

function AddMember() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      memberName: "",
      memberEmail: "",
      memberPhone: "",
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const members = useSelector((state) => state.users.members);

  const memberToEdit = isEditMode
    ? members.find((member) => member.id === id)
    : null;

  useEffect(() => {
    if (isEditMode && memberToEdit) {
      setValue("memberName", memberToEdit.name);
      setValue("memberEmail", memberToEdit.email);
      setValue("memberPhone", memberToEdit.phone);
    }
  }, [isEditMode, memberToEdit, setValue]);
  const showAddMemberUrl = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      to="/members"
      className="hover:underline"
    >
      Members
    </Link>,
    <Typography key="3" sx={{ color: "text.primary" }}>
      {isEditMode ? "Edit Member" : "Add Member"}
    </Typography>,
  ];

  const onSubmit = (data) => {
    const storeMemberData = {
      id: isEditMode ? id : uuidv4(),
      type: "member",
      name: data.memberName,
      email: data.memberEmail,
      phone: data.memberPhone,
    };
    console.log("storeMemberData = ", storeMemberData);

    if (isEditMode) {
      dispatch(updateMember(storeMemberData));
    } else {
      dispatch(addMembers(storeMemberData));
    }
    navigate("/members");
  };

  return (
    <div className="min-h-screen ml-56 mt-16 bg-gray-100">
      <div className="p-4">
        <div className="w-fit rounded-md bg-gray-300 p-3">
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {showAddMemberUrl}
          </Breadcrumbs>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <div className="mb-4">
              <InputField
                label="Name"
                type="text"
                {...register("memberName", {
                  required: "Name is  required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters long",
                  },
                })}
              />
              {errors.memberName && (
                <p className="text-red-500">{errors.memberName.message}</p>
              )}
            </div>
            <div className="mb-4">
              <InputField
                label="Email"
                type="text"
                {...register("memberEmail", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Plese enter valid email",
                  },
                })}
              />
              {errors.memberEmail && (
                <p className="text-red-500">{errors.memberEmail.message}</p>
              )}
            </div>
            <div className="mb-4">
              <InputField
                label="Phone No"
                type="number"
                {...register("memberPhone", {
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
              {errors.memberPhone && (
                <p className="text-red-500">{errors.memberPhone.message}</p>
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

export default AddMember;
