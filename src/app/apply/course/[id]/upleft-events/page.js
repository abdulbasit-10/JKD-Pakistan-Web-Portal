"use client"

import AdminLeftSidebar from '@/component/AdminLeftSidebar'
import Footer from '@/component/Footer'
import Header from '@/component/Header'
import { useGlobal } from '@/context/GlobleContext'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axiosInstance from '@/lib/axios'
import LoadingScreen from '@/component/LoadingScreen'


const UpleftEvents = () => {
  const theme = 'light';
  const router = useRouter();
  const [applyForm , setApplyForm] = useState({
    fullName:'',
    email:'',
    // gender:'',
    phoneNumber:'',
    // Candidate Address
    province:'',
    district:'',
    tehsil:'',
    organization:'',
    prefferedDate:'',
    prefferedTime:'',
    emergencyContact:'',

    medical:'',
    idImage:'',
    signatureName:'',
    eventFee:'',

    paymentMethod:'',
    paymentReferenceNumber:'',
    paymentScreenshot:''
  })
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    event.preventDefault()
    const {value , name  , files } = event.target;
    if(files){
        return setApplyForm((preValue) => {
            return {
                ...preValue,
                [name] : files[0]
            }
        })
    } 
    
    setApplyForm((preValue) => {
        return {
            ...preValue,
            [name] : value
        }
    })

  }
  
