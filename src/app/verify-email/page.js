'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import Header from '@/component/Header';
import Footer from '@/component/Footer';

const VerifyEmailContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'xyz@example.com';
  const [resending, setResending] = useState(false);

  const handleResend = async () => {
    setResending(true);

    try {
      toast.success('Verification email sent again.');
    } finally {
      setResending(false);
    }
  };

  return (
    <>
      <Header />
      <section className="w-full bg-gradient-to-b from-[#275D84] via-[#6f8ca5] to-[#B3B3B3] px-4 py-10 min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="w-full max-w-[560px] rounded-md bg-[#DBE1E7] p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm text-center">
          <h2 className="text-[32px] leading-none font-bold text-[#22345a]">Verify your Email</h2>

          <p className="mt-3 text-[16px] text-[#515B73] leading-7">
            We&apos;ve sent a link to your email {email}.
            <br />
            Please follow the link inside to continue
          </p>

          <p className="mt-4 text-[18px] text-[#2b3f61]">
            Didn&apos;t receive an email?{' '}
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="text-[#2d6a9c] hover:underline disabled:opacity-60 cursor-pointer"
            >
              {resending ? 'Sending...' : 'Resend Link'}
            </button>
          </p>

          <Link
            href="/student"
            className="mt-6 block px-4 py-2 w-full rounded-lg bg-[#2e638f] hover:bg-[#28597f] transition cursor-pointer text-white text-[18px]"
          >
            Skip Now
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
};

const VerifyEmail = () => (
  <Suspense fallback={null}>
    <VerifyEmailContent />
  </Suspense>
);

export default VerifyEmail;
