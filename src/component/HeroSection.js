// import React, { useEffect, useState } from 'react'
// import jkdPhoto from "../../public/jkd-front-photo.jpg"
// import { useGlobal } from '@/context/GlobleContext';
// import cardPic1 from "../../public/cardPic1.jpg"
// import cardPic2 from "../../public/cardPic2.jpg"
// import cardPic3 from "../../public/cardPic3.jpg"
// import cardPic4 from "../../public/cardPic4.jpg"
// import cardPic5 from "../../public/cardPic5.jpg"
// import Image from 'next/image';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// const HeroSection = () => {
//       const [translate , setTranslate] = useState(0);
//       console.log("translate",translate)
//       const [currentIndex, setCurrentIndex] = useState(0);
//       const {theme} = useGlobal();
//       const [pics  , setPics] = useState([ cardPic1  ,  cardPic2]);

//       useEffect(() => {
//         const interval = setInterval(() => {
//           setCurrentIndex((prevIndex) => (prevIndex + 1) % pics.length);
//         }, 3000);
      
//         return () => clearInterval(interval);
//       }, [pics.length]);

//       const goToSlide = (index) => {
//         setCurrentIndex(index);
//       };


//   return (
//     <section 
//     className={`relative h-[400px] md:h-[460px] lg:h-[600px] flex  w-full  overflow-x-hidden bg-[#eefbff] `}>
//       {/* <div className='relative '> */}
//         {/* Left Button */}
//       <div className="relative flex justify-center w-full">
//           {/* Left Button */}
//           <button
//             onClick={() => setTranslate((prev) => prev - 1150)}
//             className={`absolute left-6 top-1/2 -translate-y-1/2 z-50 
//               ${theme === "dark" ? "bg-white text-black" : "bg-black text-white"} 
//               p-3 py-10 rounded shadow-md hover:scale-110 transition`}
//           >
//             <FaChevronLeft size={24} />
//           </button>

//           {/* Image Container */}
//           <div className="flex w-full  overflow-hidden min-w-[275px] min-h-[275px] mt-16 rounded max-h-[500px] lg:w-[1150px]">
//             {pics.map((pic, index) => (
//             <Image
//               key={index}
//               src={pic}
//               alt={pic.src}
//               className={`w-[1150px] h-[500px] translate-x-[${translate}px] flex-shrink-0 object-cover transition-all duration-500 ease-in-out`}
//               // priority
//               // sizes="(max-width: 768px) 100vw, 1150px" 
//             />
//             ))}
//           </div>

//           {/* Right Button */}
//           <button
//             onClick={() => setTranslate((prev) => prev + 1150)}
//             className={`absolute right-6 top-1/2 -translate-y-1/2 z-50 
//               ${theme === "dark" ? "bg-white text-black" : "bg-black text-white"} 
//               p-3 py-10 rounded shadow-md hover:scale-110 transition`}
//           >
//             <FaChevronRight size={24} />
//           </button>

//         </div>

//       {/* </div> */}
//     {/* Indicators */}
//     {/* <div className="absolute z-40 bottom-16 left-1/2 -translate-x-1/2 flex gap-2 pt-7">
//       {pics.map((_, index) => (
//         <button
//           key={index}
//           onClick={() => goToSlide(index)}
//           className={`h-4 w-4 rounded-full   ${index === currentIndex ?'bg-[#00874F] ring-2 ring-[#00874F] ' : 'bg-gray-400 '} `}
//           aria-label={`Go to testimonial ${index + 1}`}
//         ></button>
//       ))}
//     </div> */}

//     </section>

//   )
// }     

// export default HeroSection


import React, { useEffect, useState } from "react";
import Image from "next/image";
import {  FaChevronRight , FaChevronLeft } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { FaArrowRightLong } from "react-icons/fa6";
import { useGlobal } from "@/context/GlobleContext";
import Link from "next/link";

import cardPic3 from "../../public/img.jpeg";
import cardPic2 from "../../public/img1.jpeg";
import cardPic4 from "../../public/img2.jpeg";
import cardPic5 from "../../public/img3.jpeg";
import cardPic6 from "../../public/img4.jpeg";
import cardPic7 from "../../public/img11.jpeg";
import cardPic8 from "../../public/img12.jpeg";

const HeroSection = () => {
  const { theme } = useGlobal();
  const pics = [cardPic4,cardPic6,cardPic3, cardPic2,  cardPic5,  cardPic7, cardPic8];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % pics.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [pics.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? pics.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      (prev + 1) % pics.length
    );
  };

  return (
    <section className="w-full bg-gradient-to-b from-slate-900 via-#000000 to-[#275D84] py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center w-full">
        <div>
            {/* <h1 className="text-3xl sm:text-4xl md:text-[60px] font-bold text-white text-center mb-2">
              Welcome to <span className="text-[#D08348]">JKD Pakistan</span>
            </h1> */}
            {/* <h2 className="text-2xl sm:text-xl md:text-[35px] md:ml-6 font-semibold text-[#3EAB3E] w-[90%] text-center">
              Transforming Lives, Empowering Underserved
            </h2> */}
            <h2 className="text-2xl sm:text-xl md:text-[35px] md:ml-6 font-semibold text-white w-full text-center">
              Transforming Lives, <span className="text-[#D08348]">Empowering Underserved</span>
            </h2>
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[400px] lg:min-h-[500px] pt-2">
          {/* Left Content */}
          <div className="flex flex-col space-y-4 sm:space-y-20">
            {/* <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                Welcome to <span className="text-orange-500">JKD Pakistan</span>
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-green-400">
                Transforming Lives, Empowering Underserved
              </h2>
            </div> */}

            <p className="sm:text-base lg:text-[28px] text-[#E7E8E8B2]  leading-[40px]">
              A nationally recognized training institute and dynamic hub for events, sports, and tourism. Empowering individuals through skill development, travel services, sports programs, business incubation, community initiatives, and global employment opportunities.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link href="/media"
               className="bg-[#D08348] text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-2xl transition-all duration-300 flex items-center gap-4 text-sm sm:text-base">
                Get Involved
                <FaArrowRightLong size={16} />
              </Link>
              <Link  href="/contact-us" className="border border-white text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 flex items-center gap-4 rounded-2xl transition-all duration-300 text-sm sm:text-base">
                Contact Us 
                <GoPerson size={18} />
              </Link>
            </div>
          </div>

          {/* Right Carousel */}
          <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[380px]">
            {/* Image Container */}
            <div className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl">
              {pics.map((pic, index) => (
                <div
                  key={index}
                  className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
                    index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={pic}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}

                  />
                </div>
              ))}

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-2">
                {pics.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 sm:h-3 rounded-full transition-all duration-300 cursor-pointer ${
                      index === currentIndex
                        ? "bg-orange-500 w-6 sm:w-8"
                        : "bg-white/50 w-2 sm:w-3 hover:bg-white/75"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  ></button>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:-left-6 md:left-[-50px] top-1/2 -translate-y-1/2 z-40 cursor-pointer p-2 sm:p-3 text-white transition-all duration-300 hover:scale-110"
              aria-label="Previous slide"
            >
              <FaChevronLeft size={18} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 sm:-right-6 md:right-[-50px] top-1/2 -translate-y-1/2 z-40 cursor-pointer text-white p-2 sm:p-3 transition-all duration-300 hover:scale-110"
              aria-label="Next slide"
            >
              <FaChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
