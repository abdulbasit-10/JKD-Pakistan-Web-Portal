import React, { useState } from 'react'
import Image from 'next/image'
import { useGlobal } from '@/context/GlobleContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faLeaf, faUsers, faBalanceScale, faFlask, faHandshake, faLandmark, faArrowCircleDown ,faArrowCircleUp ,faArrowDown , faArrowUp } from '@fortawesome/free-solid-svg-icons'

const JKD = () => {
    // const {theme} = useGlobal()
    const theme = "dark";
    const [toggle , setToggle] = useState({
        vision:false,
        mission:false,
        value:false,
    })

    const handleToggle = (key)=>{
        setToggle((preVal)=>{
            return {
                ...preVal,
                [key] : !toggle[key],
            }
        })
    }

  return (
    <section className={`bg-[#4A709F33] text-black w-full flex flex-col items-center my-6 sm:my-8 md:my-10 py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8`}>
        <div className='w-full max-w-[1200px]'>
            <div className='flex flex-col lg:flex-row items-start gap-4 sm:gap-5'>
                {/* left side */}
                <div className='flex flex-col gap-2 w-full h-[326px] lg:w-[50%] bg-[#00874F] rounded p-4 sm:p-5 text-white'>
                    <h3 className='text-xl sm:text-2xl md:text-[28px] lg:text-[30px] font-semibold'>WORLD CLASS <span>FACILITIES </span></h3>
                    <p className='text-sm sm:text-base text-start'>JKD Pakistan equips individuals with quality training, developing skilled professionals ready to lead globally.</p>
                    <ul className='list-disc ml-4 sm:ml-6 pt-1 text-sm sm:text-base space-y-1'>
                        <li>Our programs follow global standards, providing learners with practical, real-world skills.</li>
                        <li>A modern setup with advanced tools and digital resources for hands-on learning.</li>
                        <li>Learn from certified, experienced instructors dedicated to your success.</li>
                    </ul>
                </div>
                {/* right side */}
                <div className='w-full lg:w-[50%] flex flex-col justify-center gap-4 sm:gap-5 text-black bg-[#005f88] p-4 sm:p-5 py-8 sm:py-10 md:py-12 lg:py-[52px] rounded'>   
                    {/* our vision */}
                    <div className='p-3 sm:p-4 w-full rounded bg-white'>
                        <button className='cursor-pointer w-full text-left flex items-center' onClick={() => handleToggle("vision")} aria-expanded={toggle.vision}>
                            <FontAwesomeIcon className={`text-base sm:text-lg md:text-[20px] transition-transform duration-500 ${toggle.vision ? "text-[#eb6b19]" : "text-black"}`} icon={toggle.vision ? faArrowCircleUp : faArrowCircleDown} />
                            <span className={`${toggle.vision ? "text-[#eb6b19]" : "text-black"} ml-3 sm:ml-5 font-semibold text-base sm:text-lg md:text-[18px]`}>Our Vision</span>
                        </button>
                        <div 
                            className={`transition-all duration-500 ease-in-out overflow-hidden ${toggle.vision ? 'max-h-96' : 'max-h-0'}`}
                            aria-hidden={!toggle.vision}
                        >
                            <p className={`${theme === 'light' ? 'text-gray-700' : ''} text-justify pt-2 sm:pt-3 md:pt-4 text-sm sm:text-base`}>To uplift and empower under-served communities through innovative and sustainable initiatives in vocational training, skill development, sustainable tourism, sports for development, health-care, and organizing events that promote social causes, community cohesion, and cultural exchange</p> 
                        </div>
                    </div>
                    {/* our mission */}
                    <div className='w-full p-3 sm:p-4 bg-white rounded'>
                        <button
                         onClick={() => handleToggle("mission")}
                         className="cursor-pointer flex items-center w-full"
                        >
                                <FontAwesomeIcon
                                    className={`text-base sm:text-lg md:text-[20px] transition-transform duration-500 ${
                                    toggle.mission ? "text-[#eb6b19]" : "text-black"
                                    }`}
                                    icon={toggle.mission ? faArrowCircleUp : faArrowCircleDown}
                                />
                                <span
                                className={`ml-3 sm:ml-5 font-semibold text-base sm:text-lg md:text-[18px] ${
                                toggle.mission ? "text-[#eb6b19]" : "text-black"
                                }`}
                            >
                                Our Mission
                                </span>
                        </button>
                            <div 
                            className={`transition-all duration-500 ease-in-out overflow-hidden ${toggle.mission ? 'max-h-96' : 'max-h-0'}`}
                            aria-hidden={!toggle.mission}
                            >
                            <p className='pt-2 md:pt-4 text-sm sm:text-base'>Empowering the under-served communities by creating sustainable economic opportunities</p>
                        </div>
                        
                    </div>
                    {/* our values */}
                    <div className='p-3 sm:p-4 rounded bg-white'>
                            <button onClick={() => handleToggle("value")} className="cursor-pointer flex items-center"><FontAwesomeIcon className={`text-base sm:text-lg md:text-[20px] ${toggle.value ? "text-[#eb6b19]" : "text-black"}`} icon={toggle.value ? faArrowCircleUp : faArrowCircleDown} /><span className={`ml-3 sm:ml-5 font-semibold text-base sm:text-lg md:text-[18px] ${toggle.value ? "text-[#eb6b19]" : "text-black"}`}>Our Values</span>
                            </button>
                            <ul className={`transition-all duration-500 ease-in-out overflow-hidden text-sm sm:text-base ${toggle.value ? 'max-h-[600px]' : 'max-h-0'}`}
                                aria-hidden={!toggle.value}>
                                <li className="pt-3 sm:pt-4 flex items-start gap-2 sm:gap-3 mb-2">
                                    {/* <FontAwesomeIcon icon={faLightbulb} className="text-yellow-500 text-xl " /> */}
                                    <p>
                                    <span className={`font-semibold `}>Empowerment:</span> Unlocking potential through skills and resources.
                                    </p>
                                </li>

                                <li className="flex items-start gap-2 sm:gap-3 mb-2">
                                    <p>
                                    <span className='font-semibold'>Sustainability:</span> Fostering growth that benefits present and future generations.
                                    </p>
                                </li>

                                <li className="flex items-start gap-2 sm:gap-3 mb-2">
                                    <p>
                                    <span className='font-semibold'>Inclusive:</span> Promoting equality and accessibility for all.
                                    </p>
                                </li>

                                <li className="flex items-start gap-2 sm:gap-3 mb-2">
                                    <p>
                                    <span className='font-semibold'>Integrity:</span> Upholding transparency, accountability, and ethical conduct.
                                    </p>
                                </li>

                                <li className="flex items-start gap-2 sm:gap-3 mb-2">
                                    <p>
                                    <span className='font-semibold'>Innovation:</span> Embracing creative solutions to social challenges.
                                    </p>
                                </li>

                                <li className="flex items-start gap-2 sm:gap-3 mb-2">
                                    <p>
                                    <span className='font-semibold'>Collaboration:</span> Partnering for collective impact.
                                    </p>
                                </li>
                                

                                <li className="flex items-start gap-2 sm:gap-3 mb-2">
                                    <p>
                                    <span className={`font-semibold `}>Respect for Culture:</span> Honoring and preserving cultural heritage.
                                    </p>
                                </li>
                        </ul>
                            {/* </div> */}
                    </div>
                </div>
            </div>


            {/* <div className='flex  w-full  gap-5 pt-5 md:pt-0'>
                    <div className='w-[50%] flex flex-col gap-5'>
                        <div className={`w-full p-4 rounded self-start border-2 ${theme === 'dark' ? 'bg-black' : 'bg-white'} border-[#00874F] `}>
                            <h3 className=' text-[30px]  font-semibold '>Mssion</h3>
                            <p className={` pt-2 md:pt-4 ${theme === 'light' ? ' text-gray-700 ':'text-white'}`}>Empowering the under-served communities by creating sustainable economic opportunities</p>
                    </div>
                    <div className={`w-full p-4 rounded self-center border-2 ${theme === 'dark' ? 'bg-black' : 'bg-white'} border-[#177faa] `}>                
                            <h3 className='text-[30px] font-semibold'>Vision</h3>
                            <p className={`${theme === 'light' ? ' text-gray-700 ':'text-white'}  text-justify pt-2 md:pt-4`}>To uplift and empower under-served communities through innovative and sustainable initiatives in vocational training, skill development, sustainable tourism, sports for development, health-care, and organizing events that promote social causes, community cohesion, and cultural exchange</p> 
                        </div>
                    </div>
                    <div className={`w-[50%] p-4 rounded   border-2 ${theme === 'dark' ? 'bg-black' : 'bg-white'} border-[#e98b28] `}>                
                    <h3 className='text-[30px] font-semibold pt-4 md:pt-0  '>Values</h3>
                    <ul className={`${theme === 'light' ? 'text-gray-700' : 'text-white'} space-y-4 px-2 pt-2 md:pt-4`}>
                    <li className="flex items-center gap-3 mb-1 ">
                        <FontAwesomeIcon icon={faLightbulb} className="text-yellow-500 text-xl " />
                        <p>
                        <span className={`font-semibold ${theme === 'light' ? 'text-black' : 'text-white'}`}>Empowerment:</span> Unlocking potential through skills and resources.
                        </p>
                    </li>

                    <li className="flex items-center gap-3 mb-1 ">
                        <FontAwesomeIcon icon={faLeaf} className="text-green-600 text-xl " />
                        <p>
                        <span className={`font-semibold ${theme === 'light' ? 'text-black' : 'text-white'}`}>Sustainability:</span> Fostering growth that benefits present and future generations.
                        </p>
                    </li>

                    <li className="flex items-center gap-3 mb-1 ">
                        <FontAwesomeIcon icon={faUsers} className="text-blue-500 text-xl " />
                        <p>
                        <span className={`font-semibold ${theme === 'light' ? 'text-black' : 'text-white'}`}>Inclusive:</span> Promoting equality and accessibility for all.
                        </p>
                    </li>

                    <li className="flex items-center gap-3 mb-1 ">
                        <FontAwesomeIcon icon={faBalanceScale} className="text-gray-600 text-xl " />
                        <p>
                        <span className={`font-semibold ${theme === 'light' ? 'text-black' : 'text-white'}`}>Integrity:</span> Upholding transparency, accountability, and ethical conduct.
                        </p>
                    </li>

                    <li className="flex items-center gap-3 mb-1 ">
                        <FontAwesomeIcon icon={faFlask} className="text-purple-500 text-xl " />
                        <p>
                        <span className={`font-semibold ${theme === 'light' ? 'text-black' : 'text-white'}`}>Innovation:</span> Embracing creative solutions to social challenges.
                        </p>
                    </li>

                    <li className="flex items-center gap-3 mb-1 ">
                        <FontAwesomeIcon icon={faHandshake} className="text-orange-500 text-xl " />
                        <p>
                        <span className={`font-semibold ${theme === 'light' ? 'text-black' : 'text-white'}`}>Collaboration:</span> Partnering for collective impact.
                        </p>
                    </li>
                    

                    <li className="flex items-center gap-3 mb-1 ">
                        <FontAwesomeIcon icon={faLandmark} className="text-red-500 text-xl " />
                        <p>
                        <span className={`font-semibold ${theme === 'light' ? 'text-black' : 'text-white'}`}>Respect for Culture:</span> Honoring and preserving cultural heritage.
                        </p>
                    </li>
                    </ul>

                    </div>

            </div> */}

        </div>
    </section>
  )
}

