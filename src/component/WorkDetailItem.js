// src/components/WorkDetailItem.js
"use client";

import { useCounter } from "@/helper/useCounter";
import { useInView } from "react-intersection-observer";

//detail data
const WorkDetailItem = ({ detail }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  
  const count = useCounter(detail.numbers, inView);
  const Icon = detail.icon;

  return (
    <div key={detail.titel} ref={ref} className={`text-white w-[120px] md:w-[180px] lg:w-auto flex gap-1 flex-col items-center`}>
      <Icon className="text-[32px] sm:text-[36px] md:text-[42px] lg:text-[48px] mb-2" />
      <h2 className="text-[24px] sm:text-[26px] md:text-[32px] lg:text-[36px] font-bold">{count} <span className="text-[20px] sm:text-[22px] md:text-[26px] lg:text-[30px] relative top-[-8px] sm:top-[-5px]">+</span></h2>
      <h4 className="font-semibold text-sm sm:text-base">{detail.titel}</h4>
    </div>
  );
};

export default WorkDetailItem;