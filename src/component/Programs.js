"use client";
import React, { useRef, useState } from "react";
import programImage1 from "../../public/program-image1.jpeg";
import programImage2 from "../../public/program-image2.webp";
import programImage3 from "../../public/program-image3.jpeg";
import programImage4 from "../../public/program-image4.jpeg";
import programImage5 from "../../public/program-image5.webp";
import programImage6 from "../../public/program-image6.jpg";
import programImage7 from "../../public/program-image7.jpg";
import programImage8 from "../../public/program-image8.jpeg";
import programImage9 from "../../public/program-image9.jpg";
import program1 from "../../public/progaram-1.png";
import program2 from "../../public/progaram-2.png";
import program3 from "../../public/progaram-3.png";
import program4 from "../../public/progaram-4.png";
import program5 from "../../public/progaram-5.png";
import program6 from "../../public/progaram-6.png";
import program7 from "../../public/progaram-7.png";
import program8 from "../../public/progaram-8.png";
import program9 from "../../public/progaram-9.png";
import { useGlobal } from "@/context/GlobleContext";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import rightArrow from "../../public/rightArrow.svg";

const allprograms = [
  {
    title: "Tourism Management",
    image: programImage5,
    description:
      "Encouraging eco-friendly tourism and preserving the natural beauty of our region.",
    pIcon: program6,
  },
    {
    title: "Hospitality Management",
    image: programImage5,
    description:
      "Providing exceptional service and experiences in the hospitality industry.",
    pIcon: program6,
  },
  {
    title: "Sport Management",
    image: programImage3,
    description:
      "Inspiring youth to excel in sports, teamwork, and healthy lifestyles.",
    pIcon: program4,
  },
  {
    title: "Event Management",
    image: programImage9,
    description:
      "Celebrating food culture with a variety of delicious and innovative cuisines.",
    pIcon: program9,
  },
  {
    title: "IT and Digital Skills",
    image: programImage2,
    description: "A hub for innovation, startups, and digital entrepreneurship",
    pIcon: program3,
  },
  {
    title: "TVET",
    image: programImage1,
    description:
      "Providing quality education that nurtures creativity, leadership, and knowledge for the future.",
    pIcon: program2,
  },
  // {
  //   title: "Overseas Recruitment",
  //   image: programImage4,
  //   description:
  //     "Promoting wellness through modern fitness facilities and health programs.",
  //   pIcon: program5,
  // },
  // {
  //   title: "Parlour",
  //   image: programImage6,
  //   description:
  //     "Providing grooming and beauty services while empowering women entrepreneurs.",
  //   pIcon: program7,
  // },
  // {
  //   title: "Boutique",
  //   image: programImage8,
  //   description:
  //     "Showcasing fashion and culture through unique designs and creative clothing.",
  //   pIcon: program8,
  // },
];

const Programs = () => {
  const { theme } = useGlobal();
  const scrollRef = useRef(null);
  const [programs, setPrograms] = useState(allprograms);

  // const scroll = (direction) => {
  //   if (scrollRef.current) {
  //     const { scrollLeft, clientWidth } = scrollRef.current;
  //     console.log(scrollRef.current)
  //     const scrollAmount = clientWidth * 0.8; // scroll by ~80% width
  //     scrollRef.current.scrollTo({
  //       left:
  //         direction === "left"
  //           ? scrollLeft - scrollAmount
  //           : scrollLeft + scrollAmount,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  const handlePicChange = (type) => {
    setPrograms((prev) => {
      if (!prev.length) return prev;

      if (type === "left") {
        return [...prev.slice(1), prev[0]];
      }

      return [prev[prev.length - 1], ...prev.slice(0, -1)];
    });
  };

  return (
    <section className="mb-10 flex w-full flex-col items-center px-4 pt-8 sm:px-6 sm:pt-10">
      <h1
        className="w-full max-w-[1200px] text-center text-[30px] font-bold text-[#275D84] sm:text-[36px] md:text-[40px]"
      >
        Our Programs
      </h1>
      <p className="mt-2 w-full max-w-[1200px] px-1 text-center text-[18px] text-gray-900 sm:text-[22px] md:text-[26px]">
        Comprehensive initiatives for community empowerment
      </p>

      <div className="relative w-full max-w-[1280px] px-6 pt-8 sm:px-8 sm:pt-10 lg:px-2">
        {/* Left Button */}
        <button
          onClick={() => handlePicChange("left")}
          className="absolute left-[-15px] cursor-pointer top-1/2 z-50 -translate-y-1/2  p-2 text-gray-800  transition hover:scale-110 sm:-left-2 sm:p-3 lg:-left-10"
        >
          <FaChevronLeft size={24} />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex w-full gap-4 overflow-x-hidden scroll-smooth scrollbar-hide sm:gap-6"
        >
          {programs?.map((program, index) => (
            <div
              key={index}
              className="program-card relative mb-8 flex min-h-[390px] min-w-[calc(100%-1rem)] flex-col justify-between overflow-visible border border-gray p-3 pt-3 text-center sm:min-h-[420px] sm:min-w-[calc((100%-1.5rem)/2)] lg:min-w-[calc((100%-3rem)/3)] xl:min-w-[calc((100%-4.5rem)/4)]"
            >
              <div>
                <div className="relative z-10 w-full">
                <Image
                  src={program.image}
                  className="relative mx-auto h-[180px] w-full rounded object-cover sm:h-[190px] md:h-[175px]"
                  alt={program.title}
                />
                </div>
                <h3 className={`mt-3 text-[22px] font-bold sm:text-[24px] md:text-[22px] ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{program.title}</h3>
                <p className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-[16px] leading-snug sm:text-[19px] md:text-[17px]`}>{program.description}</p>
              </div>

              <div className="flex justify-center sm:justify-start">
                <button className="mt-4 rounded-lg bg-[#D08348] px-4 py-2 text-sm text-white transition hover:bg-opacity-90 md:px-6">
                  Learn More  <Image src={rightArrow} alt="right arrow" className="inline-block ml-3" />
              </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={() => handlePicChange("right")}
          className="absolute right-[-1px] cursor-pointer top-1/2 z-50 -translate-y-1/2  p-2 text-gray-800  transition hover:scale-110 sm:-right-2  lg:-right-10"
        >
          <FaChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default Programs;
