"use client"
import { useGlobal } from '@/context/GlobleContext'
import React from 'react'
import logo from "../../public/jkd-icon.png"
import text from "../../public/logo-text.png"
import Image from 'next/image'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaTiktok , FaEnvelope, FaPhone, FaWhatsapp, FaPhoneAlt} from "react-icons/fa";
import { useRouter } from 'next/navigation'

export default function Footer() {
  // const {theme} = useGlobal();
  const theme = 'dark';
  const router = useRouter();
  
  const Links = [
    { icon: <FaFacebookF />, path: 'https://www.facebook.com/share/1Do71hK9tV/' },
    // { icon: <FaTwitter />, path: 'https://twitter.com' },
    { icon: <FaInstagram />, path: 'https://www.instagram.com/jkdpakistan?igsh=cnJldTA0M2l5bmw0&utm_source=qr' },
    { icon: <FaYoutube />, path: 'https://www.youtube.com/@JKDPakistan' },
    { icon: <FaTiktok />, path: 'https://www.tiktok.com/@jkdpakistan?_r=1&_t=ZS-95smk91f5qj' },
  ];
  const  pages = [
    {path:'/' , name:'Home'},
    {path:'/services' , name:'Tourism'},
    // {path:'/programs' , name:'Programs'},
    // {path:'#' , name:'Achievements'},
    {path:'/events' , name:'Events'},
    {path:'/apply/job' , name:'Jobs'},
    {path:'/media' , name:'Media'},
    {path:'/contact-us' , name:'Contact Us'},
  ];

const contacts = [
  { icon: <FaEnvelope />, text:"info@jkdpakistan.org", link: "https://mail.google.com/mail/?view=cm&fs=1&to=info@jkdpakistan.org" },
  { icon: <FaPhone />, text: '+92 3339118828', link: "tel:+923339118828" },
  { icon: <FaWhatsapp />, text: '+92 3355008500', link: "https://wa.me/923355008500" },
  { icon: <FaPhoneAlt />, text: '+92 919216622', link: "tel:+92919216622" }
];

  const routChange = (path) =>{
    router.push(path)
  }

  return (
    <footer className={`w-full ${theme === 'light' ? 'bg-white':'bg-[black] text-white text-sm md:text-[14px] lg:text-base'} `}>
      <div className= {` overflow-hidden px-6 md:px-6 lg:px-0 lg:max-w-[1300px] mx-auto`}>
        <div className='flex justify-center gap-5 md:gap-0 md:justify-between py-5 flex-wrap'>
          {/* JKD info */}
          <div className=' w-full md:w-[305px]'>
            <div className='flex items-center ml-[-10px] '>
                <div className="relative h-[70px] w-[70px] lg:h-[80px] lg:w-[70px] z-10">            
                    <Image 
                    src={logo} 
                    alt="LOGO" 
                    fill
                    />        
                </div>
                <div className=" relative h-[70px] w-[170px] ml-[-20px]">
                    <Image 
                    src={text} 
                    alt="TEXT" 
                    fill
                    className="object-cover"
                    />
                </div>
            </div>
 
            <p className='text-[15px] text-[#FFFFFFBF]'>Empowering underserved <br /> communities through sustainable economic opportunities, comprehensive social development programs, and innovative initiatives across Pakistan.</p>
            <div className="flex gap-4 mt-3">
                {Links.map((link, index) => (
                    <a 
                    key={index} 
                    href={link.path} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full ${theme === 'dark'?'hover:bg-white bg-[#177faa] text-black':'hover:bg-black text-white bg-[#00874F] hover:text-white'} transition`}
                    // className="p-2 rounded-full bg-gray-200 text-black hover:bg-blue-600 hover:text-white transition"
                    >
                    {link.icon}
                    </a>
                ))}
            </div>
          </div> 


          
          {/* Explore Links */}
          <nav className='w-full md:w-auto'>
            <h3 className='text-2xl font-bold mt-6'>Explore</h3>
            <ul className='list-disc list-inside mt-6'>
              {pages.map((page , index) =>
                <li  onClick={()=> routChange(page.path)} className="hover:text-[#00d17a] cursor-pointer text-xl text-[#FFFFFFBF]" key={index}>{page.name}</li>
              )} 
            </ul>
          </nav>
          {/* Conatact Us */}
          <div className='w-full md:w-auto'>
            <h3 className='text-2xl font-bold mt-6'>Contact Us</h3>
            <ul className='mt-5'>
              {contacts?.map((contact, index) =>
                <li key={index} className='flex items-center gap-4 pt-1'>
                  {contact.icon}
                  <a 
                    href={contact.link} 
                    target={contact.link.startsWith("http") ? "_blank" : "_self"} 
                    rel="noopener noreferrer"
                    className=" text-lg text-[#FFFFFFBF] hover:underline"
                  >
                    {contact.text}
                  </a>
                </li>
              )}
            </ul>
          </div>  
          {/* Address */}
          <div className=' w-full md:w-[250px] mt-6'>
            <h3 className='text-2xl font-bold'>Address</h3>
            <p className=' mt-6 text-[#FFFFFFBF]'>16-B, Old Jamrud Road University Town Peshawar Khyber Pakhtunkhwa Pakistan</p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.8068359162608!2d71.49533368885498!3d33.997495000000015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d9173d97cfffff%3A0x74fcf26b20817358!2sJKD%20PAKISTAN!5e0!3m2!1sen!2s!4v1755617350360!5m2!1sen!2s"
              allowFullScreen
              loading="lazy"
              className="w-[250px] rounded mt-4 h-[100px]"
            />
          </div>
        </div>
        {/* bottom footer */}
        <p className='text-center py-2  w-full '>© {new Date().getFullYear()} JKD Pakistan. All rights reserved.</p>
      </div>
    </footer>
  )
}