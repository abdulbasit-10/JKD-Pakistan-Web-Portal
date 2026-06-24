'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MdOutlineEmail } from 'react-icons/md';
import { toast } from 'react-toastify';
import axiosInstance from '@/lib/axios';
import Header from '@/component/Header';
import Footer from '@/component/Footer';

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Email is required.');
      return;
    }

    setLoading(true);

    try {
      const { data } = await axiosInstance.post('/api/auth/forgot-password', { email });
      toast.success(data?.message || 'If this email exists, reset instructions have been sent.');
      setEmail('');
      
      // In development, redirect with token if available
      if (data?.resetLink) {
        setTimeout(() => {
          window.location.href = data.resetLink;
        }, 2000);
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      const errorMsg = error?.response?.data?.error || 'Failed to send reset email';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <section className="w-full bg-gradient-to-b from-[#275D84] via-[#6f8ca5] to-[#B3B3B3] px-4 py-10 min-h-[calc(100vh-80px)] flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[520px] rounded-md bg-[#DBE1E7] p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm"
        >
          <h2 className="text-[32px] leading-none font-bold">Forgot Password?</h2>
          <p className="mt-2 text-[16px] text-[#515B73] leading-6">
            If you forgot your password, well, then we&apos;ll email you instructions to reset your password.
          </p>

          <div className="w-full mt-8">
            <label className="font-semibold text-[18px] text-[#2b3f61]">Email Address</label>
            <div className="relative">
              <MdOutlineEmail className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#275D84] text-sm" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="mt-1 bg-white px-3 py-2 rounded-lg w-full outline-none pr-9 text-[#1f2f4d]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 block px-4 py-2 w-full rounded-lg bg-[#2e638f] hover:bg-[#28597f] transition cursor-pointer text-white text-[18px] disabled:opacity-60"
          >
            {loading ? 'Sending...' : 'Sign In'}
          </button>

          <p className="mt-4 text-center text-[16px] text-[#2b3f61]">
            Return to{' '}
            <Link href="/login" className="text-[#2d6a9c] hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default ForgotPassword;
