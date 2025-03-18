import { Breadcrumbs, Typography } from '@mui/material';
import React, { useState } from 'react'
import InputField from '../MUIComponents/InputField';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addSellers } from '../Redux/UserSlice';

function AddSeller() {
    const [sellerName, setSellerName] = useState("")
    const [sellerEmail, setSellerEmail] = useState("")
    const [sellerPhone, setSellerPhone] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const showAddSellerUrl = [
        <Link underline="hover" key="1" color="inherit" to="/sellers">
            Sellers
        </Link>,
        <Typography key="3" sx={{ color: 'text.primary' }}>
            addSeller
        </Typography>,
    ];
    const storeSellerData = {
        name: sellerName,
        email: sellerEmail,
        phone: sellerPhone,
        type: "seller"
    }
    const handleAddSeller = () => {
        if(sellerName && sellerEmail && sellerPhone) {   
            dispatch(addSellers(storeSellerData))
            setSellerName("")
            setSellerEmail("")
            setSellerPhone("")
            navigate("/sellers")
        }
        else {
            alert("All fields are required!")
        }
    }

  return (
    <div className="h-full ml-56 mt-16">
            <div className="p-2">
                <h1 className="text-2xl font-bold pt-4 pl-8">Add Seller</h1>

                <div className="mt-6 ml-4 border border-black p-2 w-fit rounded-xl">
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        {showAddSellerUrl}
                    </Breadcrumbs>
                </div>

                <div className="pl-16 pt-6">
                    <div className="flex items-center mb-4">
                        <InputField label="Name" type="text" onChange={(e) => setSellerName(e.target.value)} />
                    </div>
                    <div className="flex items-center mb-4">
                        <InputField label="Email" type="text" onChange={(e) => setSellerEmail(e.target.value)} />
                    </div>
                    <div className="flex items-center mb-4">
                        <InputField label="Phone No" type="number" onChange={(e) => setSellerPhone(e.target.value)} />
                    </div>
                    <div className="flex items-center mb-4 pl-12">
                        <button onClick={handleAddSeller} className="px-10 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 cursor-pointer">
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default AddSeller
