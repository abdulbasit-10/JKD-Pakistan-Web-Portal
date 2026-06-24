"use client"
import Footer from "@/component/Footer";
import Header from "@/component/Header";
import { useGlobal } from "@/context/GlobleContext";
import { useEffect, useState } from "react";
import HeroSection from "@/component/HeroSection";
import Programs from "@/component/Programs";
import Partners from "@/component/Partners";
import WorkHistory from "@/component/WorkHistory";
import Testimonel from "@/component/Testimonel";
import JKD from "../component/JKD";
import KickstartCarrer from "@/component/KickstartCarrer";
import LoadingScreen from "@/component/LoadingScreen";
import NewsPopup from "@/component/NewsPopup";
import Link from "next/link";

export default function Home() {
  const {state} = useGlobal();
  const {theme} = state;
  const [loading, setLoading] = useState(true);
  const [showNewsPopup, setShowNewsPopup] = useState(false);
  // const [job , setJob] = useState(true)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      // Show news popup after page loads
      setShowNewsPopup(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;
  return (
    < div className="min-h-screen w-full flex flex-col overflow-x-hidden">
      <Header />
      <NewsPopup isOpen={showNewsPopup} onClose={() => setShowNewsPopup(false)} />
      {/* {
        job &&
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg  p-8 w-[90%] py-5 max-w-[600px] relative flex flex-col justify-center">
            <button onClick={() => dispatch({type : 'JOB' , payload : false})} className="cursor-pointer absolute top-4 right-6 text-xl text-[red]">
              ✕
            </button>
            <h2 className="text-[1.75rem] text-center font-bold mb-4 text-gray-900">
              Ready to Apply?           
              </h2>
            <h3 className="text-[18px] text-center  mb-4 text-gray-500">
              Find Your Next Career Move Today!           
            </h3>
            <p className="text-center text-md text-gray-800 mb-6">
              join the Future Career Network , your gateway to innovative companies and thousands of open position and submit your  application in just minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={'apply/job'} className="bg-[#177faa] text-white px-5 py-2 rounded-lg cursor-pointer ">
                See All Open Jobs Now
              </Link>
              <button className="border border-blue-600 text-blue-600 px-5 py-2 rounded-lg hover:bg-blue-50">
                Create Profile
              </button>
            </div>
            <p className="text-sm text-center py-3 text-gray-500">
              Future Carrer Network
            </p>
          </div>
        </div>
      } */}
      <div className={` flex flex-col items-center w-full`}>
        <HeroSection />
        <WorkHistory />
        {/* <JkdPIcs /> */}
        {/* <About /> */}
        <div className={`bg-white w-full flex flex-col items-center py-8 overflow-x-hidden`}>
          <p className='text-[20px] sm:text-[24px] font-semibold p-1 rounded-2xl px-6 sm:px-8 text-white bg-[#D08348]'>WHO WE ARE</p>
          <div className='w-full max-w-[1100px] px-4 sm:px-8'>
            {/* <h2 className='text-[34px] sm:text-[48px] lg:text-[60px] text-center font-bold text-[#4A709F]'>About <span className={`text-[#D08348]`}>JKD Pakistan</span></h2> */}
            <p className={`text-center ${theme === 'dark' ? '' : 'text-gray-800'} pt-4 text-[18px] sm:text-[20px] px-2 sm:px-6 md:px-10`} >A nationally approved Training Institute and Events, Sports & Tourism Services Hub, delivering skills development, tourism & travel services, sports development programs, business incubation, community uplift events, and overseas employment opportunities.</p>
          </div>
        </div>
        <JKD />
        {/* <div className={`bg-[#D9E3E0] w-full flex flex-col items-center mb-10 py-10`}>
          <div className='max-w-[950px] px-8'>
            <h2 className='text-[35px] text-center font-semibold '>Who We <span className={` ${theme === 'dark' ? 'text-[#177faa]' : 'text-[#00874F]'}`}>Are?</span></h2>
            <p className={` text-center  ${theme === 'dark' ? '' : 'text-gray-700'} pt-4`} >JKD Pakistan is a dynamic organization dedicated to empowering marginalized & under served communities through sustainable economic opportunities and social development. Through its diverse and innovative programs and services, JKD Pakistan bridges the gap for vulnerable generations, ensuring equal access to opportunities and cultivating resilient communities for a brighter future.</p>
          </div>
        </div>
        <KickstartCarrer /> */}
        <Programs />
        <Partners />
        <Testimonel />
      </div>  
      <Footer />
    </div>
  );
}
