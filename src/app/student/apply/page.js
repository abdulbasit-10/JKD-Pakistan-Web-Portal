"use client"
import Header from "@/component/Header"
import Footer from "@/component/Footer"
import Image from "next/image"
import image1 from '../../../../public/image1.jpg'
import image2 from '../../../../public/image2.jpg'
import image3 from '../../../../public/image3.jpg'
import Link from "next/link"
import { useEffect, useState } from "react"
import LoadingScreen from "@/component/LoadingScreen"
import StudentLeftSidebar from "@/component/studentLeftSidebar"


const Apply = () => {
    const cards = [
    {
        name:"TEVET",
        image:image2,
        path:"/student/apply/tevet"
    },
    {
        name:"IT Program",
        image:image3,
        path:"/student/apply/it-program"
    },
    // {
    //     name:"Uplift Events",
    //     image:image1,
    //     path:"/student/apply/events/upleft-events"
    // },
];

const [screenLoading, setScreenLoading] = useState(true);

useEffect(() => {
const timer = setTimeout(() => {
    setScreenLoading(false);
}, 500);

return () => clearTimeout(timer);
}, []);

  if (screenLoading) return <LoadingScreen />;
  return (
      <div className={` h-screen w-full flex   justify-between `}>
        <StudentLeftSidebar className="w-[20%]" />
        {/* <Header /> */}
        {/* lift side */}
        <div className="relative pb-10 w-full h-full self-center ">            
            <div className=' flex justify-between items-center px-10 h-[100px] ' >
                <h1 className="text-4xl font-extrabold text-gray-800">Courses</h1>
            </div>
            {
                cards.map((card,index) => {
                    return (
                        <li key={index} className="mx-10 py-2 list-decimal list-inside">
                        <Link  href={card.path}  className="px-10   font-bold cursor-pointer w-[100%] hover:shadow-[0px_0px_10px_rgba(0,0,0,0.25)] p-2 ">
                            {/* <Image  src={card.image}  className="object-cover w-full h-[150px] rounded" alt="image" /> */}
                            {card.name} 
                            {/* <Link href={card.path} className="w-[100%] px-[131px] py-2 bg-[#00874F] text-white rounded">Apply Now</Link> */}
                        </Link>
                        </li>
                    )
                })    
            }
        </div>
        {/* <Footer /> */}
      </div>
  )
}

export default Apply