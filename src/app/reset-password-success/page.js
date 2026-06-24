'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MdCheckCircle } from 'react-icons/md';
import { TiTick } from "react-icons/ti";
import Header from '@/component/Header';
import Footer from '@/component/Footer';

const ResetPasswordSuccess = () => {
    return (
        <>
            <Header />
            <section className="w-full bg-gradient-to-b from-[#275D84] via-[#6f8ca5] to-[#B3B3B3] px-4 py-10 min-h-[calc(100vh-80px)] flex items-center justify-center">
                <div className="w-full max-w-[520px] rounded-md bg-[#DBE1E7] p-8 sm:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm text-center">
                    <div className="flex justify-center mb-4">

                        < div className="w-16 h-16 rounded-full bg-[#1ABE17] flex items-center justify-center">
                            {/* <TiTick className="text-green-500" size={32} /> */}
                            <Image
                                src="/icons/check.svg"
                                className='w-10 h-10'
                                alt="Success"
                                width={30}
                                height={30}
                            />

                        </div>
                    </div>

                    <h2 className="text-[32px] leading-none font-bold text-[#22345a]">Success</h2>

                    <p className="mt-3 text-[18px] text-[#515B73] leading-7">
                        Your Password Reset Successfully
                    </p>

                    <Link
                        href="/login"
                        className="mt-6 block px-4 py-2 w-full rounded bg-[#2e638f] hover:bg-[#28597f] transition cursor-pointer text-white text-[16px]"
                    >
                        Back to Log in
                    </Link>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default ResetPasswordSuccess;
