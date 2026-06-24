"use client"
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { BiHide, BiShow } from 'react-icons/bi';
import { toast } from 'react-toastify';
import axiosInstance from '@/lib/axios';
import Header from '@/component/Header';
import Footer from '@/component/Footer';

const ResetPasswordClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const emailParam = searchParams.get('email'); 

  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [visibility, setVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const [isForgotPasswordFlow, setIsForgotPasswordFlow] = useState(false);

  useEffect(() => {
    if (token && emailParam) {
      setIsForgotPasswordFlow(true);
    }
  }, [token, emailParam]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleVisibility = (field) => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isForgotPasswordFlow) {
      if (!form.newPassword || !form.confirmPassword) {
        toast.error('All fields are required.');
        return;
      }

      if (form.newPassword !== form.confirmPassword) {
        toast.error('New passwords do not match.');
        return;
      }

      if (form.newPassword.length < 6) {
        toast.error('Password must be at least 6 characters.');
        return;
      }

      setLoading(true);

      try {
        const { data } = await axiosInstance.post('/api/auth/reset-password', {
          token,
          email: emailParam,
          newPassword: form.newPassword,
          confirmPassword: form.confirmPassword,
        });

        toast.success(data?.message || 'Password reset successfully.');
        setForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
        
        setTimeout(() => {
          router.push('/reset-password-success');
        }, 2000);
      } catch (error) {
        console.error('Reset password error:', error);
        const errorMsg = error?.response?.data?.error || 'Failed to reset password';
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    } else {
      // Original change password flow
      if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
        toast.error('All fields are required.');
        return;
      }

      if (form.newPassword !== form.confirmPassword) {
        toast.error('New passwords do not match.');
        return;
      }

      if (form.newPassword.length < 6) {
        toast.error('Password must be at least 6 characters.');
        return;
      }

      setLoading(true);

      try {
        const { data } = await axiosInstance.put('/api/users/change-password', {
          currentPassword: form.oldPassword,
          newPassword: form.newPassword,
          confirmPassword: form.confirmPassword,
        });

        toast.success(data?.message || 'Password changed successfully.');
        setForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
        
        setTimeout(() => {
          router.push('/reset-password-success');
        }, 2000);
      } catch (error) {
        console.error('Change password error:', error);
        const errorMsg = error?.response?.data?.error || 'Failed to change password';
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Header />
      <section className="w-full bg-gradient-to-b from-[#275D84] via-[#6f8ca5] to-[#B3B3B3] px-4 py-10 min-h-[calc(100vh-80px)] flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[560px] rounded-md bg-[#DBE1E7] p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-sm"
        >
          <h2 className="text-[32px] leading-none font-bold">
            {isForgotPasswordFlow ? 'Reset Password' : 'Change Password'}?
          </h2>
          <p className="mt-2 text-[16px] text-[#515B73] leading-6">
            {isForgotPasswordFlow
              ? 'Enter your new password to regain access to your account'
              : 'Enter New Password & Confirm Password to get inside'}
          </p>

          {/* Old Password - Only show if not forgot password flow */}
          {!isForgotPasswordFlow && (
            <div className="w-full mt-6">
              <label className="block font-semibold text-[18px] text-[#2b3f61]">Old Password</label>
              <div className="relative">
                {visibility.oldPassword ? (
                  <BiHide
                    className="cursor-pointer absolute top-1/2 right-3 transform -translate-y-1/2 text-[#275D84] text-sm"
                    onClick={() => toggleVisibility('oldPassword')}
                  />
                ) : (
                  <BiShow
                    className="cursor-pointer absolute top-1/2 right-3 transform -translate-y-1/2 text-[#275D84] text-sm"
                    onClick={() => toggleVisibility('oldPassword')}
                  />
                )}
                <input
                  type={visibility.oldPassword ? 'text' : 'password'}
                  name="oldPassword"
                  value={form.oldPassword}
                  onChange={handleChange}
                  placeholder=""
                  autoComplete="current-password"
                  className="mt-1 bg-white px-3 py-2 rounded-lg w-full outline-none pr-9 text-[#1f2f4d]"
                  required
                />
              </div>
            </div>
          )}

          {/* New Password */}
          <div className="w-full mt-4">
            <label className="block font-semibold text-[18px] text-[#2b3f61]">New Password</label>
            <div className="relative">
              {visibility.newPassword ? (
                <BiHide
                  className="cursor-pointer absolute top-1/2 right-3 transform -translate-y-1/2 text-[#275D84] text-sm"
                  onClick={() => toggleVisibility('newPassword')}
                />
              ) : (
                <BiShow
                  className="cursor-pointer absolute top-1/2 right-3 transform -translate-y-1/2 text-[#275D84] text-sm"
                  onClick={() => toggleVisibility('newPassword')}
                />
              )}
              <input
                type={visibility.newPassword ? 'text' : 'password'}
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder=""
                autoComplete="new-password"
                className="mt-1 bg-white px-3 py-2 rounded-lg w-full outline-none pr-9 text-[#1f2f4d]"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="w-full mt-4">
            <label className="block font-semibold text-[18px] text-[#2b3f61]">New Confirm Password</label>
            <div className="relative">
              {visibility.confirmPassword ? (
                <BiHide
                  className="cursor-pointer absolute top-1/2 right-3 transform -translate-y-1/2 text-[#275D84] text-sm"
                  onClick={() => toggleVisibility('confirmPassword')}
                />
              ) : (
                <BiShow
                  className="cursor-pointer absolute top-1/2 right-3 transform -translate-y-1/2 text-[#275D84] text-sm"
                  onClick={() => toggleVisibility('confirmPassword')}
                />
              )}
              <input
                type={visibility.confirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder=""
                autoComplete="new-password"
                className="mt-1 bg-white px-3 py-2 rounded-lg w-full outline-none pr-9 text-[#1f2f4d]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 block px-4 py-2 w-full rounded-[4px] bg-[#2e638f] hover:bg-[#28597f] transition cursor-pointer text-white text-[18px] disabled:opacity-60"
          >
            {loading ? 'Processing...' : isForgotPasswordFlow ? 'Reset Password' : 'Change Password'}
          </button>

          <p className="mt-4 text-center text-[16px]">
            Return to{' '}
            <Link href="/login" className="text-[#275D84] hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default ResetPasswordClient;