const handleSubmit = async (e) => {
  e.preventDefault()
  console.log(applyForm)

    let formData = new FormData();
  for(let field in applyForm){
    formData.append(field , applyForm[field]);
  }

  setLoading(true);
  try {
    const response = await axiosInstance.post("/api/booking", formData , {
      headers: { "Content-Type": "multipart/form-data" }
    });
    console.log(response);
    const data = response.data;

    toast.success(data.message || "Login successful");

    // router.push("/admin"  );
  } catch (err) {
    console.log("catch block", err)
    const errorMessage = err.response?.data?.error || "Something went wrong. Please try again.";
    toast.error(errorMessage);
  } finally {
    setLoading(false);
  }
};

  const [screenLoading, setScreenLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreenLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (screenLoading) return <LoadingScreen />;

  return (
    <div className={`${theme === 'light' ? 'bg-[#eefbff] text-black':'bg-[#080808] text-white'} flex  flex-col   w-full `}>
        <Header />
        {/* <AdminLeftSidebar className="w-[20%]" /> */}
        <form onSubmit={handleSubmit} className={` w-full  flex flex-col items-center p-10 mt-20 `}>
            <h3 className=' text-[17px] md:text-[21px] lg:text-[25px] font-semibold w-full  '>
               Booking Details
            </h3>
            {/* name and fatername */}
            <div className='flex w-full gap-5 pt-8'>
                <div  className='flex flex-col gap-3  w-[50%]'>
                    <label htmlFor="name" className='font-semibold text-sm md:text-base '>Full Name</label>
                    <input  type='text' name='fullName' onChange={handleChange} value={applyForm.fullName} placeholder='fullname' className={`text-sm  md:text-base border ${theme === 'dark' ? 'border-[#177eaa94] bg-black' : 'bg-white border-[#00874f85]'} p-2 rounded  outline-none`}  required/>
                </div>
                <div className='flex flex-col gap-3  w-[50%]'>
                    <label className='text-sm md:text-base font-semibold'>Email</label>
                    <input type='text' name='email' onChange={handleChange} value={applyForm.email}  placeholder='email address' className={`text-sm  md:text-base border ${theme === 'dark' ? 'border-[#177eaa94] bg-black' : 'bg-white border-[#00874f85]'} p-2 rounded  outline-none`} required />
                </div>
            </div>

            {/* email and DOB */}
            <div className='flex w-full gap-5 pt-5'>
                <div className='flex flex-col gap-3  w-[50%]'>
                    <label className='text-sm md:text-base font-semibold'>Phone Number</label>
                    <input type='number' name='phoneNumber' onChange={handleChange} value={applyForm.phoneNumber}  placeholder='phone number' className={`text-sm  md:text-base border ${theme === 'dark' ? 'border-[#177eaa94] bg-black' : 'bg-white border-[#00874f85]'} p-2 rounded  outline-none`} required />
                </div>
                <div className='flex flex-col gap-3  w-[50%]'>
                    <label className='text-sm md:text-base font-semibold'>Organization</label>
                    <input type='text' placeholder='organization / institute name' name='organization' onChange={handleChange} value={applyForm.organization} className={`text-sm  md:text-base border ${theme === 'dark' ? 'border-[#177eaa94] bg-black' : 'bg-white border-[#00874f85]'} p-2 rounded  outline-none`} required />
                </div>
                    <div className='flex flex-col gap-3  w-[50%]'>
                    <label className='text-sm md:text-base font-semibold'>Emergency Contact Number</label>
                    <input type='number' name='emergencyContact' onChange={handleChange} value={applyForm.emergencyContact}  placeholder='emergency contact' className={`text-sm  md:text-base border ${theme === 'dark' ? 'border-[#177eaa94] bg-black' : 'bg-white border-[#00874f85]'} p-2 rounded  outline-none`} required />
                </div>
            </div>
            {/* preffered date or time*/}
            <div className='flex w-full gap-3 pt-5'>
                <div className='flex flex-col gap-3  w-[50%]'>
                    <label className='text-sm md:text-base font-semibold'>Preffered Date</label>
                    <input type='date' name='prefferedDate' onChange={handleChange} value={applyForm.prefferedDate} placeholder='number' className={`text-sm  md:text-base border ${theme === 'dark' ? 'border-[#177eaa94] bg-black' : 'bg-white border-[#00874f85]'} p-2 rounded  outline-none`} required />
                </div>
                <div className='flex flex-col gap-3  w-[50%]'>
                    <label className='text-sm md:text-base font-semibold'>Preffered Time</label>
                    <input type='time' name='prefferedTime' onChange={handleChange} value={applyForm.prefferedTime} placeholder='address' className={`text-sm  md:text-base border ${theme === 'dark' ? 'border-[#177eaa94] bg-black' : 'bg-white border-[#00874f85]'} p-2 rounded  outline-none`} required />
                </div>
            </div>

            {/* Applicant Address */}
            <h3 className=' text-[17px] md:text-[21px] lg:text-[25px] font-semibold w-full  pt-10'>
                Applicant Address
            </h3>
            {/* provience / district / tehsil */}
            <div className='flex w-full gap-5 pt-5'>
                <div className='flex flex-col gap-3  w-[33%]'>
                    <label className='text-sm md:text-base font-semibold'>Province</label>
                    <select name='province' onChange={handleChange} value={applyForm.province} className={`text-sm  md:text-base border ${theme === 'dark' ? 'border-[#177eaa94] bg-black' : 'bg-white border-[#00874f85]'} p-2 rounded  outline-none`} required >
                        <option value="">Province</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Sindh">Sindh</option>
                        <option value="Balochistan">Balochistan</option>
                        <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                    </select>                    
                </div>                
                <div className='flex flex-col gap-3  w-[33%]'>
                    <label className='text-sm md:text-base font-semibold'>District</label>
                    <select name='district' onChange={handleChange} value={applyForm.district} className={`text-sm  md:text-base border ${theme === 'dark' ? 'border-[#177eaa94] bg-black' : 'bg-white border-[#00874f85]'} p-2 rounded  outline-none`} required >
                        <option value="">District</option>
                        {
                            applyForm?.province === "Punjab" ?
                            <option value="Lahore">Lahore</option>
                            :
                            applyForm?.province === "Sindh" ?
                            <option value="Karachi">Karachi</option>
                            :
                            applyForm?.province === "Balochistan" ?
                            <option value="Quetta">Quetta</option>
                            :
                            applyForm?.province === "Khyber Pakhtunkhwa" ?
                            <option value="Peshawar">Peshawar</option>
                            :
                            null
                        }
                    </select>                    
                </div>
                <div className='flex flex-col gap-3  w-[33%]'>
                    <label className='text-sm md:text-base font-semibold'>Tehsil</label>
                    <select name='tehsil' onChange={handleChange} value={applyForm.tehsil} className={`text-sm  md:text-base border ${theme === 'dark' ? 'border-[#177eaa94] bg-black' : 'bg-white border-[#00874f85]'} p-2 rounded  outline-none`} required >
                        <option value="">Tehsil</option>
                        {
                            applyForm?.province === "Punjab" && applyForm?.district === "Lahore" ?
                            <option value="Lahore">Lahore</option>
                            :
                            applyForm?.province === "Sindh" && applyForm?.district === "Karachi" ?
                            <option value="Karachi">Karachi</option>
                            :
                            applyForm?.province === "Balochistan" && applyForm?.district === "Quetta" ?
                            <option value="Quetta">Quetta</option>
                            :
                            applyForm?.province === "Khyber Pakhtunkhwa" && applyForm?.district === "Peshawar" ?
                            <option value="Peshawar">Peshawar</option>
                            :
                            null 
                        }
                    </select>                    
                </div>  
            </div>
        
            {/* Verification */}
            <h3 className=' text-[17px] md:text-[21px] lg:text-[25px] font-semibold w-full  pt-10'>
                Verification
            </h3>
            {/* Medical and ID Proof */}
            <div className='flex w-full gap-5 pt-5'>
                <div className='flex flex-col gap-3  w-[50%]'>
                    <label className='text-sm md:text-base font-semibold'>Medical Support</label>
                    <input type='text' name='medical' onChange={handleChange} value={applyForm.medical} placeholder='any medical or accessibility needs?' className={`$text-sm  md:text-base border ${theme === 'dark' ? 'border-[#177eaa94] bg-black' : 'bg-white border-[#00874f85]'} p-2 rounded  outline-none`} required />
                </div>
                <div className='flex flex-col gap-3  w-[50%]'>
                    <label className='text-sm md:text-base font-semibold'>Upload ID Proof / Company ID / Student Card</label>
                    <input type='file' name='idImage' onChange={handleChange}  className={`text-sm  md:text-base border ${theme === 'dark' ? 'border-[#177eaa94] bg-black' : 'bg-white border-[#00874f85]'} p-2 rounded  outline-none`} required />
                </div>
            </div>
            {/* signatur name and event fee */}
            <div className='flex w-full gap-5 pt-5'>
                <div className='flex flex-col gap-3  w-[50%]'>
                    <label className='text-sm md:text-base font-semibold'>Signature Name</label>
                    <input type='text' name='signatureName' onChange={handleChange} value={applyForm.signatureName} placeholder='signature / full name for confirmation' className={`$text-sm  md:text-base border ${theme === 'dark' ? 'border-[#177eaa94] bg-black' : 'bg-white border-[#00874f85]'} p-2 rounded  outline-none`} required />
                </div>
                <div className='flex flex-col gap-3  w-[50%]'>
                    <label className='text-sm md:text-base font-semibold'>Event Fee / Ticket Price</label>
                    <select name='eventFee' onChange={handleChange} value={applyForm.eventFee} className={`text-sm  md:text-base border ${theme === 'dark' ? 'border-[#177eaa94] bg-black' : 'bg-white border-[#00874f85]'} p-2 rounded  outline-none`} required >
                        <option value="">Event Fee / Ticket Price</option>
                        <option value="football">Indoor Football : 1000 pkr</option>
                        <option value="badminton">Indoor badminton : 1000 pkr</option>    
                    </select>
                </div>
            </div>


            {/* Payment Method */}
            <h3 className=' text-[17px] md:text-[21px] lg:text-[25px] font-semibold w-full  pt-10'>
                Payment Method
            </h3>
            <div className='flex w-full gap-5 pt-5'>
                <div className='flex flex-col gap-3  w-[32%]'>
                    <label className='text-sm md:text-base font-semibold'>Payment</label>
                    <select name='paymentMethod' onChange={handleChange} value={applyForm.paymentMethod} className={`text-sm  md:text-base border ${theme === 'dark' ? 'border-[#177eaa94] bg-black' : 'bg-white border-[#00874f85]'} p-2 rounded  outline-none`} required >
                        <option value="">Select Method</option>
                        <option value="football">Cash on Delevory</option>    
                    </select>
                </div>
                {/* <div className='flex flex-col gap-3  w-[50%]'>
                    <label className='text-sm md:text-base font-semibold'>Organization</label>
                    <input type='text' placeholder='organization / institute name' name='organization' onChange={handleChange} value={applyForm.organization} className={`text-sm  md:text-base border ${theme === 'dark' ? 'border-[#177eaa94] bg-black' : 'bg-white border-[#00874f85]'} p-2 rounded  outline-none`} required />
                </div>
                    <div className='flex flex-col gap-3  w-[50%]'>
                    <label className='text-sm md:text-base font-semibold'>Emergency Contact Number</label>
                    <input type='text' name='emergencyContact' onChange={handleChange} value={applyForm.emergencyContact}  placeholder='emergency contact' className={`text-sm  md:text-base border ${theme === 'dark' ? 'border-[#177eaa94] bg-black' : 'bg-white border-[#00874f85]'} p-2 rounded  outline-none`} required />
                </div> */}
            </div>


            <div className='self-start  pt-5'>
                <button type='submit' className={`hidden md:block  px-4 py-2 rounded ${theme === 'light' ? 'bg-[#00874F] hover:text-white hover:bg-black': 'hover:text-black hover:bg-white bg-[#177faa]'} transition cursor-pointer text-white text-sm md:text-[14px] lg:text-base`}>
                    {loading ? "Submiting..." : "Submit"}
                </button>
            </div>
        </form>
        <Footer />
    </div>
  )
}

export default UpleftEvents