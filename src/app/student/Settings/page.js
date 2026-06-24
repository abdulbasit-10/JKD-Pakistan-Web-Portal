"use client";

import { useMemo, useState } from "react";
import { useGlobal } from "@/context/GlobleContext";
import StudentLeftSidebar from "@/component/studentLeftSidebar";
import { FiBell, FiLock, FiMail } from "react-icons/fi";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axios";

const SettingsPage = () => {
  const { state, dispatch } = useGlobal();
  const { user } = state;

  const initials = useMemo(() => {
    const fullName = user?.name || "Student";
    return fullName
      .split(" ")
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }, [user?.name]);

  // Account settings state
  const [accountUsername, setAccountUsername] = useState(user?.name || "");
  const [accountEmail, setAccountEmail] = useState(user?.email || "");
  const [accountLoading, setAccountLoading] = useState(false);

  // Password settings state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [courseReminders, setCourseReminders] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleUpdateAccount = async () => {
    if (!accountUsername.trim() || !accountEmail.trim()) {
      toast.error("Username and email are required");
      return;
    }

    try {
      setAccountLoading(true);
      const { data } = await axiosInstance.put("/api/users/profile", {
        fullName: accountUsername,
        userName: accountUsername,
        email: accountEmail,
      });

      if (data?.user) {
        dispatch({
          type: "LOGIN",
          payload: {
            ...user,
            name: data.user.name || data.user.fullName,
            email: data.user.email,
            userName: data.user.userName,
          },
        });
      }

      toast.success(data?.message || "Account updated successfully");
    } catch (error) {
      console.error("Update account error:", error);
      const errorMsg = error?.response?.data?.error || "Failed to update account";
      toast.error(errorMsg);
    } finally {
      setAccountLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All password fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password must match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setPasswordLoading(true);
      const { data } = await axiosInstance.put("/api/users/change-password", {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      // Clear password fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      toast.success(data?.message || "Password updated successfully");
    } catch (error) {
      console.error("Update password error:", error);
      const errorMsg = error?.response?.data?.error || "Failed to update password";
      toast.error(errorMsg);
    } finally {
      setPasswordLoading(false);
    }
  };

  const onDeleteConfirm = () => {
    setShowDeleteModal(false);
    toast.info("Delete account request received.");
  };

  return (
    <div className="flex h-screen w-full bg-white">
      <StudentLeftSidebar className="w-[20%] min-w-[280px]" />

      <main className="min-h-screen w-full overflow-auto px-4 py-6 md:px-8">
        <section className="mx-auto max-w-[1120px]">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-[32px] font-bold">Settings</h1>
              <p className="mt-1 text-base text-gray-700">Manage your account preferences and security settings</p>
            </div>
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="text-right">
                <p className="text-base font-semibold text-[#111827]">{user?.email || "student@example.com"}</p>
                <p className="text-sm text-[#6b7280]">Student</p>
              </div>
              <div className="grid h-14 w-14 place-items-center rounded-full bg-[#2b5d84] text-xs font-bold text-white">{initials}</div>
            </div>
          </div>

          <div className="space-y-5">
            <section className="rounded-2xl border border-[#d7ddda] bg-white py-8 px-12  shadow-[0_2px_8px_rgba(16,24,40,0.08)]">
              <div className="mb-4 flex items-center gap-3 ">
                <div className="grid h-14 w-14 place-items-center rounded-xl bg-[#d9e8ff] text-[#2563eb]">
                  <FiMail className="text-xl" />
                </div>
                <div>
                  <h2 className="text-[28px] font-bold ml-8">Account Settings</h2>
                  <p className="text-sm ml-8">Manage your account information</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field
                  label="Username"
                  value={accountUsername}
                  onChange={setAccountUsername}
                  placeholder="user_name"
                />
                <Field
                  label="Email"
                  value={accountEmail}
                  onChange={setAccountEmail}
                  placeholder="xyz@gmail.com"
                />
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleUpdateAccount}
                  disabled={accountLoading}
                  className="rounded-2xl cursor-pointer bg-[#275D84] px-6 py-2.5 text-base font-medium text-white transition-colors hover:bg-[#1f4b6a] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {accountLoading ? "Updating..." : "Update Account"}
                </button>
              </div>
            </section>

            <section className="rounded-2xl border border-[#d7ddda] bg-white py-8 px-12  shadow-[0_2px_8px_rgba(16,24,40,0.08)]">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center  rounded-xl bg-[#e4efe6] text-[#3f754f]">
                  <FiLock className="text-xl" />
                </div>
                <div>
                  <h2 className="text-[28px] font-bold ml-8">Security</h2>
                  <p className="text-sm ml-8">Keep your account secure</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field
                  label="Current Password"
                  type="password"
                  value={currentPassword}
                  onChange={setCurrentPassword}
                  placeholder="Enter current password"
                  className="md:col-span-2"
                />
                <Field
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={setNewPassword}
                  placeholder="Enter new password"
                />
                <Field
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  placeholder="Confirm new password"
                />
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleUpdatePassword}
                  disabled={passwordLoading}
                  className="rounded-2xl cursor-pointer bg-[#275D84] px-6 py-2.5 text-base font-medium text-white transition-colors hover:bg-[#1f4b6a] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {passwordLoading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </section>

            <section className="rounded-2xl border border-[#d7ddda] bg-white py-8 px-12  shadow-[0_2px_8px_rgba(16,24,40,0.08)]">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-xl bg-[#ede4ff] text-[#7c3aed]">
                  <FiBell className="text-xl" />
                </div>
                <div>
                  <h2 className="text-[28px] font-bold  ml-8">Notifications</h2>
                  <p className="text-sm ml-8">Choose how you receive updates</p>
                </div>
              </div>

              <div className="space-y-5">
                <SwitchRow
                  label="Email Notifications"
                  description="Receive course updates and announcements via email"
                  checked={emailNotifications}
                  onChange={setEmailNotifications}
                />
                <SwitchRow
                  label="Course Reminders"
                  description="Receive reminders for upcoming courses"
                  checked={courseReminders}
                  onChange={setCourseReminders}
                />
                <SwitchRow
                  label="Marketing Emails"
                  description="Receive updates about new courses and promotions"
                  checked={marketingEmails}
                  onChange={setMarketingEmails}
                />
              </div>
            </section>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="rounded-2xl bg-[#e63d3d] px-4 py-2.5 text-sm cursor-pointer font-medium text-white transition-colors hover:bg-[#d63d3d]"
            >
              Delete Account
            </button>
            <button
              type="button"
              className="rounded-2xl bg-[#275D84] px-6 py-2.5 text-sm cursor-pointer font-medium text-white transition-colors hover:bg-[#1f4b6a]"
            >
              Done
            </button>
          </div>
        </section>
      </main>

      {showDeleteModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-[2px]">
          <div className="w-[440px] h-[260px] rounded-lg border border-[#d8d8d8] bg-[#F9FAFB] p-6 shadow-lg">
            <p className=" text-center text-2xl font-semibold text-[#1f2937] mb-6 py-4 border-b-2 border-gray-200  ">Delete Account</p>

            <div className="space-y-3 ">
              <button
                type="button"
                onClick={onDeleteConfirm}
                className="w-full rounded-md cursor-pointer bg-[#e12e23] py-2 text-base font-medium text-white transition-colors hover:bg-[#cd281f]"
              >
                Yes,
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="w-full  mb-2 rounded-md cursor-pointer border-2 border-gray-300 bg-transparent py-2 text-lg font-medium text-[#1f2937] transition-colors hover:bg-[#f9fafb]"
              >
                No, Back
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const Field = ({ label, placeholder, type = "text", value = "", onChange, defaultValue = "", className = "" }) => {
  return (
    <div className={className}>
      <label className="mb-1 block text-base font-semibold text-[#111827]">{label}</label>
      <input
        type={type}
        value={value || defaultValue}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border border-[#cfd4d2] bg-[#f8f8f8] px-3 text-sm text-[#111827] outline-none focus:border-[#3f754f]"
      />
    </div>
  );
};

const SwitchRow = ({ label, description, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-[22px] font-medium">{label}</p>
        <p className="text-[18px] text-[#757575AD]">{description}</p>
      </div>
      <button
        type="button"
        aria-pressed={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors duration-200 cursor-pointer ${checked ? "bg-[#0f1025]" : "bg-[#d1d5db]"}`}
      >
        <span
          className={`absolute left-0.5 top-0.5 block h-5 w-5 rounded-full bg-white transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
    </div>
  );
};

export default SettingsPage;