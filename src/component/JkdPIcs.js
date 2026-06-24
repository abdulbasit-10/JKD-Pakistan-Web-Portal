import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import cardPic1 from "../../public/cardPic1.jpg"
import cardPic2 from "../../public/cardPic2.jpg"
import cardPic3 from "../../public/cardPic3.jpg"
import cardPic4 from "../../public/cardPic4.jpg"
import cardPic5 from "../../public/cardPic5.jpg"
import { useGlobal } from '@/context/GlobleContext';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useMediaQuery } from "react-responsive"; 

function useIsMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

const JkdPIcs = () => {
    const {theme} = useGlobal();
    const [pics  , setPics] = useState([cardPic3, cardPic1, cardPic2, cardPic4, cardPic5,cardPic3, cardPic1, cardPic2, cardPic4, cardPic5,cardPic3, cardPic1, cardPic2, cardPic4, cardPic5,cardPic3, cardPic1, cardPic2, cardPic4, cardPic5,cardPic3, cardPic1, cardPic2, cardPic4, cardPic5,cardPic3, cardPic1, cardPic2, cardPic4, cardPic5,cardPic3, cardPic1, cardPic2, cardPic4, cardPic5,cardPic3, cardPic1, cardPic2, cardPic4, cardPic5,cardPic3, cardPic1, cardPic2, cardPic4, cardPic5,cardPic3, cardPic1, cardPic2, cardPic4, cardPic5,cardPic3, cardPic1, cardPic2, cardPic4, cardPic5]);

    const isSm = useMediaQuery({ minWidth :376 ,maxWidth: 767 });
    const isMd = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const isLg = useMediaQuery({ minWidth: 1024 });

    const isMounted = useIsMounted();
    let cardOffset = 0;  

    if (isMounted) {
        if(isSm) cardOffset = 172;  
        if (isMd) cardOffset = 190;
        if (isLg) cardOffset = 203;
    }

    const [currentIndex, setCurrentIndex] = useState(27);
    const handlePicChange = (type) => {
        if (type === "left" ) {
        setCurrentIndex((prev) => prev + 1);
        } else if (type === "right" ) {
        setCurrentIndex((prev) => prev - 1);
        }
    };
    if (!isMounted) {
        return (
        <section className={`relative flex overflow-hidden justify-center ${theme === 'light' ? 'bg-[#eefbff]' : 'bg-black'} w-full my-10`}>
            <div className="h-[250px] md:h-[300px] lg:h-[300px] w-[600px] md:w-[900px] lg:w-[1200px] bg-gray-200 animate-pulse rounded-xl" />
        </section>
        );
    }

    return (        
    <section className={`relative flex  overflow-hidden justify-center ${theme === 'light' ? 'bg-[#eefbff]':'bg-black'} w-full my-10`}>
    {/* Left Button */}
    <button
        onClick={() => handlePicChange('left')}
        className={` absolute ${theme === 'light' ? 'bg-black text-white':'bg-white text-black'} ${(pics.length-1) - currentIndex === 4 && 'hidden'} z-50 left-1 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-md  hover:scale-110 transition`}
    >
        <FaChevronLeft size={24} />
    </button>
    {/* Scrollable Container */}
    <div className="flex items-center px-5 sm:px-0  gap-6 sm:gap-4 h-[250px] md:h-[300px] w-[600px] md:w-[900px]  lg:w-[1200px] relative  transition-all duration-500 ease-in-out "
        style={{
        transform: (!isSm && !isMd && !isLg) 
            ? `translateX(-${currentIndex * 96}%)` 
            : "none"
        }}
    >
        {pics?.map((src, index) => {
        const diff = index-currentIndex;
        const height = diff >4 || diff<0 ? 'lg:h-10 md:h-7 sm:h-5 h-[200px] ' :  diff=== 2 ? "h-[200px] sm:h-[170px] md:h-[200px] lg:h-[230px]" : diff % 2 === 0 ? "h-[200px] sm:h-[110px] md:h-[140px] lg:h-[170px] " : "h-[200px] sm:h-[140px] md:h-[170px] lg:h-[200px]";
         let offset;
         let opacity;
         if (isMounted && isLg || isMd || isSm) {
             offset = (index + currentIndex) * cardOffset;
             opacity =diff >4 || diff<0 ? '0%' :'100%';
         }else{
             offset=(index + currentIndex) * cardOffset;
             opacity = '100%'
         }
        const width = "w-full sm:w-[300px] md:w-[350px] lg:w-[390px]";
        const zIndex =diff >4 || diff<0 ? 'z-0' : diff === 2 ? 'z-30' : diff % 2 === 0  ? 'z-10' : 'z-20';
        return (
            <div
            key={index}
            className={`${height} ${width} ${zIndex} relative flex-shrink-0 rounded-xl overflow-hidden sm:transition-all sm:duration-500 sm:ease-in-out shadow-md`}
            style={{
                // zIndex,
                opacity,
                transform: `translateX(-${offset}px)`
            }}
            >
            <Image
                src={src}
                alt={`cardpic-${index}`}
                fill
                className="object-cover"
            />
            </div>
        );
        })}

    </div>
    {/* Right Button */}
    <button
        onClick={() => handlePicChange('right')}
        className={`absolute right-1 top-1/2 -translate-y-1/2  ${(pics.length-1) - currentIndex === 54 && 'hidden'} ${theme === 'light' ? 'bg-black text-white':'bg-white text-black'}   p-3 rounded-full shadow-md z-50 hover:scale-110 transition`}
    >
        <FaChevronRight size={24} />
    </button>
    </section>
  )
}

export default JkdPIcs

