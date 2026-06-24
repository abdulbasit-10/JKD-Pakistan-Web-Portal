// "use client"
// import Header from "@/component/Header"
// import Footer from "@/component/Footer"
// import Link from "next/link"
// import { useEffect, useState } from "react"
// import LoadingScreen from "@/component/LoadingScreen"
// import { CiLocationOn } from "react-icons/ci";
// import Image from "next/image"


// const Apply = () => {
//     const cards = [
//     {
//         name:"English Teacher",
//         path:"/apply/job/english-teacher",
//         summary:"Join our academic team to deliver engaging lessons and develop strong language skills through effective and interactive teaching methods.",
//         experience:"3+ years"
//     },
//     {
//         name:"IT Mentor",
//         path:"/apply/job/it-mentor",
//         summary:"Join our team to guide and mentor learners in developing practical IT skills, fostering problem-solving abilities, and supporting their technical growth.",
//         experience:"4+ years"
//     },
//     {
//         name:"Video Editor",
//         path:"/apply/job/video-editor",
//         summary:"Join our creative team to craft compelling visual content by editing high-quality videos for digital platforms and storytelling experiences.",
//         experience:"3+ years"
//     },
// ];

// const [screenLoading, setScreenLoading] = useState(true);

// useEffect(() => {
// const timer = setTimeout(() => {
//     setScreenLoading(false);
// }, 500);

// return () => clearTimeout(timer);
// }, []);

//   if (screenLoading) return <LoadingScreen />;
//   return (
//       <div className={`min-h-screen w-full flex flex-col justify-between`}>
//         <Header />
//         <main className="w-full  py-10 sm:py-12">
//             <div className="mx-auto w-full max-w-[1160px] px-4 sm:px-6">
//                 <div className="space-y-5">
//                     {cards.map((card, index) => {
//                         return (
//                             <article key={index} className="rounded-2xl border-2 border-gray-300 p-5 shadow-[0_1px_1px_rgba(15,23,42,0.06)] sm:p-6">
//                                 <div className="flex h-full flex-col gap-5">
//                                     <div className="w-full">
//                                         <h3 className="text-[32px] font-semibold leading-tight text-[#1a2330]">{card.name}</h3>

//                                         <div className="mt-3 flex flex-wrap gap-2 text-[13px] text-[#6b7280]">
//                                             <span className="rounded-full bg-[#e7ebf0] px-3 py-1">Onsite</span>
//                                             <span className="rounded-full bg-[#e7ebf0] px-3 py-1">Full-time</span>
//                                         </div>

//                                         <p className="mt-4 text-[16px] max-w-4xl leading-relaxed text-[#4b5563]">{card.summary}</p>

//                                         <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//                                             <div className="flex flex-wrap gap-5 text-[13px] text-[#6b7280]">
//                                             <span className="inline-flex items-center gap-2">
//                                                 {/* <span aria-hidden="true">&#128205;</span> */}
//                                                 <CiLocationOn size={16} className="text-black"/>

//                                                 <span>Peshawar</span>
//                                             </span>
//                                             <span className="inline-flex items-center gap-2">
//                                                 {/* <span aria-hidden="true">&#128188;</span> */}
//                                                 <Image 
//                                                 src="/experienceIcon.svg"
//                                                 alt="Experience Icon"
//                                                 width={16}
//                                                 height={16}
//                                                 />
//                                                 {/* <img src="/experience-icon.png" alt="Experience Icon" className="h-4 w-4" />     */}
//                                                 <span>{card.experience}</span>
//                                             </span>
//                                         </div>

//                                             <Link href={card.path} className="inline-flex h-11 min-w-[145px] items-center justify-center self-start rounded-lg bg-[#4f8658] px-6 text-[15px] font-medium text-white transition hover:bg-[#3f7048] sm:self-auto">
//                                                 Apply Now
//                                             </Link>
//                                         </div>
//                                     </div>

