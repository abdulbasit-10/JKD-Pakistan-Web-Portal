import Header from '@/component/Header'
import Footer from '@/component/Footer'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { tripDetails } from '@/data/tourism.json'
import Image from 'next/image'

export default async function TourismTripDetailsPage({ params }) {
    const { id, category } = await params
    const packageId = String(id)
    const trip = tripDetails[packageId]

    if (!trip) {
        notFound()
    }

    return (
        <div className="min-h-screen w-full bg-white flex flex-col justify-between">
            <Header />

            <main className="w-full px-3 sm:px-5 md:px-8 lg:px-10 py-4 md:py-6">
                <div className="max-w-[1220px] mx-auto rounded-[12px]  bg-white  shadow-lg">


                    <section className="rounded-tl-lg rounded-tr-lg relative overflow-hidden">
                        <Link href={category ? `/tourism/${category}` : '/tourism'} className="inline-flex items-center gap-2 absolute top-4 left-4 z-50 text-xs text-black bg-gray-100 px-3 py-2 rounded transition-colors">
                            {/* <span aria-hidden="true">←</span> */}
                            <img src="/icons/arrowrtol.svg" alt="Back Icon" className="h-3 w-3" />
                            Back
                        </Link>
                        <div
                            className="relative h-[280px] md:h-[420px] bg-cover bg-center "
                            style={{
                                backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.35) 100%), url(${trip.image})`
                            }}
                        >
                            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" /> */}

                            <div className="absolute left-4 right-4 bottom-4 md:left-6 md:right-6 md:bottom-12 text-white">
                                <h1 className="max-w-[360px] text-[28px] md:text-[44px] font-semibold leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">
                                    {trip.title}
                                </h1>

                                <div className="mt-4 flex flex-wrap items-center gap-4 text-white">
                                    <div className="flex items-center gap-2">
                                        <Image src="/icons/location.svg" alt="Duration Icon" 
                                        width={30} height={30}  />
                                        {/* <span className="text-[#f0b46a]">⌖</span> */}
                                        <span className="text-[14px] md:text-[18px] font-medium">{trip.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {/* <span className="text-[#f0b46a]">◷</span> */}
                                        <Image src="/icons/time.svg" alt="Duration Icon"  width={30} height={30} />
                                        <span className="text-[14px] md:text-[18px] font-medium">{trip.duration}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4 py-8 px-6">
                        <div className="rounded-2xl bg-[#f3f5f7]  p-3 flex items-center gap-3 w-[390px] min-h-[110px]">
                            <div className="h-12 w-12 rounded-full bg-[#dce6f1] text-[#3a5f83] flex items-center justify-center text-sm">
                                <Image src="/icons/duration3.svg" alt="Location Icon" className="h-6 w-6" width={24} height={24} />
                            </div>
                            <div>
                                <p className="text-[16px] ">Duration</p>
                                <p className="text-[16px] font-semibold text-[#111827]">{trip.duration}</p>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-[#f3f5f7]  p-3 flex items-center gap-3 w-[390px] min-h-[110px]">
                            <div className="h-12 w-12 rounded-full bg-[#f4e4d7] text-[#a86731] flex items-center justify-center text-sm">
                                <img src="/icons/person2.svg" alt="Location Icon" className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-[16px] ">Seats Available</p>
                                <p className="text-[16px] font-semibold text-[#111827]">{trip.seatsAvailable}</p>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-[#f3f5f7]  p-3 flex items-center gap-3 w-[390px] min-h-[110px]">
                            <div className="h-12 w-12 rounded-full bg-[#1d4f78] text-white flex items-center justify-center text-sm">
                                <img src="/icons/packagePrice.svg" alt="Location Icon" className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-[16px] ">Package Price</p>
                                <p className="text-[16px] font-semibold text-[#111827]">{trip.price}</p>
                            </div>
                        </div>
                    </section>

                    <section className="mt-5  px-6">
                        <h2 className="text-[18px] md:text-[26px] font-semibold text-[#275D84]">Package Description</h2>
                        <p className="text-[14px] md:text-[18px] mt-2 leading-relaxed">
                            {trip.description}
                        </p>
                    </section>

                    <section className="mt-5  px-6">
                        <h2 className="text-[18px] md:text-[26px] font-bold text-[#275D84] mb-3">Day-by-Day Plan</h2>
                        <div className="space-y-2">
                            {trip.itinerary.map((item, index) => (
                                <div
                                    key={item}
                                    className="bg-[#F7F9FB] rounded-md px-4 py-3 flex items-start gap-3"
                                >
                                    <div className="mt-0.5 h-6 w-6 rounded-full bg-[#d08348] text-white text-[11px] font-semibold flex items-center justify-center shrink-0">
                                        {index + 1}
                                    </div>
                                    <p className="text-[13px] md:text-[19px] text-[#1f2937]">{item}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 py-4 px-8">
                        <div>
                            <h2 className="text-[14px] md:text-[22px] font-semibold text-[#275D84] mb-2 flex items-center gap-2">
                                <Image
                                 src="/icons/hotelIcon.svg" 
                                 alt="Hotel Icon" 
                                 width={20}
                                 height={20}
                                />
                                Hotel Details
                            </h2>
                            <p className="text-[12px] md:text-[18px] leading-6 text-black">
                                {trip.hotelDetails}
                            </p>
                        </div>

                        <div className='px-4'>
                            <h2 className="text-[14px] md:text-[22px] font-semibold text-[#275D84] mb-2 flex items-center gap-2">
                                <Image
                                 src="/icons/transport.svg" 
                                 alt="Transport Icon" 
                                 width={35}
                                 height={35}
                                />
                                Transport Details
                            </h2>
                            <p className="text-[12px] md:text-[18px] leading-6 text-black">
                                {trip.transportDetails}
                            </p>
                        </div>
                    </section>

                    <section className="mt-6 px-8 ">
                        <h2 className="text-[18px] md:text-[24px] font-bold text-[#1f4d73] mb-3">Package Summary</h2>
                        <div className="bg-[#F7F9FB] rounded-lg p-4 space-y-3">
                            <div className="flex items-center justify-between gap-4 py-3 border-b border-[#d7dde5]">
                                <p className="text-[13px] md:text-[16px] text-[#1f2937] font-medium">Flight Tickets </p>
                                <p className="text-[13px] md:text-[16px] font-semibold text-[#111827]">PKR {trip.flightTickets}</p>
                            </div>
                            <div className="flex items-center justify-between gap-4 py-3 border-b border-[#d7dde5]">
                                <p className="text-[13px] md:text-[16px] text-[#1f2937] font-medium">Hotel Accommodation</p>
                                <p className="text-[13px] md:text-[16px] font-semibold text-[#111827]">PKR {trip.accomodation}</p>
                            </div>
                            <div className="flex items-center justify-between gap-4 py-3 border-b border-[#d7dde5]">
                                <p className="text-[13px] md:text-[16px] text-[#1f2937] font-medium">Adventure Activities</p>
                                <p className="text-[13px] md:text-[16px] font-semibold text-[#111827]">PKR {trip.visaProcess}</p>
                            </div>
                            <div className="flex items-center justify-between gap-4 py-3 border-b border-[#d7dde5]">
                                <p className="text-[13px] md:text-[16px] text-[#1f2937] font-medium">Transport & Services</p>
                                <p className="text-[13px] md:text-[16px] font-semibold text-[#111827]">PKR {trip.privateTransport}</p>
                            </div>

                            <div className="flex items-center justify-between gap-4 pt-4 border-t-4 ">
                                <p className="text-[16px] md:text-[20px] font-bold text-[#1f4d73]">Total Package Price</p>
                                <p className="text-[16px] md:text-[20px] font-bold text-[#d68943] whitespace-nowrap"> {trip.price}</p>
                            </div>
                        </div>
                    </section>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-8 p-10">
                        <Link href={category ? `/tourism/${category}` : '/tourism'} className="w-full">
                            <button className="w-full h-[52px] rounded-[10px] border-2 border-gray-700 cursor-pointer text-[#275D84] font-medium bg-white hover:bg-[#f4f6f8] transition-colors">
                                Back to Packages
                            </button>
                        </Link>
                        <Link href={`/apply/tourism/${id}`} className="w-full">
                            <button className="w-full h-[52px] py-4 cursor-pointer rounded-[10px] bg-[#d68943] text-white font-medium hover:bg-[#c97a35] transition-colors">
                                Apply Now
                            </button>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
