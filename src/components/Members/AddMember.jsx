import React, { useState } from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import InputField from "../MUIComponents/InputField";
import { useDispatch } from "react-redux";
import { addMembers } from "../Redux/UserSlice";
import { Link, useNavigate } from "react-router-dom";

function AddMember() {  
    const [memberName, setMemberName] = useState("");
    const [memberEmail, setMemberEmail] = useState("");
    const [memberPhone, setMemberPhone] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const showAddMemberUrl = [
        <Link underline="hover" key="1" color="inherit" to="/members" className="hover:underline">
            Members
        </Link>,
        <Typography key="3" sx={{ color: "text.primary" }}>
            addMember
        </Typography>,
    ];

    const storeMemberData = { 
        name: memberName, 
        email: memberEmail, 
        phone: memberPhone,
        type: "member"
    };

    const handleAddMember = () => {
        if ((memberName && memberEmail && memberPhone)) {
            dispatch(addMembers(storeMemberData))
            setMemberName("");
            setMemberEmail("");
            setMemberPhone("");
            navigate("/members")
        }
        else {
            alert("All fields are required!")
        }
    };

    return (
        <div className="min-h-screen ml-56 mt-16 bg-gray-100">
            <div className="p-4">
                <div className="w-fit rounded-md bg-gray-300 p-3">
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        {showAddMemberUrl}
                    </Breadcrumbs>
                </div>

                <div className="mt-4">
                    <div className="flex items-center mb-4">
                        <InputField
                            label="Name"
                            type="text"
                            onChange={(e) => setMemberName(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <InputField
                            label="Email"
                            type="email"
                            onChange={(e) => setMemberEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <InputField
                            label="Phone No"
                            type="number"
                            onChange={(e) => setMemberPhone(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center mb-4 pl-12">
                        <button
                            onClick={handleAddMember}
                            className="px-10 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddMember;
