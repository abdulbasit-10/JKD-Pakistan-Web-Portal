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




const Apply = () => {
    const cards = [
    {
        name:"TEVET",
        image:image2,
        path:"/apply/course/tevet"
    },
    {
        name:"IT Program",
        image:image3,
        path:"/apply/course/it-program"
    },
    {
        name:"Uplift Events",
        image:image1,
        path:"/apply/course/events/upleft-events"
    },
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
      <div className={` h-screen w-full flex flex-col  justify-between `}>
        <Header />
        {/* lift side */}
        <div className="relative mt-20 flex justify-between items-center pb-10 max-w-[1200px] self-center py-10 ">
            {
                cards.map((card,index) => {
                    return (
                        <div key={index} className="w-[30%] hover:shadow-[0px_0px_10px_rgba(0,0,0,0.25)] p-2 ">
                            <Image  src={card.image}  className="object-cover w-full h-[300px] rounded" alt="image" />
                            <h4 className="text-center font-bold py-3">{card.name} </h4>
                            <Link href={card.path} className="w-[100%] px-[131px] py-2 bg-[#00874F] text-white rounded">Apply Now</Link>
                        </div>
                    )
                })    
            }
        </div>
        <Footer />
      </div>
  )
}

export default Apply