//                                 </div>
//                             </article>
//                         )
//                     })}
//                 </div>
//             </div>
//         </main>
//         <Footer />
//       </div>
//   )
// }

// export default Apply




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

const itProgram = ["MERN Stack", "MEAN Stack", "Flutter ", "React Native", "UI/UX Design", "Graphic Design",];
const tevet = ["Plumber & Pipe Fabricator Course", "Tile Fixer", "Plasterer", "Steel Fixer", "Carpenter", "Building Electrician", "Industrial Electrician", "Fiber Optics Technician", "Solar System Technician", "CCTV Technician", "Front Office Manager", "Professional Cook", "Fast Food Expert", "Housekeeing", "Tour Operator", "Domestic Skilled Worker", "Welder", "HVACR Technician", "Lift Operator", , "Arena Football", "Football", "Badminton", "Table Tennis", "Fitness Club", "Cricket"]

const Apply = () => {
    const { id } = useParams();
    const appliedPositionOptions = ["English Teacher", "IT Mentor", "Video Editor"];
    //   const {theme} = useGlobal();
    const theme = 'light';
    const [progm, setProgm] = useState(null);
    const router = useRouter();
    const [applyForm, setApplyForm] = useState({
        fullName: '',
        email: '',
        contactNumber: '',
        location: '',
        currentJobTitle: '',
        appliedPosition: appliedPositionOptions[0],
        totalExperience: '',
        resume: '',
        linkedinProfile: '',
        portfolio: '',
        coverLetter: ''
    })
    const [loading, setLoading] = useState(false);
    const [isDraggingResume, setIsDraggingResume] = useState(false);
    const fieldClassName = 'text-sm md:text-base border rounded border-gray-400 p-2 outline-none text-black placeholder:text-gray-300 bg-white';

    const handleChange = (event) => {
        event.preventDefault()
        const { value, name, files } = event.target;
        if (files) {
            return setApplyForm((preValue) => {
                return {
                    ...preValue,
                    [name]: files[0]
                }
            })
        }

        setApplyForm((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })

    }



    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData();
        for (let field in applyForm) {
            formData.append(field, applyForm[field]);
        }
        console.log(applyForm)
        //   const {firstName,lastName,email,dateOfBirth,phoneNumber,address,CNIC,parentCNIC,age,gender,program,subProgram} = applyForm;

        setLoading(true);
        try {
            const response = await axiosInstance.post("/api/apply/job", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            console.log(response);
            const data = response.data;

            setApplyForm({
                fullName: '',
                email: '',
                contactNumber: '',
                location: '',
                currentJobTitle: '',
                appliedPosition: appliedPositionOptions[0],
                totalExperience: '',
                resume: '',
                linkedinProfile: '',
                portfolio: '',
                coverLetter: ''
            });
            toast.success(      data.message || "Login successful");

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

    const handleResumeDrop = (event) => {
        event.preventDefault();
        setIsDraggingResume(false);
        const file = event.dataTransfer?.files?.[0];
        if (!file) return;
        setApplyForm((prev) => ({ ...prev, resume: file }));
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setScreenLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (screenLoading) return <LoadingScreen />;
   const heroBg = '/mediaUpdates.png'

    return (
        <div className={` ${theme === 'light' ? 'bg-white text-black' : 'bg-[#080808] text-white'} flex  flex-col   w-full  `}>
            <Header />
             {/* Hero Section */}
            <section
                className="relative overflow-hidden bg-cover bg-center md:py-16 py-10"
                style={{ backgroundImage: `url(${heroBg})` }}
            >
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
                    <h1 className="text-[18px] md:text-[40px] font-bold text-white">
                       Jobs
                    </h1>
                    <p className="mt-4 text-lg text-white/85">
                        Explore current job openings and career opportunities at JKD Pakistan.
                    </p>
                </div>
            </section>
            {/* <AdminLeftSidebar className="w-[20%]" /> */}
            <form onSubmit={handleSubmit} className={`w-[95%] sm:w-[90%] lg:w-full flex flex-col items-center px-4 py-6 sm:px-6 sm:py-8 lg:p-10 mt-20 mb-20 max-w-5xl mx-auto rounded ${theme === 'light' ? 'bg-white' : 'bg-[#1a1a1a]'} border-2 border-gray-300`}>
                {/* <h1 className={`${theme === 'light' ? 'text-[#00874F]': 'text-[#177faa]'} text-start w-full  lg:text-[39px] lg:font-extrabold font-bold  `}>Regester</h1> */}
                <h3 className=' text-[17px] md:text-[21px] lg:text-[24px] font-bold w-full  '>
                    Basic Information
                </h3>
                {/* full name and email */}
                <div className='flex w-full flex-col gap-5 pt-8 md:flex-row'>
                    <div className='flex w-full flex-col gap-3 md:w-1/2'>
                        <label htmlFor="name" className='font-semibold text-sm md:text-lg '>Full Name <span className="text-white bg-[#dc3545] text-xs px-2 py-0.5 rounded">* Required</span></label>
                        <input id='name' type='text' name='fullName' onChange={handleChange} value={applyForm.fullName} placeholder='Name' className={fieldClassName} required />
                    </div>
                    <div className='flex w-full flex-col gap-3 md:w-1/2'>
                        <label htmlFor='fName' className='text-sm md:text-lg font-semibold'>Email <span className="text-white bg-[#dc3545] text-xs px-2 py-1 rounded">* Required</span></label>
                        <input id='fName' type='email' name='email' onChange={handleChange} value={applyForm.email} placeholder='Email' className={fieldClassName} required />
                    </div>
                </div>
                {/* contac number and location */}
                <div className='flex w-full flex-col gap-5 pt-5 md:flex-row'>
                    <div className='flex w-full flex-col gap-3 md:w-1/2'>
                        <label className='text-sm md:text-lg font-semibold'>Contact Number <span className="text-white bg-[#dc3545] text-xs px-2 py-0.5 rounded">* Required</span></label>
                        {/* <span className='text-gray-500 text-xs'>+92</span> */}
                        <input type='number' name='contactNumber' onChange={handleChange} value={applyForm.contactNumber} placeholder='Contact Number' className={fieldClassName} required />
                    </div>
                    <div className='flex w-full flex-col gap-3 md:w-1/2'>
                        <label className='text-sm md:text-lg font-semibold'>Location <span className="text-white bg-[#dc3545] text-xs px-2 py-0.5 rounded">* Required</span></label>
                        <input type='text' name='location' onChange={handleChange} value={applyForm.location} placeholder='Location' className={fieldClassName} required />
                    </div>
                </div>


                {/* Professional Details */}
                <h3 className=' text-[17px] md:text-[21px] lg:text-[24px] font-bold w-full  pt-10'>
                    Professional Details
                </h3>
                {/* current job and total experience */}
                <div className='flex w-full flex-col gap-5 pt-5 md:flex-row'>
                    <div className='flex w-full flex-col gap-3 md:w-1/2'>
                        <label className='text-sm md:text-lg font-semibold'>Current Job Title <span className="text-white bg-[#dc3545] text-xs px-2 py-0.5 rounded">* Required</span></label>
                        <input type='text' name='currentJobTitle' onChange={handleChange} value={applyForm.currentJobTitle} placeholder='Job ' className={fieldClassName} required />
                    </div>
                    <div className='flex w-full flex-col gap-3 md:w-1/2'>
                        <label className='text-sm md:text-lg font-semibold'>Total Expericence <span className="text-white bg-[#dc3545] text-xs px-2 py-0.5 rounded">* Required</span></label>
                        <input type='number' name='totalExperience' onChange={handleChange} value={applyForm.totalExperience} placeholder='Experience' className={fieldClassName} required />
                    </div>
                </div>
                <div className='flex w-full md:w-1/2 self-start flex-col gap-3 pt-5'>
                    <label className='text-sm md:text-lg font-semibold'>Applied Position <span className="text-white bg-[#dc3545] text-xs px-2 py-0.5 rounded">* Required</span></label>
                    <select
                        name='appliedPosition'
                        onChange={handleChange}
                        value={applyForm.appliedPosition}
                        className={fieldClassName}
                        required
                    >
                        {appliedPositionOptions.map((position) => (
                            <option key={position} value={position} className="border-t! border-gray-400">{position}</option>
                        ))}
                    </select>
                </div>
                {/* Resume */}
                <div className='flex w-full flex-col gap-3 pt-5'>
                    <label htmlFor='resume' className='text-sm md:text-lg font-semibold'>Resume <span className="text-white bg-[#dc3545] text-xs px-2 py-1 rounded">* Required</span></label>
                    <div
                        onDragOver={(event) => {
                            event.preventDefault();
                            setIsDraggingResume(true);
                        }}
                        onDragLeave={() => setIsDraggingResume(false)}
                        onDrop={handleResumeDrop}
                        className={`w-full rounded-xl border-2 border-dashed px-4 py-5 sm:px-6 sm:py-6 flex items-center justify-between gap-4 ${isDraggingResume ? 'border-[#3b82f6] bg-blue-50' : 'border-[#5d8cf566] bg-transparent'}`}
                    >
                        <div className='flex items-center gap-8  min-w-0'>
                            <div className='w-8 h-8 flex items-center justify-center text-[#222] shrink-0'>
                                <svg width="41" height="30" viewBox="0 0 41 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.54199 5C7.59851 5 6.83366 5.55964 6.83366 6.25V23.75C6.83366 24.4404 7.59851 25 8.54199 25H32.4587C33.4021 25 34.167 24.4404 34.167 23.75V6.25C34.167 5.55964 33.4021 5 32.4587 5H8.54199ZM3.41699 6.25C3.41699 4.17893 5.71153 2.5 8.54199 2.5H32.4587C35.2891 2.5 37.5837 4.17893 37.5837 6.25V23.75C37.5837 25.8211 35.2891 27.5 32.4587 27.5H8.54199C5.71153 27.5 3.41699 25.8211 3.41699 23.75V6.2 five" fill="black" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M14. five" fill="black" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M26. five" fill="black" />
                                </svg>

                            </div>
                            <div className='min-w-0 '>
                                <p className='text-[14px] sm:text-[15px] text-[#222] leading-5'>Drag And Drop Files Here Or Upload</p>
                                <p className='text-[12px] text-gray-500 leading-5'>Accepted file types: PNG, PDF</p>
                                {applyForm.resume && (
                                    <p className='text-[12px] text-[#4A709F] truncate'>Selected: {applyForm.resume.name}</p>
                                )}
                            </div>
                        </div>

                        <button
                            type='button'
                            onClick={() => document.getElementById('resume')?.click()}
                            className='shrink-0 rounded-md cursor-pointer bg-[#2e6f97] text-white text-[12px] font-medium px-4 py-2 hover:bg-[#245a7a] transition'
                        >
                            Upload 
                        </button>
                    </div>

                    <input
                        id='resume'
                        type='file'
                        name='resume'
                        onChange={handleChange}
                        accept='.png,.pdf'
                        className='hidden'
                        required
                    />
                </div>


                {/* Education
            <h3 className=' text-[17px] md:text-[21px] lg:text-[25px] font-semibold w-full  pt-10'>
                Education
            </h3>
             heighest Education / institute name / field of Study  
            <div className='flex w-full gap-5 pt-5'>
                <div className='flex flex-col gap-3  w-[50%]'>
                    <label className='text-sm md:text-base font-semibold'>Highest Education</label>
                    <input type='number' name='CNIC' onChange={handleChange} value={applyForm.CNIC} placeholder='without dashes' className={`$text-sm  md:text-base border ${theme === 'dark' ? 'border-[#177eaa94] bg-black' : 'bg-white border-[#00874f85]'} p-2 rounded  outline-none`} required />
                </div>
                <div className='flex flex-col gap-3  w-[50%]'>
                    <label className='text-sm md:text-base font-semibold'>Father / Mother CNIC</label>
                    <input type='number' name='parentsCNIC' onChange={handleChange} value={applyForm.parentsCNIC} placeholder='without dashes' className={`text-sm  md:text-base border ${theme === 'dark' ? 'border-[#177eaa94] bg-black' : 'bg-white border-[#00874f85]'} p-2 rounded  outline-none`} required />
                </div>
            </div> */}


                {/* Job Preferences */}
                {/* <h3 className=' text-[17px] md:text-[21px] lg:text-[25px] font-semibold w-full  pt-10'>
                Job Preferences
            </h3> */}
                {/* experience /  availability / preferred work type */}
                {/* <div className='flex w-full gap-5 pt-5'>
                <div className='flex flex-col gap-3  w-[33%]'>
                    <label className='text-sm md:text-base font-semibold'>Expected Salary (pkr)</label>
                    <input type='number' name='expectedSalary' onChange={handleChange} value={applyForm.expectedSalary} placeholder='salary' className={fieldClassName} required />
                </div>                
                <div className='flex flex-col gap-3  w-[33%]'>
                    <label className='text-sm md:text-base font-semibold'>Availability</label>
                    <select name='availability' onChange={handleChange} value={applyForm.availability} className={fieldClassName} required>
                        <option value="">choose</option>
                        <option value="Immediately">Immediately</option>
                        <option value="weak">1-2 weeks</option>
                        <option value="month">a month</option>
                    </select>                    
                </div>
                <div className='flex flex-col gap-3  w-[33%]'>
                    <label className='text-sm md:text-base font-semibold'>Preferred Work Type</label>
                    <select name='preferredWorkType' onChange={handleChange} value={applyForm.preferredWorkType} className={fieldClassName} required>
                        <option value="">choose</option>
                        <option value="Remote">Remote</option>
                        <option value="Onsite">Onsite</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>                    
                </div>
            </div> */}


                {/* optional */}
                <h3 className=' text-[17px] md:text-[21px] lg:text-[25px] font-semibold w-full  pt-10'>
                    Optional
                </h3>
                {/* current job and total experience */}
                <div className='flex w-full flex-col gap-5 pt-5 md:flex-row'>
                    <div className='flex w-full flex-col gap-3 md:w-1/2'>
                        <label className='text-sm md:text-lg font-semibold'>Linkedin Profile</label>
                        <input type='url' name='linkedinProfile' onChange={handleChange} value={applyForm.linkedinProfile} placeholder='linkedin profile url ' className={fieldClassName} />
                    </div>
                    <div className='flex w-full flex-col gap-3 md:w-1/2'>
                        <label className='text-sm md:text-lg font-semibold'>Portfolio</label>
                        <input type='url' name='portfolio' onChange={handleChange} value={applyForm.portfolio} placeholder='portfolio url' className={fieldClassName} />
                    </div>
                </div>
                {/* Resume */}
                <div className='flex w-full flex-col gap-3 pt-5'>
                    <label htmlFor='cLetter' className='text-sm md:text-lg font-semibold'>Cover Letter</label>
                    <textarea id='cLetter' name='coverLetter' rows={1} value={applyForm.coverLetter} onChange={handleChange} className={fieldClassName} placeholder='text' >
                    </textarea>
                </div>


                <div className='flex w-full items-center justify-center pt-10'>
                    <button type='submit' className={`w-full max-w-md px-4 py-3 rounded-lg ${theme === 'light' ? 'bg-[#4A709F] hover:text-white hover:bg-[#377cd0]' : 'hover:text-black hover:bg-white bg-[#177faa]'} transition cursor-pointer text-white text-sm md:text-[14px] lg:text-base `}>
                        {loading ? "Submiting..." : "Submit Form"}
                    </button>
                </div>
            </form>
            <Footer />
        </div>
    )
}

export default Apply