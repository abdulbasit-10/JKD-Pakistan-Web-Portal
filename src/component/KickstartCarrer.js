import React, { useEffect, useState } from 'react'
import logoPart1 from "../../public/logo-part1.png"
import logoPart2 from "../../public/logo-part2.png"
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const KickstartCarrer = () => {
  const router = useRouter();
  const data = [
      {
          borderColor: '#e98b28',
          title: 'Community ',
          titlePart:'Empowerment',
          // subTitle1:'Statement',
          // subTitle2:'Why it matters',
          text1:'At JKD Pakistan, we’re more than just service providers — we’re community builders. Our mission goes beyond delivering training and education; we strive to uplift underserved communities through multidimensional support. By empowering individuals with skills, knowledge, and opportunity, we help create a stronger, self-reliant society where everyone has the chance to grow and succeed.',
          // text2:'You focus not only on services but also on uplifting entire underserved communities through multi dimensional support.',
      },
      {
          borderColor: '#00874F',
          title:'Sustainable',
          titlePart:'Services',
          // subTitle1:'Statement',
          // subTitle2:'Why it matters',
          text1:'At JKD Pakistan, we offer a diverse range of programs — from technology training to green tourism and event management — each designed to meet the evolving needs of our communities. Our commitment to sustainability and innovation reflects our adaptability and vision for long-term impact. Through every service we provide, we aim to build a balanced future where education, environment, and enterprise grow together.',
          // text2:'Your variety ranging from vocational courses to event hosting to eco-tourism—demonstrates adaptability and breadth.',
      },
      {
          borderColor: '#177faa',
          title:'Future Driven ',
          titlePart:'Growth',
          // subTitle1:'Statement',
          // subTitle2:'Why it matters',
          text1:'At JKD Pakistan, we build with the future in mind — promoting sustainable development across all our initiatives. From Green Tourism to vocational training, every program is designed to create long-term value for individuals, communities, and the environment. Our future-focused approach ensures that progress today leads to lasting, positive change for generations to come.',
          // text2:'Emphasizing how programs like Green-Tourism and vocational training are rooted in sustainability resonates with value-driven audiences.',
      }
  ];
  const theme = 'light';
  const [isVisible, setIsVisible] = useState(false);
const [offset, setOffset] = useState(0);
  useEffect(() => {
    const section = document.getElementById("kickstart-section");
    console.log(section)
    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      setIsVisible(inView);
      if (inView) {
        console.log("hello");
        setOffset(window.scrollY * -0.2 );
      }
    };

    window.addEventListener("scroll", handleScroll);
    // handleScroll(); // run once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  
console.log(isVisible ,offset)
  return (
    <section
      id="kickstart-section" className='bg-[#005f88] w-full flex flex-col items-center my-6 sm:my-8 md:my-10 py-10 sm:py-12 md:py-16 lg:py-20 text-white px-4 sm:px-6 md:px-8'>
        <h2 className='text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-normal text-center'>Ready to Kickstart your<span className='font-bold text-[#e98b28]'> Career?</span></h2>
        <h3 className='text-base sm:text-lg md:text-xl lg:text-[23px] pt-2 text-center'>Interested in Innovation and Design</h3>
        <div className='my-3 sm:my-4 md:my-5 py-4 sm:py-5 flex items-center justify-center overflow-visible relative w-full max-w-[800px]'>
          <Image src={logoPart1} alt='logo' className=' lg:block h-[120px] md:h-[150px] lg:h-[200px] absolute top-[-20px] md:top-[-30px] lg:top-[-40px] left-[7px] md:left-[100px] lg:left-[-200px] w-[120px] md:w-[150px] lg:w-[200px] object-contain' />
          <button
            onClick={() => router.push('/apply/job')}
            className='text-2xl sm:text-3xl md:text-4xl lg:text-[45px] hover:bg-[#e98b28] hover:text-[#005f88] cursor-pointer font-semibold border-2 rounded border-[#e98b28] px-8 sm:px-10 md:px-12 lg:px-16 py-2 sm:py-2.5 md:py-3 transition-colors duration-300'
          >
            JOIN US!
          </button>
          <Image src={logoPart2} alt='logo' className=' lg:block h-[120px] md:h-[150px] lg:h-[200px] absolute top-[-10px] md:top-[-12px] lg:top-[-15px] right-[7px] md:right-[100px] lg:right-[-200px] w-[120px] md:w-[150px] lg:w-[200px] object-contain' />
        </div>
        <p className='text-center w-full max-w-[1200px] pt-2 text-sm sm:text-base px-4'>Are you ready to embark on a journey of personal and professional growth? Look no further! Our comprehensive three-tier training program is designed to equip you with the skills, knowledge, and confidence you need to succeed in today&apos;s competitive landscape. Whether you&apos;re a budding professional, an aspiring entrepreneur, or a seasoned industry expert, our program has something for everyone.</p>
        <div className='w-full max-w-[1200px] px-4 pt-6 sm:pt-8 md:pt-10'>
          <div>
              <h2 className='text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-semibold text-center'>Why JKD?</h2>
          </div>
          <div className='flex flex-col lg:flex-row gap-4 sm:gap-5 rounded justify-center items-stretch pt-5 md:pt-6 lg:pt-8 transition-all duration-200'
      style={{
        transform: window.innerWidth >= 1024 ? `translateY(${570+offset}px)` : 'none',
      }}>
                {data?.map((card , index)=>
                  <div key={index} className='mt-4 lg:mt-0 relative flex flex-col justify-start p-4 sm:p-5 w-full lg:w-[33%] min-h-[320px] md:min-h-[200px] lg:min-h-[390px] border-5 rounded bg-white'
                  >
                    <h3 className='text-xl sm:text-2xl md:text-[26px] lg:text-[30px] font-semibold w-[70%] sm:w-[62%] text-black'>{card.title} <span className={`${theme === 'dark' ? 'text-[#177faa]' : 'text-[#00874F]'}`}>{card.titlePart}</span></h3>
                    <p className='text-justify text-sm sm:text-base pt-2 sm:pt-3 text-gray-700'>{card.text1}</p>
                  </div>
                )}
          </div>
        </div>
    </section>
  )
}

export default KickstartCarrer