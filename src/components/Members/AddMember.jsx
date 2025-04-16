import React, { useEffect } from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import InputField from "../MUIComponents/InputField";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

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
      memberPassword: "",
    },
  });
  const navigate = useNavigate();
  const { userid } = useParams();
  const isEditMode = !!userid;
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

  const onSubmit = async (data) => {
    const storeMemberData = {
      userid: isEditMode ? userid : uuidv4(),
      type: "member",
      name: data.memberName,
      email: data.memberEmail,
      phone: data.memberPhone,
      isAdmin: false,
    };
    console.log("storeMemberData = ", storeMemberData);

    try {
      let response;
      if (isEditMode) {
        // UPDATE Member
        response = await axios.put(
          "http://192.168.1.3:5000/updateMember",
          storeMemberData
        );
      } else {
        // ADD New Member
        response = await axios.post(
          "http://192.168.1.3:5000/addMember",
          storeMemberData
        );
      }

      console.log("API Response:", response.data);
      navigate("/members");
    } catch (error) {
      console.error("Error sending data to server", error);
    }
  };

  useEffect(() => {
    const fetchMember = async () => {
      if (isEditMode) {
        try {
          // Pela badha members fetch karo
          const response = await axios.get(
            "http://192.168.1.3:5000/getMembers"
          );

          if (response.data) {
            // Response mathi userid match thaye te member search karo
            const member = response.data.find((m) => m.userid === userid);

            if (member) {
              setValue("memberName", member.name);
              setValue("memberEmail", member.email);
              setValue("memberPhone", member.phone);
            } else {
              console.log("Member not found for userid:", userid);
            }
          }
        } catch (error) {
          console.error("Error fetching members:", error);
        }
      }
    };

    fetchMember();
  }, [isEditMode, userid, setValue]);

  return (
    <div className="min-h-screen bg-gray-100">
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
            
            <div className="flex justify-center mb-4">
              <button
                type="submit"
                className="px-12 py-2 bg-[#15616D] text-white rounded-xl hover:bg-[#0E4A52] cursor-pointer"
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
