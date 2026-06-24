import Image from 'next/image'
import React from 'react'

import partner5 from '../../public/partner-5.png';
import partner6 from '../../public/partner-6.png';
import uet from '../../public/uet-logo.png';
import giz from '../../public/giz-logo.png';
import un from '../../public/un-removebg-preview.png';


import { useGlobal } from '@/context/GlobleContext';

const Partners = () => {
    const { state } = useGlobal();
    const { theme } = state;
    const partners = [
        partner5,
        partner6,
        un,
        giz,
        uet
    ];

    return (
        <section className={` pt-10 mb-10 flex w-full flex-col items-center sm:py-15  text-[black] bg-[#BECECA96]`}>
            <h1 className={`text-center text-[30px] md:text-[35px] lg:text-[39px] font-semibold mb-4  w-[250px] sm:w-[600px] md:w-[900px] lg:w-[1200px] text-[#275D84]`}>Our Partners</h1>
            <div className="w-full overflow-hidden lg:w-[1351px]">
                <div className="flex w-max items-center gap-10 animate-scroll">
                    {[...partners, ...partners]?.map((partner, index) => (
                        (() => {
                            const originalIndex = index % partners.length;

                            return (
                        <div
                            key={`${index}-${partner?.src || index}`}
                            className="program-card flex h-[110px] items-center justify-center rounded-2xl text-center min-w-[85px] sm:min-w-[150px]"
                        >
                            <Image
                                src={partner}
                                className={`object-contain mx-auto w-40 ${originalIndex === 4 ? "h-20" : "h-full"
                                    }`}
                                alt={`partner${index}`}
                            />
                        </div>
                            );
                        })()
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Partners