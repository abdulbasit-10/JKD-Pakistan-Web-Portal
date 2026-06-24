import { useGlobal } from '@/context/GlobleContext';
import React from 'react'

const WhatWeValue = () => {
  const data = [
    {title:'Students' , text:'We value the power of teamwork and collaboration. By working together with trust, respect, and shared vision, we create stronger solutions and long-lasting impact for the communities we serve.'},
    {title:'Teamwork' , text:'We value the power of teamwork and collaboration. By working together with trust, respect, and shared vision, we create stronger solutions and long-lasting impact for the communities we serve.'},
    {title:'Process' , text:'Our processes are built on transparency, innovation, and efficiency. From planning to execution, we ensure that every step contributes to meaningful, measurable, and sustainable outcomes.'}
  ];
  const {theme} = useGlobal();

  return (
    <section className={`${theme === 'light' ? 'bg-[#eefbff]':'bg-black'} w-full flex flex-col items-center my-10 py-10`}>
        <div className='max-w-[1200px] px-4'>
            <h2 className='text-[35px] font-semibold '>What We <span className={` ${theme === 'dark' ? 'text-[#177faa]' : 'text-[#00874F]'}`}>Value?</span></h2>
            <div className='md:flex  gap-5 rounded w-full justify-center items-center md:pt-5'>
              {data?.map((card , index)=>
                <div key={index} className={`mt-5 md:mt-0 flex flex-col justify-center p-5 lg:h-[220px] rounded  ${theme === 'dark' ? 'bg-[#177eaa94]' : 'bg-[#00874f85]'}`}>
                  <h3 className='text-[30px] font-semibold '>{card.title}</h3>
                  <p className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-justify pt-2 md:pt-4`}>{card.text}</p>
                </div>
              )}
            </div>
        </div>
    </section>
  )
}

export default WhatWeValue