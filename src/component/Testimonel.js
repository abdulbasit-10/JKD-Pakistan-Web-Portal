import Image from 'next/image'
import React, { useState } from 'react'
import shaheen from '../../public/shaheenShahAfrid.png'
import kabir from '../../public/kabir.jpg'
import tahir from '../../public/tahir.jpg'
import { useGlobal } from '@/context/GlobleContext'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Testimonel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    {
      name : 'Tahir Khan',
      review : "I am thoroughly impressed by JKD Pakistan's event management expertise.",
      image: tahir,
      profession : "Founder and CEO of TKR Restaurants"
    },    
    {
      name : 'Kabir Afridi',
      review : "JKD Pakistan delivered an outstanding event experience.",
      image: kabir,
      profession : "Social Media Influencer"
    },
    {
      name : 'Shaheen Shah Afridi',
      review : "JKD Pakistan event planning and execution surpassed expectations. Jehanzeb Khan Dhakki and his team are simply the best in the business.",
      image: shaheen,
      profession : "Pakistn National T20I Team Captiain"
    }
  ]
  const {theme} = useGlobal()
 
    const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const visibleTestimonials = testimonials.map((_, i) => testimonials[(currentIndex + i) % testimonials.length]);

  return (
    <section className={`w-full py-4 mb-10 relative overflow-hidden ${theme === 'dark' ? 'bg-[#1f2937]' : 'bg-white'}`}>
      <div className="mx-auto w-[95%] sm:w-[90%] lg:w-[1200px]">
        <h1 className="text-center text-[34px] md:text-[40px] font-semibold text-[#275D84]">Testimonials</h1>
        <p className={`text-center mt-2 text-[24px] ${theme === 'dark' ? 'text-gray-200' : 'text-[#1f1f1f]'}`}>
          Real testimonials from our community members and partners
        </p>

        <button
          onClick={goToPrevious}
          className={`absolute left-3 lg:left-20 top-[60%] sm:top-[55%] -translate-y-1/2 z-20 ${theme === 'dark' ? 'text-gray-200' : 'text-[#1f1f1f]'} hover:scale-110 transition`}
          aria-label="Previous testimonial"
        >
          <FaChevronLeft size={22} />
        </button>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 px-8 lg:px-12">
          {visibleTestimonials?.map((testimonial, index) => (
            <article
              key={`${testimonial.name}-${index}`}
              className={`${index === 0 ? 'flex' : 'hidden md:flex'} min-h-[320px] border-2 shadow-[0_2px_8px_rgba(0,0,0,0.15)] p-4 flex-col justify-between ${theme === 'dark' ? 'bg-[#111827] border-gray-600' : 'bg-white border-gray-600'}`}
            >
              <div>
                {/* <FaQuoteLeft className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-[30px]`} /> */}
                <Image 
                src ="/icons/faquote.svg"
                width={40}
                height={40}
                alt="Quote Icon"
                className='w-[67px h-[67px] object-contain '
                />  
                <p className={`mt-8 w-[244px] text-center italic leading-8  text-[20px] ${theme === 'dark' ? 'text-gray-100' : 'text-[#1f1f1f]'}`}>
                  {testimonial.review}
                </p>
              </div>

              <div className={`pt-4 mt-3 border-t ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                <div className="flex items-center gap-3 w-[244px] ">
                  <Image
                    src={testimonial.image}
                    className="rounded-full object-cover w-[65px] h-[65px]"
                    alt={testimonial.name}
                  />
                  <div>
                    <h3 className="text-[16px] sm:text-[20px] w-[214px] font-semibold text-[#3C85BD] leading-none ml-3">
                      {testimonial.name}
                    </h3>
                    <h4 className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} mt-1 ml-1 sm:text-[12px] text-[10px]`}>
                      {testimonial.profession}
                    </h4>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          onClick={goToNext}
          className={`absolute right-3 lg:right-20 top-[60%] sm:top-[55%] -translate-y-1/2 z-20 ${theme === 'dark' ? 'text-gray-200' : 'text-[#1f1f1f]'} hover:scale-110 transition`}
          aria-label="Next testimonial"
        >
          <FaChevronRight size={22} />
        </button>
      </div>
    </section>
  )
}

export default Testimonel