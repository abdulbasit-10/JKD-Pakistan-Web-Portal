"use client"
import Footer from '@/component/Footer'
import Header from '@/component/Header'
import { useGlobal } from '@/context/GlobleContext'
import React, { useEffect, useState } from 'react'

import icon1 from '../../../public/contact-icon1.png';
import icon2 from '../../../public/contact-icon2.png';
import icon3 from '../../../public/contact-icon3.png';
import { toast } from 'react-toastify'
import axiosInstance from '@/lib/axios'
import { set } from 'mongoose'
import LoadingScreen from '@/component/LoadingScreen'

// import Details from '../programs/details/[id]/page';
// import Image from 'next/image'

const info = [
    {   
        color:"#00874F",
        name: "Address Main Campus",
        icon:icon3,
        details: ["16-B, Old Jamrud Road University Town, Peshawar, Pakistan"]
    },
    {
        color:"#177faa",
        name: "Contact info",
        icon:icon2,
        details: ["Mobile: +92 333 9118828" , "Mail: info@jkdpakistan.org "]
    },
    {
        color:"#e98b28",
        name: "Work timer",
        icon:icon1,
        details: [ "Days: Monday - Saturday","Time: 09:00 am - 05:00 pm" ]    
    }
];

const ContactUs = () => {

    const {state} = useGlobal();
    const {theme} = state;
    const [contactForm , setContactForm] = useState({
        userName:'',
        email:'',
        phoneNumber:'',
        subject:'',
        message:''
    });
    const [loading , setLoading] = useState(false)

    const handleChange = (event)=>{
        const { value , name } = event.target;
        setContactForm((preValue)=>{
            return {
                ...preValue,
                [name]:value,
            }
        })
    }

const handleSubmit = async (e) => {
  e.preventDefault()

    setLoading(true);

  try {
    const response = await axiosInstance.post("/api/contact", contactForm);
    console.log(response);
    const data = response.data;

    toast.success(data.message || "Email Send Successfully");

    // router.push("/admin"  );
  } catch (err) {
    console.error(err);
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

  const heroBg = '/mediaUpdates.png'


  return (
    <div className={`min-h-screen w-full flex flex-col justify-between ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
        <Header />
  {/* Hero Section */}
            <section
                className="relative overflow-hidden bg-cover bg-center md:py-16 py-10"
                style={{ backgroundImage: `url(${heroBg})` }}
            >
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
                    <h1 className="text-[18px] md:text-[40px] font-bold text-white">
                     Contact Us
                    </h1>
                    <p className="mt-4 text-lg text-white/85">
                      Get in touch with us for inquiries, support, or collaboration opportunities.
                    </p>
                </div>
            </section>
        <main className="w-full flex-1 ">
            <section className="w-full flex justify-center px-4 py-10 md:py-14">
                <div className="w-full max-w-6xl">
                    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
                        <div className={`rounded-xs border-2 bg-white px-5  shadow-[0_10px_30px_rgba(0,0,0,0.08)] md:p-10 ${theme === 'dark' ? 'border-[#177eaa66] bg-[#0a0a0a]' : 'border-gray-600'}`}>
                            <h3 className="mx-auto max-w-xl text-center text-[20px] font-semibold leading-snug text-[#1f2937] md:text-[22px] lg:text-[24px]">
                                Reach out to us by filling out the form below, and we’ll be in touch soon.
                            </h3>

                            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor='usrName' className="text-sm font-semibold text-[#374151]">User Name</label>
                                    <input name='userName' value={contactForm.userName} onChange={handleChange} type='text' id='usrName' placeholder='user name' className={`w-full rounded border-2 border-blue-100 px-3 py-2 text-sm outline-none transition focus:border-[#00874F] ${theme === 'dark' ? 'border-[#177eaa94] bg-black text-white' : 'bg-white border-[#d8e6df] text-black'}`} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor='email' className="text-sm font-semibold text-[#374151]" >Emails</label>
                                    <input name='email' value={contactForm.email} onChange={handleChange} type='email' id='email' placeholder='email' className={`w-full rounded border-2 border-blue-100 px-3 py-2 text-sm outline-none transition focus:border-[#00874F] ${theme === 'dark' ? 'border-[#177eaa94] bg-black text-white' : 'bg-white border-[#d8e6df] text-black'}`} required />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor='number' className="text-sm font-semibold text-[#374151]" >Phone Number</label>
                                    <input name='phoneNumber' value={contactForm.phoneNumber} onChange={handleChange} type='number' id='number' placeholder='phone number' className={`w-full rounded border-2 border-blue-100 px-3 py-2 text-sm outline-none transition focus:border-[#00874F] ${theme === 'dark' ? 'border-[#177eaa94] bg-black text-white' : 'bg-white border-[#d8e6df] text-black'}`} required />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor='subject' className="text-sm font-semibold text-[#374151]">Subject</label>
                                    <input name='subject' value={contactForm.subject} onChange={handleChange} type='text' id='subject' placeholder='subject' className={`w-full rounded border-2 border-blue-100 px-3 py-2 text-sm outline-none transition focus:border-[#00874F] ${theme === 'dark' ? 'border-[#177eaa94] bg-black text-white' : 'bg-white border-[#d8e6df] text-black'}`} required />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor='message' className="text-sm font-semibold text-[#374151]">Message</label>
                                    <textarea name='message' value={contactForm.message} onChange={handleChange} rows={6} id='message' className={`w-full rounded border-2 border-blue-100 px-3 py-2 text-sm outline-none transition focus:border-[#00874F] ${theme === 'dark' ? 'border-[#177eaa94] bg-black text-white' : 'bg-white border-[#d8e6df] text-black'}`} required />
                                </div>

                                <div>
                                    <button type='submit' className={`rounded px-4 cursor-pointer py-2 text-sm font-medium text-white transition ${theme === 'light' ? 'bg-[#2f8f57] hover:bg-[#1f7b46]' : 'bg-[#177faa] hover:bg-[#0e5f86]'}`}>
                                        {loading ? 'sending ...' : 'send'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="flex flex-col gap-4">
                            {info?.map((details, index) => (
                                <div key={index} className={`rounded-xs border-2 border-gray-700 bg-white px-6  py-7 text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)] ${theme === 'dark' ? 'border-[#177eaa66] bg-[#0a0a0a]' : 'border-[#d7e7df]'}`}>
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center ">
                                        <div
                                            className="h-14 w-14"
                                            style={{
                                                WebkitMaskImage: `url(${details.icon.src})`,
                                                WebkitMaskRepeat: 'no-repeat',
                                                WebkitMaskPosition: 'center',
                                                WebkitMaskSize: 'contain',
                                                maskImage: `url(${details.icon.src})`,
                                                maskRepeat: 'no-repeat',
                                                maskPosition: 'center',
                                                maskSize: 'contain',
                                                backgroundColor: details.color,
                                            }}
                                        />
                                    </div>
                                    <h3 className="text-[18px] font-semibold text-[#111827] md:text-[20px]">{details.name}</h3>
                                    <div className="mt-3 space-y-1">
                                        {details?.details?.map((text, detailIndex) => (
                                            <p key={detailIndex} className={`text-base leading-relaxed ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                                                {text}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <Footer />
    </div>
  )
}

export default ContactUs