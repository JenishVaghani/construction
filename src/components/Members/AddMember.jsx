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
        <Link underline="hover" key="1" color="inherit" to="/members">
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
        <div className="h-full ml-56 mt-16">
            <div className="p-2">
                <h1 className="text-2xl font-bold pt-4 pl-8">Add Member</h1>

                <div className="mt-6 ml-4 border border-black p-2 w-fit rounded-xl">
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        {showAddMemberUrl}
                    </Breadcrumbs>
                </div>

                <div className="pl-16 pt-6">
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