export default JKD
















            {/* show image for extra small and small screen */}
            // <div className='block md:hidden w-full md:w-[60%] h-[350px]'>
            //     <Image src={jkd} alt='jkd' className=' rounded-2xl h-full w-full relative object-cover' />
            // </div>
            // <div className='flex flex-col md:flex-row items-center gap-5 pt-5 md:pt-0'>
            //     <div className='w-full md:w-[40%]'>
            //         <h2 className='text-[35px] font-semibold'>JKD </h2>
            //         <p className={` text-justify ${theme === 'light' ? ' text-gray-700 ':'text-white'} pt-2 md:pt-4`}>JKD Pakistan is a dynamic organization dedicated to empowering marginalized & under-served communities through sustainable economic opportunities and social development. Through its diverse and innovative programs and services, JKD Pakistan bridges the gap for vulnerable generations, ensuring equal access to opportunities and cultivating resilient communities for a brighter future.</p>
            //         <h3 className=' text-[30px]  font-semibold pt-4'>Mssion</h3>
            //         <p className={` pt-2 md:pt-4 ${theme === 'light' ? ' text-gray-700 ':'text-white'}`}>Empowering the under-served communities by creating sustainable economic opportunities</p>
            //     </div>
            //     {/* show image for medium and large screen */}
            //     <div className='hidden md:block w-[60%] h-[350px]'>
            //         <Image src={jkd} alt='jkd' className=' rounded-2xl h-full w-full relative object-cover' />
            //     </div>
            // </div>
            // <div className=' md:flex gap-5 pt-4 md:pt-5'>
            //         {/* <div className='w-[60%] h-full'>
            //             <Image src={jkd2} alt='jkd' className=' rounded-2xl h-[500px] w-full relative object-cover' />
            //         </div> */}
            //         <div className='w-full md:w-[40%]'>                
            //             <h3 className='text-[30px] font-semibold'>Vision</h3>
            //             <p className={`${theme === 'light' ? ' text-gray-700 ':'text-white'}  text-justify pt-2 md:pt-4`}>To uplift and empower under-served communities through innovative and sustainable initiatives in vocational training, skill development, sustainable tourism, sports for development, health-care, and organizing events that promote social causes, community cohesion, and cultural exchange</p> 
            //         </div>
            //         <div className='w-full md:w-[60%] h-full '>
            //             <h3 className='text-[30px] font-semibold pt-4 md:pt-0  '>Values</h3>
            //             <ul className={`${theme === 'light' ? ' text-gray-700 ':'text-white'} pt-2 md:pt-4 `}>
            //                 <li><span className={`font-semibold ${theme === 'light' ? 'text-black' : 'text-white'}`}>Empowerment: </span>    Unlocking potential through skills and resources.</li>
            //                 <li><span className={`font-semibold ${theme === 'light' ? 'text-black' : 'text-white'}`}>Sustainability: </span>    Fostering growth that benefits present and future generations.</li>
            //                 <li><span className={`font-semibold ${theme === 'light' ? 'text-black' : 'text-white'}`}>Inclusive: </span>    Promoting equality and accessibility for all.</li>
            //                 <li><span className={`font-semibold ${theme === 'light' ? 'text-black' : 'text-white'}`}>Integrity: </span>    Upholding transparency, accountability, and ethical conduct.</li>
            //                 <li><span className={`font-semibold ${theme === 'light' ? 'text-black' : 'text-white'}`}>Innovation: </span>    Embracing creative solutions to social challenges.</li>
            //                 {/* <li><span className='font-semibold text-black'>Collaboration:</span> Partnering for collective impact.</li>
            //                 <li><span className='font-semibold text-black'>Respect for Culture:</span> Honoring and preserving cultural heritage.</li> */}
            //             </ul>
            //         </div>
            // </div>