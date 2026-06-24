import React from 'react'
import Link from 'next/link'
import Header from '@/component/Header'
import Footer from '@/component/Footer'
import TourismHero from '@/component/TourismHero'
import WhyChoose from '@/component/whyChoose'
import PhotoGallery from '@/component/PhotoGallery'
import { notFound } from 'next/navigation'
import data from '@/data/tourism.json'

export default async function TourismPackagePage({ params }) {
    const resolvedParams = await params;
    const slug = String(resolvedParams?.category ?? resolvedParams?.slug ?? '').trim().toLowerCase();
    const packages = data?.packages ?? [] ;
    const cards = packages.filter((pkg) => pkg.category === slug);
    const titleMap = {
        umrah: 'Umrah Packages',
        hajj: 'Hajj Packages',
        international: 'International Packages',
    }

    if (!slug || cards.length === 0) {
        notFound()
    }

    // Prefer packageName from data when available (keeps headings driven by CMS/data)
    const packageName = cards[0]?.packageName || titleMap[slug] || 'Tour Packages'

    const section = {
        title: packageName,
        subtitle: 'Choose your package',
        cards,
    }

    return (
        <div className="min-h-screen w-full bg-white flex flex-col justify-between">
            <Header />
            <TourismHero params={resolvedParams} />

            <section className="w-full bg-[#F9F9F9] px-5 sm:px-8 md:px-12 lg:px-16 py-14 md:py-16">
                <div className="max-w-[1220px] mx-auto">
                    <div className="mb-8">
                        <h2 className="text-[48px] md:text-4xl lg:text-[38px]  font-semibold text-black">{section.title}</h2>
                        <p className="mt-3 text-[16px] md:text-[22px]  text-semibold leading-[1.4] text-[#000000B2]">{section.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                        {section.cards.map((card) => (
                            <article key={card.id} className="border border-black bg-white overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.08)] w-[99%]">
                                <div className="relative h-[180px] sm:h-[180px] overflow-hidden">
                                    <img
                                        src={card.image}
                                        alt={card.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className={`absolute top-2 right-2 ${card.statusColor} text-white px-3 py-1.5 rounded-lg text-xs font-semibold`}>
                                        {card.status}
                                    </div>
                                </div>

                                <div className="h-[8px] bg-[#d88942]" />

                                <div className="p-4 ">
                                    <h3 className="text-[20px] font-bold ml-6 text-black ">
                                        {card.title}
                                    </h3>

                                    <div className=" space-y-2 text-sm text-gray-700 pt-1">
                                        <div className="flex items-center gap-2">
                                            {/* <span className="text-[#de8a3f]">📍</span> */}
                                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d68943" strokeWidth="2"><path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.8" /></svg>
                                            <span className='text-[17px] text-black'>{card.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {/* <span className="text-[#de8a3f]">⏱</span> */}
                                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d68943" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                                            <span className='text-[17px] text-black'>{card.duration}</span>
                                        </div>
                                    </div>

                                    <p className="text-[22px] font-extrabold text-black pt-1">
                                        {card.price} <span className="text-gray-500 font-normal text-base ">&#40; per person &#41;</span>
                                    </p>
                                    

                                    <div className="pt-1">
                                        <p className="text-base font-semibold text-gray-800 mb-2">Includes:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {(card.includes || []).map((item , index) => (
                                                <span key={index} className=" text-sm p-2 rounded-lg text-gray-700 bg-[#EBF0F3]">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-2 mt-5">
                                        <Link href={`/tourism/${slug}/${card.id}`} className="flex-1">
                                            <button type="button" className="w-full h-[42px] rounded-[12px] border-2 border-[#273443] text-[#1f4d73] text-sm font-medium cursor-pointer leading-none hover:bg-[#e6edf6] transition-colors">
                                                Details
                                            </button>
                                        </Link>
                                        <Link href={`/apply/tourism/${card.id}`} className="flex-1">
                                            <button className="w-full h-[42px] rounded-[12px] bg-[#d68943] text-white text-sm font-medium cursor-pointer leading-none hover:bg-[#c97a35] transition-colors">
                                                Apply Now
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <WhyChoose />
            <PhotoGallery params={resolvedParams} />
            <Footer />
        </div>
    )
}