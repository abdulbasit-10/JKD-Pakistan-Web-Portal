"use client";

import { use, useState } from 'react'
import Footer from '@/component/Footer'
import Header from '@/component/Header'
import tourismData from '@/data/tourism.json'  // ✅ Fix — default import
import Image from 'next/image'
import Link from 'next/link'
import TourismApplyFormClient from './TourismApplyFormClient'

export default function TourismApplyPage({ params }) {
    const { id } = use(params)
    const packageId = String(id)
    const trip = tourismData.tripDetails[packageId]
    const [successData, setSuccessData] = useState(null)

    if (!trip) {
        return (
            <div className="min-h-screen bg-white py-16 px-4 text-center">
                <h1 className="text-2xl font-bold text-[#173a5a]">Package not found</h1>
                <p className="mt-3 text-sm text-[#475569]">The tourism package you tried to access does not exist.</p>
                <div className="mt-6">
                    <Link href="/tourism" className="rounded-md bg-[#d68943] px-5 py-3 text-sm font-semibold text-white hover:bg-[#b36f36]">
                        Back to tourism packages
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full bg-white text-[#17212b]">
            <Header />

            <main className="relative overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
                <div className="absolute inset-0 " />
                <div className="relative mx-auto max-w-5xl rounded-[18px] bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.12)] sm:p-6 lg:p-8">
                    <div className="mb-4 flex items-center justify-start">
                        <Link
                            href="/tourism"
                            className="inline-flex items-center gap-2 rounded-md bg-[#f3f6fa] px-3 py-1.5 text-[12px] font-medium text-[#2a536f] transition hover:bg-[#e7edf5]"
                        >
                            {/* <span aria-hidden="true">←</span> */}
                            <Image
                                src="/icons/arrowrtol.svg"

                                alt="Back Icon"
                                width={16}
                                height={16}
                            />
                            <span>Back to Packages</span>
                        </Link>
                    </div>

                    <div className="mx-auto max-w-4xl rounded-[16px] bg-[#f2f6f8] p-4 sm:p-6 lg:p-8">
                        {successData ? (
                            <div className="mx-auto max-w-2xl rounded-[28px] border border-[#e2e8f0] bg-white px-6 py-8 shadow-[0_24px_80px_rgba(15,23,42,0.12)] sm:px-10 sm:py-10">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#edf9ef] text-[#0f7a45] shadow-sm">
                                    <span className="text-3xl">✓</span>
                                </div>

                                <div className="mt-6 text-center">
                                    <p className="text-sm font-semibold tracking-[0.18em] text-[#205d91]">Booking Request Submitted Successfully!</p>
                                    <h2 className="mt-3 text-2xl font-bold text-[#173a5a] sm:text-3xl">Thank you for choosing JKD Pakistan.</h2>
                                    <p className="mx-auto mt-3 max-w-[580px] text-sm leading-6 text-[#475569] sm:text-base">
                                        Our tourism team will contact you within 24-48 hours to confirm your booking and provide further details.
                                    </p>
                                </div>

                                <div className="mt-8 rounded-[22px] bg-[#f8fafc] p-6 sm:p-8">
                                    <div className="grid gap-4 text-sm text-[#475569] sm:grid-cols-2">
                                        <div className="rounded-[16px] bg-white p-5 shadow-sm">
                                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#94a3b8]">Booking ID</p>
                                            <p className="mt-2 text-lg font-semibold text-[#14334f]">{successData.bookingId}</p>
                                        </div>
                                        <div className="rounded-[16px] bg-white p-5 shadow-sm">
                                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#94a3b8]">Package</p>
                                            <p className="mt-2 text-lg font-semibold text-[#14334f]">{successData.packageName}</p>
                                        </div>
                                        <div className="rounded-[16px] bg-white p-5 shadow-sm">
                                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#94a3b8]">Persons</p>
                                            <p className="mt-2 text-lg font-semibold text-[#14334f]">{successData.persons}</p>
                                        </div>
                                        <div className="rounded-[16px] bg-white p-5 shadow-sm">
                                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#94a3b8]">Travel Date</p>
                                            <p className="mt-2 text-lg font-semibold text-[#14334f]">{successData.travelDate}</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 border-t border-[#d8e2ea] pt-5 text-center text-sm text-[#475569] sm:text-base">
                                        A confirmation email has been sent to <span className="font-semibold text-[#0f172a]">{successData.email}</span>.
                                        Please save your Booking ID for future reference and communication.
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                                    <Link
                                        href="/"
                                        className="inline-flex justify-center rounded-[12px] border border-[#1f4d73] bg-white px-6 py-3 text-sm font-semibold text-[#1f4d73] transition hover:bg-[#f1f7fb]"
                                    >
                                        Back to Home
                                    </Link>
                                    <Link
                                        href="/tourism"
                                        className="inline-flex justify-center rounded-[12px] bg-[#d68943] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#b36f36]"
                                    >
                                        Explore More Packages
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="mb-6 text-center">
                                    <h1 className="mt-2 text-[24px] font-bold text-[#275d84] sm:text-[32px]">
                                        Apply for Tourism Package
                                    </h1>
                                    <p className="mt-2 text-[13px] text-black sm:text-[15px]">
                                        Fill out the form below to submit your booking request
                                    </p>
                                </div>

                                <div className="mb-6 overflow-hidden rounded-[14px] border border-[#d8e0ea] bg-[#DBE2EC] px-4 py-4 sm:px-5 sm:py-5">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-[18px]">Selected Package:</p>
                                            <h2 className="mt-1 text-[18px] font-bold text-[#275D84] sm:text-[22px]">
                                                {trip.title}
                                            </h2>
                                            <p className="mt-1 text-[13px] sm:text-[18px]">
                                                {trip.price} per person
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <TourismApplyFormClient packageId={packageId} trip={trip} onSuccess={setSuccessData} />
                            </>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
