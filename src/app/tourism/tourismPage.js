'use client';
import Header from '@/component/Header'
import Footer from '@/component/Footer'
import Link from 'next/link'
import React from 'react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
// import { packages, tourismCards, featuredDestinations } from '@/data/tourism.json'
import data from '@/data/tourism.json'
import TourismHero from '@/component/TourismHero'
import WhyChoose from '@/component/whyChoose'
import PhotoGallery from '@/component/PhotoGallery';

export default function Tourism() {
    const packages = data?.packages;
    // const tourismCards = data?.tourismCards;
    const featuredDestinations = data?.featuredDestinations;
    // console.log('Packages data:', packages);
    // console.log('Tourism Cards data:', tourismCards);
    // console.log('Featured Destinations data:', featuredDestinations);


    const [activeFilter, setActiveFilter] = useState('umrah');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [packagesPerPage, setPackagesPerPage] = useState(1);
    const [currentFeaturedPage, setCurrentFeaturedPage] = useState(1);
    const [featuredPerPage, setFeaturedPerPage] = useState(1);

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) {
                setPackagesPerPage(3);
                setFeaturedPerPage(3);
            } else if (window.innerWidth >= 768) {
                setPackagesPerPage(2);
                setFeaturedPerPage(2);
            } else {
                setPackagesPerPage(1);
                setFeaturedPerPage(1);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // read category from query param (e.g. ?category=umrah) and set active filter
    const searchParams = useSearchParams();
    useEffect(() => {
        const cat = searchParams?.get?.('category');
        if (cat) setActiveFilter(cat);
    }, [searchParams]);

    const filteredPackages = packages.filter((pkg) => {
        const matchesCategory = activeFilter === 'all' || pkg.category === activeFilter;
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch = query.length === 0 || [pkg.title, pkg.location, pkg.duration, pkg.price]
            .join(' ')
            .toLowerCase()
            .includes(query);
        return matchesCategory && matchesSearch;
    });

    const totalPages = Math.max(1, Math.ceil(filteredPackages.length / packagesPerPage));
    const currentPageSafe = Math.min(currentPage, totalPages);
    const startIndex = (currentPageSafe - 1) * packagesPerPage;
    const visiblePackages = filteredPackages.slice(startIndex, startIndex + packagesPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeFilter, searchQuery]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    return (
        <div className={`min-h-screen w-full flex flex-col justify-between`}>
            <Header />
            <TourismHero />
            {/* Our Packages - card grid */}
            <section className="w-full bg-white px-6 md:px-12 lg:px-16 py-14">
                <div className="max-w-[1220px] mx-auto">
                    <div className="flex items-start justify-between mb-6">
                        <div className='pl-2'>
                            <h2 className="text-2xl md:text-4xl font-bold text-black">Our Packages</h2>
                            <p className="mt-2 text-xl md:text-2xl">Premium travel experiences</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {packages.slice(0, 6).map((pkg) => (
                            <Link key={pkg.id} href={`/tourism/${pkg.category}`} className="group flex flex-col rounded-2xl overflow-hidden  bg-white hover:shadow-lg transition-shadow">
                                <div className="relative h-48 md:h-50 overflow-hidden">
                                    <img src={pkg.image2} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                </div>
                                <div className='bg-white px-4 py-2  border-[2px] border-t-0  border-[#00000066]  rounded-b-2xl flex-1 flex items-center'>
                                    <h3 className="text-black font-semibold text-xl line-clamp-2">{pkg.packageName}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* <section className="w-full bg-[#F7F9FB] px-6 md:px-12 lg:px-16 py-14 md:py-16 mt-12 md:mt-16 lg:mt-20">
                <div className="max-w-[1220px] mx-auto">
                    <h2 className="text-[44px] md:text-[46px] leading-[1.05] font-semibold text-[#0e1116] tracking-[-0.02em]">
                        Featured Destinations
                    </h2>
                    <p className="text-[30px] leading-[1.05] font-medium text-[#222831] mt-4 mb-9 tracking-[-0.01em]">
                        Premium travel experiences
                    </p>

                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setCurrentFeaturedPage((page) => Math.max(1, page - 1))}
                            disabled={currentFeaturedPage === 1}
                            className="absolute left-[-28px] md:left-[-50px] top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center text-black cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed hover:text-black transition-colors z-20"
                            aria-label="Previous page"
                        >
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>


                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5" >
                            {featuredDestinations.slice((currentFeaturedPage - 1) * featuredPerPage, currentFeaturedPage * featuredPerPage).map((item) => (
                                <div key={item.id} className="mx-auto w-full max-w-[360px] bg-transparent border shadow-[0_1px_0_rgba(0,0,0,0.1)] overflow-hidden">
                                    <div className="relative">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-[200px] object-cover"
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-2.5 right-2.5 text-[#f5b400] hover:scale-110 transition-transform"
                                            aria-label="Mark as featured"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path d="M12 2.2l2.76 5.59 6.17.9-4.47 4.35 1.06 6.15L12 16.3l-5.52 2.89 1.05-6.15L3.06 8.7l6.17-.9L12 2.2z" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="h-[6px] bg-[#d88942]" />

                                    <div className="px-4 pt-3 pb-4">
                                        <h3 className="text-[22px] leading-[1.08] font-semibold text-[#13161b] tracking-[-0.02em] mb-2.5">
                                            {item.title}
                                        </h3>

                                        <div className="space-y-1.5 text-[#22272e] mb-3 mt-4">
                                            <div className="flex items-center gap-2 text-[18px] leading-[1.1] font-medium">
                                                <span className="text-[#de8a3f]">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                                        <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
                                                        <circle cx="12" cy="10" r="2.8" />
                                                    </svg>
                                                </span>
                                                <span className='text-sm'>{item.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[18px] leading-[1.1] font-medium">
                                                <span className="text-[#de8a3f]">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                                        <circle cx="12" cy="12" r="9" />
                                                        <path d="M12 7v5l3 2" />
                                                    </svg>
                                                </span>
                                                <span className='text-sm'>{item.duration}</span>
                                            </div>
                                        </div>

                                        <p className="text-[24px] leading-[1] mt-1 font-extrabold text-[#111418] tracking-[-0.02em] mb-3">
                                            {item.price}
                                        </p>

                                        <div className="flex items-center gap-2 pt-3">
                                            <Link href={item.detailsHref} className="flex-1">
                                                <button className="w-full h-[42px] rounded-[12px] border-2 border-[#273443] text-[#1f4d73] text-sm font-medium cursor-pointer leading-none hover:bg-[#e6edf6] transition-colors">
                                                    Details
                                                </button>
                                            </Link>
                                            <Link href={`/apply/tourism/${item.id}`} className="flex-1">
                                                <button className="w-full h-[42px] rounded-[12px] bg-[#d68943] text-white text-sm font-medium cursor-pointer leading-none hover:bg-[#c97a35] transition-colors">
                                                    Apply Now
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => setCurrentFeaturedPage((page) => Math.min(Math.ceil(featuredDestinations.length / featuredPerPage), page + 1))}
                            disabled={currentFeaturedPage === Math.ceil(featuredDestinations.length / featuredPerPage)}
                            className="absolute right-[-22px] md:right-[-50px] top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center text-black cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed hover:text-black transition-colors z-20"
                            aria-label="Next page"
                        >
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex justify-center items-center gap-4 mt-8 text-[#1f2937]">
                        {Array.from({ length: Math.ceil(featuredDestinations.length / featuredPerPage) }, (_, index) => index + 1).map((pageNumber) => (
                            <button
                                key={pageNumber}
                                type="button"
                                onClick={() => setCurrentFeaturedPage(pageNumber)}
                                className={`h-3 w-3 rounded-full border border-[#9ca3af] transition-all ${currentFeaturedPage === pageNumber
                                        ? 'bg-[#2a6d97] border-[#2a6d97]'
                                        : 'bg-white hover:bg-[#e5e7eb]'
                                    }`}
                                aria-label={`Go to page ${pageNumber}`}
                                aria-current={currentFeaturedPage === pageNumber ? 'page' : undefined}
                            />
                        ))}
                    </div>
                </div>
            </section>  */}

            {/* Browse All Packages Section */}
            {/* <section className="w-full bg-white px-6 md:px-12 lg:px-16 py-14 md:py-16" id="browseAll"> */}
            {/* <div className="max-w-[1220px] mx-auto"> */}
            {/* Header */}

            {/* <div className=" pl-4 mb-8">
                        <h2 className="text-4xl md:text-5xl font-semibold text-black mb-2">Browse All Packages</h2>
                        <p className="text-gray-800 text-2xl mt-4">Choose your category to view available packages</p>
                    </div> */}

            {/* Filter and Search Bar */}
            {/* <div className="flex flex-wrap items-center gap-3 mb-10">
                        <button onClick={() => setActiveFilter('all')} className={`px-6 cursor-pointer py-2 rounded-2xl font-medium text-base transition-all ${activeFilter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-300 text-black hover:bg-gray-400'}`}>
                            All Packages
                        </button>
                        <button onClick={() => setActiveFilter('umrah')} className={`px-8 cursor-pointer py-2 rounded-2xl font-medium text-base transition-all ${activeFilter === 'umrah' ? 'bg-green-600 text-white' : 'bg-gray-300 text-black hover:bg-gray-400'}`}>
                            Umrah
                        </button>
                        <button onClick={() => setActiveFilter('hajj')} className={`px-8 cursor-pointer py-2 rounded-2xl font-medium text-base transition-all ${activeFilter === 'hajj' ? 'bg-green-600 text-white' : 'bg-gray-300 text-black hover:bg-gray-400'}`}>
                            Hajj
                        </button>
                        <button onClick={() => setActiveFilter('international')} className={`px-8 cursor-pointer py-2 rounded-2xl text-base font-medium transition-all ${activeFilter === 'international' ? 'bg-green-600 text-white' : 'bg-gray-300 text-black hover:bg-gray-400'}`}>
                            Out of Country Packages
                        </button>
                        <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="ml-auto px-4 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500" />
                    </div> */}

            {/* Packages Grid */}
            {/* <div className="relative">
                        <button
                            type="button"
                            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                            disabled={currentPageSafe === 1}
                            className="absolute left-[-28px] md:left-[-50px] top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center text-black cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed hover:text-black transition-colors z-20"
                            aria-label="Previous page"
                        >
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {visiblePackages.map((pkg) => (
                                <div key={pkg.id} className="border-2 max-w-[360px] border-gray-700 overflow-hidden bg-white">
                                    <div className="relative">
                                        <img src={pkg.image} alt={pkg.title} className="w-full h-52 object-cover" />
                                        <div className={`absolute top-0 right-3 ${pkg.statusColor} text-white px-4 py-2 rounded-md text-sm font-semibold`}>
                                            {pkg.status}
                                        </div>
                                    </div>
                                    <div className="h-1 bg-orange-500" />
                                    <div className="p-5">
                                        <h3 className="text-xl font-bold ml-3 text-black mb-4">{pkg.title}</h3>
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d68943" strokeWidth="2"><path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.8" /></svg>
                                                <span className="text-base">{pkg.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d68943" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                                                <span className="text-base">{pkg.duration}</span>
                                            </div>
                                        </div>
                                        <p className="text-2xl font-bold text-black mb-1">{pkg.price}</p>
                                        <p className="text-gray-500 text-sm mb-4">per person</p>
                                        <div className="mb-5">
                                            <p className="text-base font-semibold text-gray-800 mb-2">Includes:</p>
                                            <div className="space-y-1 flex  gap-2 items-center">
                                                {pkg.includes.map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-sm p-2 rounded-lg text-gray-700 bg-[#EBF0F3]">
                                                        <svg width="14" height="14" className="text-[#EBF0F3]" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                                                        <span>{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <Link href={`/tourism/${pkg.id}`} className="flex-1">
                                                <button className="w-full px-4 py-2 border-2 border-gray-700 text-[#275D84] cursor-pointer font-semibold rounded-2xl hover:bg-gray-100 transition-colors">
                                                    Details
                                                </button>
                                            </Link>
                                    <Link href={`/apply/tourism/${pkg.id}`} className="flex-1">
                                                <button className="w-full px-4 py-2 bg-[#D08348] cursor-pointer text-white font-semibold rounded-2xl hover:bg-[#B8733F] transition-colors">
                                                    Apply Now
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                            disabled={currentPageSafe === totalPages}
                            className="absolute right-[-28px] md:right-[-50px] top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center text-black cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed hover:text-black transition-colors z-20"
                            aria-label="Next page"
                        >
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex justify-center items-center gap-4 mt-8 text-[#1f2937]">
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                            <button
                                key={pageNumber}
                                type="button"
                                onClick={() => setCurrentPage(pageNumber)}
                                className={`h-3 w-3 rounded-full border border-[#9ca3af] transition-all ${currentPageSafe === pageNumber
                                    ? 'bg-[#2a6d97] border-[#2a6d97]'
                                    : 'bg-white hover:bg-[#e5e7eb]'
                                    }`}
                                aria-label={`Go to page ${pageNumber}`}
                                aria-current={currentPageSafe === pageNumber ? 'page' : undefined}
                            />
                        ))}
                    </div>
                </div> */}
            {/* </section>   */}

            <WhyChoose />
            <PhotoGallery />

            {/* CTA Section - Ready to Book */}
            {/* <section className="w-full relative" style={{ height: '400px' }}>
               
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        backgroundImage: 'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.4) 100%), url("/jeelImage.png")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'scroll'
                    }}
                />

                
                <div className="relative h-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-4 leading-tight">
                        Ready to Book Your Next Journey?
                    </h2>
                    <p className="text-lg md:text-2xl text-gray-100 text-center mb-8 max-w-2xl">
                        Don&apos;t miss out on the adventure of a lifetime. Limited seats available!
                    </p>
                    <Link href={`/apply/tourism/${pkg.id}`}>
                        <button className="px-10 py-4 bg-[#D08348] hover:bg-[#b86f3a] cursor-pointer text-white font-semibold rounded-2xl transition-all duration-300 text-base">
                            Apply Now
                        </button>
                    </Link>
                </div>
            </section> */}

            <Footer />
        </div>
    )
}

