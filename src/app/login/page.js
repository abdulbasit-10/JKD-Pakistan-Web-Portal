'use client';

import { useState , useEffect} from 'react';
import { useRouter } from 'next/navigation';
// import { FaLock, FaEnvelope , FaUnlock } from 'react-icons/fa';
import { BiHide , BiShow } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import { useGlobal } from '@/context/GlobleContext';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import axiosInstance from '@/lib/axios';
// import Loginimage from '../../../public/Image123.jpg';
import { toast } from 'react-toastify';
import LoadingScreen from '@/component/LoadingScreen';
import Link from 'next/link';

const Login = () => {
  const {theme , dispatch} = useGlobal();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: ""});
  const [loading, setLoading] = useState(false);
  const [view , setView] = useState(false)
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault()
  const { email, password } = form;

  if (!email || !password) {
    toast.error("Email and password are required.");
    return;
  }

  setLoading(true);

  try {
    const response = await axiosInstance.post("/api/auth/login", {
      email,
      password,
    });

    const data = response.data;
    dispatch({ type: "LOGIN", payload: data.user });
    toast.success(data.message || "Login successful");
    if(data.user.role === 'admin' ){
      router.push("/admin"  );
    }else{
      router.push("/student");
    }
    } catch (err) {
    const errorMessage = err.response?.data?.error || "Something went wrong. Please try again.";
    toast.error(errorMessage);
  } finally {
    setLoading(false);
  }
};

  const [screenLoading, setScreenLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreenLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (screenLoading) return <LoadingScreen />;

  return (
    <>
      <Header />
      <section className="w-full bg-gradient-to-b from-[#275D84] via-[#6f8ca5] to-[#B3B3B3] px-4 py-10  min-h-[calc(100vh-80px)] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-[420px] rounded-md bg-[#DBE1E7] p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm ">
        <h2 className='text-3xl  leading-none font-bold '>Log in</h2>
        <p className='mt-1 text-[16px] text-[#275D84] font-normal'>Please enter your details to sign in</p>

        {/* Email */}
        <div className="w-full mt-6">
            <label className='font-semibold text-[18px]'>Email Address</label>
            <div className='relative'>
                <MdOutlineEmail className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#275D84] text-sm" />
                <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder=""
                autoComplete='new-email'
                className="mt-1 bg-[#f6f8fb] px-3 py-2 rounded-lg w-full outline-none pr-9 text-[#1f2f4d]"
                required
                />
            </div>
        </div>
        {/* Password */}
        <div className="w-full mt-4">                    
            <label className='font-semibold text-[18px] '>Password</label>
            <div className='relative'>
            {view ? 
            (<BiHide  className="cursor-pointer absolute top-1/2 right-3 transform -translate-y-1/2 text-[#275D84] text-sm" onClick={() =>setView(false)} />)
            :               
            (<BiShow className="cursor-pointer absolute top-1/2 right-3 transform -translate-y-1/2 text-[#275D84] text-sm" onClick={() =>setView(true)} />)
            }
            <input
            type={view ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete='new-password'
            placeholder=""
            className="mt-1 bg-[#f6f8fb] rounded-lg px-3 py-2 w-full outline-none pr-9 text-[#1f2f4d]"
            required
            />
            </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-[13px]">
          <label className="flex items-center gap-2 text-[#202C4B]">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-3.5 w-3.5  accent-[#3e6392]"
            />
            Remember Me
          </label>
          <Link href="/forgot-password" className="text-[#E82646] hover:underline cursor-pointer">Forgot Password?</Link>
        </div>

        {/* button */}
        <button
            type="submit"
            disabled={loading}
            className={`mt-7 block px-4 py-2 w-full rounded-[4px] ${theme === 'light' ? 'bg-[#4d72a3] hover:bg-[#3f5f8b]' : 'bg-[#4d72a3] hover:bg-[#3f5f8b]'} transition cursor-pointer text-white text-base disabled:opacity-60`}
        >
            {loading ? "Logging in..." : "Login"}
        </button>
        {/* creat and update links */}
        <p className="mt-4 text-center text-[16px] text-[#202C4B]">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[#406695] hover:underline">
            Create Account
          </Link>
        </p>
      </form>
      </section>
      <Footer />
    </>
  );
};

export default Login;
