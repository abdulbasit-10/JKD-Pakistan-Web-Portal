'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MdOutlineEmail } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { BiHide , BiShow } from "react-icons/bi";
import { useGlobal } from '@/context/GlobleContext';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import axiosInstance from '@/lib/axios';
import { toast } from 'react-toastify';

const Login = () => {
  const {state} = useGlobal();
  const {theme} = state;
  const router = useRouter();
  const [form, setForm] = useState({userName:"", email: "", password: "" , confirmPassword:""});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false);

const handleChange = (e) => {
  const { name, value } = e.target;
  setForm((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const { userName, email, password, confirmPassword } = form;

  if (!email || !password) {
    toast.error("Email and password are required.");
    return;
  }

  setLoading(true);

  try {
    const response = await axiosInstance.post("/api/users/signup", {
      userName,
      email,
      password,
      confirmPassword,
    });
    const data = response.data;

    // ✅ Ab yahan auto-login nahi hoga — sirf success message aur login page pe redirect
    toast.success(data.message || "Signup successful! Please login to continue.");
    router.push("/login");

  } catch (err) {
    toast.error(err.response?.data?.message || "Something went wrong. Please try again later.");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
    <Header />
    <section className="w-full bg-gradient-to-br from-[#275D84] via-[#6f8ca5] to-[#b1b4b8] px-4 py-10  min-h-[calc(100vh-80px)] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-[420px] rounded-md bg-[#DBE1E7] p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm border border-white/40">
        <h2 className='text-[32px] leading-none font-semibold text-[#22345a]'>Register</h2>
        <p className='mt-1 text-[16px] text-[#46638a]'>Please enter your details to sign up</p>

        <div className="w-full  ">
            <label className='mt-6 block font-semibold text-[18px] '>Name</label>
            <div className='relative'>
            <LuUser className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#275D84] text-sm" />
                <input
                type="text"
                name="userName"
                value={form.userName}
                onChange={handleChange}
                placeholder=""
                autoComplete="off"
                className="mt-1 bg-[#f6f8fb] px-3 py-2 rounded-lg w-full outline-none pr-9 text-[#1f2f4d]"
                required
                />                
            </div>
        </div>

        <div className="w-full  ">
            <label className='mt-4 block font-semibold text-[18px] '>Email Address</label>
            <div className='relative'>
            <MdOutlineEmail className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#275D84] text-sm" />
                <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="off" 
                placeholder=""
                className="mt-1 bg-[#f6f8fb] px-3 py-2 rounded-lg w-full outline-none pr-9 text-[#1f2f4d]"
                required
                />
            </div>
        </div>

        <div className="w-full">
            <label className='mt-4 block font-semibold text-[18px] '>Password</label>
            <div className='relative'>
            {showPassword ? 
          (<BiHide className="cursor-pointer absolute top-1/2 right-3 transform -translate-y-1/2 text-[#275D84] text-sm" onClick={() =>setShowPassword(false)} />)
                :               
          (<BiShow className="cursor-pointer absolute top-1/2 right-3 transform -translate-y-1/2 text-[#275D84] text-sm" onClick={() =>setShowPassword(true)} />)
                }
                <input
            type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder=""
                className="mt-1 bg-[#f6f8fb] px-3 py-2 rounded-lg w-full outline-none pr-9 text-[#1f2f4d]"
                required 
                />
            </div>
        </div>

        <div className="w-full  ">
            <label className='mt-4 block font-semibold text-[18px] '>Confirm Password</label>
            <div className='relative'>
            {showConfirmPassword ? 
          (<BiHide className="cursor-pointer absolute top-1/2 right-3 transform -translate-y-1/2 text-[#275D84] text-sm" onClick={() =>setShowConfirmPassword(false)} />)
                :               
          (<BiShow className="cursor-pointer absolute top-1/2 right-3 transform -translate-y-1/2 text-[#275D84] text-sm" onClick={() =>setShowConfirmPassword(true)} />)
                }
                <input
            type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder=""
                className="mt-1 bg-[#f6f8fb] px-3 py-2 rounded-lg w-full outline-none pr-9 text-[#1f2f4d]"
                required
                />
            </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <input
            type="checkbox"
            id="agreeTerms"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            className="h-3.5 w-3.5 accent-[#3e6392]"
          />
          <label htmlFor="agreeTerms" className="text-[13px] ">
            I Agree to <span className="text-[#275D84] hover:underline cursor-pointer">Terms & Privacy</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-7 block px-4 py-2 w-full rounded-[4px] ${theme === 'light' ? 'bg-[#4A709F] hover:bg-[#3f5f8b]' : 'bg-[#4d72a3] hover:bg-[#3f5f8b]'} transition cursor-pointer text-white text-base disabled:opacity-60`}
        >
          {loading ? "Signing in..." : "Sign Up"}
        </button>

        <p className="mt-4 text-center text-[14px]">
          Already have an account?{' '}
          <Link href="/login" className="text-[#406695] hover:underline">
            Login
          </Link>
        </p>
      </form>
    </section>
      <Footer />
      </>
  );
};

export default Login;
