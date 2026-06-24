import React from 'react'

const WhyChoose = () => {
  return (
    <>
        {/* Why Choose Us */}
        <section className="w-full bg-[#F7F9FB] px-6 md:px-12 lg:px-16 py-10 md:py-12">
            <div className="max-w-[1080px] mx-auto text-center">
                <h2 className="text-[30px] md:text-[38px] leading-[1.1] font-bold text-[#0e1116] tracking-[-0.02em]">
                    Why Choose JKD Pakistan
                </h2>
                <p className="mt-3 text-[16px] md:text-[22px] py-4 text-semibold leading-[1.4] text-[#000000B2]">
                    Your trusted partner for spiritual and leisure travel
                </p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-10">
                    {[
                        {
                            title: 'Trusted Travel Partner',
                            description: 'Government-approved tour operator with proven track record',
                            icon: '/icons/trusted.svg'
                        },
                        {
                            title: 'Expert Guidance',
                            description: 'Experienced guides to assist you throughout your journey',
                            icon: '/icons/image29.svg'
                        },
                        {
                            title: 'Affordable Packages',
                            description: 'Competitive pricing without compromising on quality',
                            icon: '/icons/image30.svg'
                        },
                        {
                            title: '24/7 Support',
                            description: 'Round-the-clock customer support for peace of mind',
                            icon: '/icons/24support.svg'
                        }
                    ].map((item) => (
                        <div key={item.title} className="mx-auto w-full max-w-[525px] rounded-[12px] border-2 border-[#d8dbe3] bg-transparent p-7 text-left shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                            <div className="flex items-start gap-6">
                                <div className="flex h-[78px] w-[84px] shrink-0 items-center justify-center rounded-[8px] bg-[#343b50]">
                                    <img
                                        src={item.icon}
                                        alt={item.title}
                                        className="h-[40px] w-[40px] object-contain"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-[18px] md:text-[26px] leading-[1.2] font-semibold text-[#111317]">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 pt-2 max-w-[260px] text-[14px] md:text-[16px] leading-[1.5] text-[#757575]">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    </>
  )
}

export default WhyChoose