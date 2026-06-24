"use client"

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Header from '@/component/Header'
import Footer from '@/component/Footer'

const tabs = ['Gallery', 'Press Release', 'MOUs', 'Conference']

const mediaItems = [
    { id: 1, title: 'Annual IT Conference', image: '/anualConference.png', category: 'Conference', date: null },
    { id: 2, title: 'Training Workshop', image: '/trainingWorkshop.png', category: 'Gallery', date: null },
    { id: 3, title: 'Community Event', image: '/communityEvent.png', category: 'Gallery', date: null },
    { id: 4, title: 'Certification Ceremony', image: '/certificatesCermony.png', category: 'MOUs', date: 'May 2, 2026' },
    { id: 5, title: 'Youth Leadership Summit', image: '/youthSummit.png', category: 'Press Release', date: 'March 1, 2026' },
    { id: 6, title: 'Umrah Group Departure', image: '/unmrahDeparture.png', category: 'Gallery', date: 'April 1, 2026' },
    { id: 7, title: 'Umrah Group Departure', image: '/unmrahDeparture.png', category: 'Gallery', date: 'April 1, 2026' },
    { id: 8, title: 'Umrah Group Departure', image: '/unmrahDeparture.png', category: 'Gallery', date: 'April 1, 2026' },
    { id: 9, title: 'Umrah Group Departure', image: '/unmrahDeparture.png', category: 'Gallery', date: 'April 1, 2026' },
    { id: 10, title: 'Umrah Group Departure', image: '/unmrahDeparture.png', category: 'Gallery', date: 'April 1, 2026' },
    { id: 11, title: 'Umrah Group Departure', image: '/unmrahDeparture.png', category: 'Gallery', date: 'April 1, 2026' },
    { id: 12, title: 'Umrah Group Departure', image: '/unmrahDeparture.png', category: 'Gallery', date: 'April 1, 2026' },
    { id: 13, title: 'Umrah Group Departure', image: '/unmrahDeparture.png', category: 'Gallery', date: 'April 1, 2026' },
    { id: 14, title: 'Umrah Group Departure', image: '/unmrahDeparture.png', category: 'Gallery', date: 'April 1, 2026' }
]

const heroBg = '/mediaUpdates.png'

const Media = () => {
    const [activeTab, setActiveTab] = useState('Gallery')
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 12

    const filteredItems = useMemo(() => {
        if (activeTab === 'Gallery') return mediaItems
        return mediaItems.filter((item) => item.category === activeTab)
    }, [activeTab])

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

    const paginatedItems = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage
        return filteredItems.slice(start, start + itemsPerPage)
    }, [filteredItems, currentPage])

    const handleTabChange = (tab) => {
        setActiveTab(tab)
        setCurrentPage(1)
    }

    return (
        <div className="min-h-screen w-full">
            <Header />

            {/* Hero Section */}
            <section
                className="relative overflow-hidden bg-cover bg-center md:py-16 py-10"
                style={{ backgroundImage: `url(${heroBg})` }}
            >
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
                    <h1 className="text-[18px] md:text-[40px] font-bold text-white">
                        Media & Updates
                    </h1>
                    <p className="mt-4 text-lg text-white/85">
                        Stay updated with our latest news, events, and collaborations
                    </p>
                </div>
            </section>

            <main className="mx-auto max-w-8xl px-4 py-7 sm:px-6 lg:px-12">

                {/* Tabs */}
                {/* <div className="mb-6 flex flex-wrap justify-center gap-3">
                    {tabs.map((tab) => {
                        const isActive = tab === activeTab
                        return (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
                                className={`px-4 py-2 rounded-lg text-sm ${
                                    isActive ? 'bg-green-600 text-white' : 'bg-gray-200'
                                }`}
                            >
                                {tab}
                            </button>
                        )
                    })}
                </div> */}

                {/* Grid */}
                {paginatedItems.length === 0 ? (
                    <div className="text-center text-gray-500">
                        No items found
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {paginatedItems.map((item) => (
                            <article key={item.id} className="overflow-hidden rounded-2xl border-2 border-gray-400 bg-white shadow">
                                <div className="relative h-[190px] w-full">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="px-3 py-3">
                                    <h3 className="text-[16px] font-semibold text-[#2f5f8a]">
                                        {item.title}
                                    </h3>

                                    {item.date && (
                                        <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-[#4d6f8f]">
                                            <Image
                                                src="/icons/duration3.svg"
                                                alt="Calendar"
                                                width={14}
                                                height={14}
                                            />
                                            <span>{item.date}</span>
                                        </p>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                {/* Pagination Buttons */}
                <div className="mt-8 flex justify-center items-center gap-4">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 cursor-pointer rounded disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <span className="text-sm font-medium">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-200 cursor-pointer rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default Media