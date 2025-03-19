import { Breadcrumbs, Typography } from '@mui/material';
import React, { useState } from 'react'
import InputField from '../MUIComponents/InputField';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addVendors } from '../Redux/UserSlice';


function AddVendor() {
    const [vendorName, setVendorName] = useState("")
    const [vendorEmail, setVendorEmail] = useState("")
    const [vendorPhone, setVendorPhone] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const showAddVendorUrl = [
        <Link underline="hover" key="1" color="inherit" to="/vendors" className='hover:underline'>
            Vendors
        </Link>,
        <Typography key="3" sx={{ color: 'text.primary' }}>
            addVendor
        </Typography>,
    ];

    const storeVendorData = {
        name: vendorName,
        email: vendorEmail,
        phone: vendorPhone,
        type: "vendor"
    }

    const handleAddVendor = () => {
        if (vendorName && vendorEmail && vendorPhone) {
            dispatch(addVendors(storeVendorData))
            setVendorName("")
            setVendorEmail("")
            setVendorPhone("")
            navigate("/vendors")
        }
        else {
            alert("All fields are required!")
        }
    }

    return (
        <div className="min-h-screen ml-56 mt-16">
            <div className="p-4">
                <div className="w-fit rounded-md bg-gray-300 p-3">
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        {showAddVendorUrl}
                    </Breadcrumbs>
                </div>

                <div className="mt-4">
                    <div className="flex items-center mb-4">
                        <InputField label="Name" type="text" onChange={(e) => setVendorName(e.target.value)} />
                    </div>
                    <div className="flex items-center mb-4">
                        <InputField label="Email" type="text" onChange={(e) => setVendorEmail(e.target.value)} />
                    </div>
                    <div className="flex items-center mb-4">
                        <InputField label="Phone No" type="number" onChange={(e) => setVendorPhone(e.target.value)} />
                    </div>
                    <div className="flex items-center mb-4 pl-12">
                        <button onClick={handleAddVendor} className="px-10 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer">
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddVendor
