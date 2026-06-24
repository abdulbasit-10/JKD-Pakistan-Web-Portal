import React from 'react'
import Image from 'next/image'
import jkdPhoto2 from '../../public/jkd-front2-photo.jpg';
import { useGlobal } from '@/context/GlobleContext';

const About = () => {
    const {theme} = useGlobal();
  return (
    <section className={` w-full flex justify-center py-15 ${theme === 'light' ? 'text-gray-700 bg-[#eefbff]' : 'text-white bg-black'}`}>
        <div className="w-full px-6 lg:w-[1200px]">
        <div className="flex flex-col md:flex-row gap-10  ">
            <div className="md:w-[50%]">
            {/* <h1 className={`text-[39px] font-semibold  ${theme === 'light' ? 'text-black' : 'text-white'}`}>JKD Pakistan: Together for a Brighter Future</h1> */}
            {/* <p className="text-justify p-2 leading-7">JKD Pakistan is a social development and welfare organization dedicated to uplifting communities through education, healthcare, youth empowerment, and community development.</p> */}
            <h2 className={`text-[24px] md:text-[28px] lg:text-[32px]   font-semibold  ${theme === 'light' ? 'text-black' : 'text-white'}`} >JKD Pakistan</h2>
            <p className={`text-justify p-2 leading-7 `}>JKD Pakistan is a social development and welfare organization working for a brighter and prosperous future of our nation. Our mission is to bring positive change through education, healthcare, youth empowerment, and community development.
            We strive to create equal opportunities for every individual — whether it’s access to quality education, better healthcare facilities, or employment opportunities. JKD Pakistan is committed to building a stronger, progressive, and united society.</p>
            <h2 className={`text-[24px] md:text-[28px] lg:text-[32px] font-semibold pt-5  ${theme === 'light' ? 'text-black' : 'text-white'}`}>What We Do</h2>
            <ul className="list-disc p-2 list-inside">
                <li className="leading-7">Promote education and support students</li>
                <li className="leading-7">Organize health and awareness programs</li>
                <li className="leading-7">Provide skills and training for youth</li>
                <li className="leading-7">Work on community welfare and development projects</li>
            </ul>
            {/* <button className={`mt-5 p-2 px-2 ${theme === 'light' ? 'bg-[#00874F] hover:text-white hover:bg-black': 'hover:text-black hover:bg-white bg-[#177faa]'} transition cursor-pointer text-white rounded`} >Learn more</button> */}
            </div>
            <div className="relative md:w-[50%] h-[300px] sm:h-[400px] md:h-auto ">
            <Image src={jkdPhoto2} className="object-cover md:objext-fill  md:h-[50%] rounded" fill alt="jkdPhoto2"   />
            </div>
        </div>
        </div>
    </section>
  )
}

export default About

