import React from 'react'
import { FaHandshake, FaRegSmile, FaAward, FaUserFriends } from 'react-icons/fa';
import WorkDetailItem from ".//WorkDetailItem";
import { useGlobal } from '@/context/GlobleContext';

const WorkHistory = () => {
    const {state} = useGlobal();
    const {theme} = state;
    const workDetails=[
    {
        icon:FaHandshake , 
        numbers: 24,
        titel: 'Projects Done'
    },
    {
        icon:FaRegSmile , 
        numbers: 25000,
        titel: 'Customer Happy'
    },
    {
        icon:FaAward , 
        numbers: 10,
        titel: 'Guarantee Services'
    },
    {
        icon:FaUserFriends , 
        numbers: 21,
        titel: 'Team Experts'
    },
    ];
  return (
    <section className={`py-8 sm:py-5 md:py-12 lg:py-15 flex justify-center ${theme === 'light' ? 'bg-[#001d2b]' : 'bg-[#0b0b0b]'} w-full px-4 sm:px-6 md:px-8`}>
        <div className="flex gap-20 md:gap-25 lg:gap-10 flex-wrap justify-center lg:justify-between text-center w-full max-w-[1200px]">
        {workDetails?.map((detail, index) => (
            <React.Fragment key={index}>
            <WorkDetailItem detail={detail} />
            {workDetails.length - 1 !== index && (
                <div className={`${theme === 'light' ? 'bg-[white]' :'bg-[#177faa]'} rounded-full h-full w-[5px] md:w-[7px] hidden lg:block`}></div>
            )}
            </React.Fragment>
        ))}
        </div>
    </section>
  )
}

export default WorkHistory