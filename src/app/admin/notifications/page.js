"use client";

import AdminLeftSidebar from "@/component/AdminLeftSidebar";
import LoadingScreen from "@/component/LoadingScreen";
import { useGlobal } from "@/context/GlobleContext";
import { apiCall } from "@/helper/authenticateApiCall";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const NotificationRow = ({ title, subtitle, enabled, onToggle }) => (
  <div className="flex items-center justify-between py-3">
    <div>
      <p className="text-[22px] font-semibold text-[#242424]">{title}</p>
      <p className="text-[20px] text-gray-400">{subtitle}</p>
    </div>

    <button
      type="button"
      aria-pressed={enabled}
      onClick={onToggle}
      className={`relative h-6 w-11 rounded-full transition-colors duration-200 cursor-pointer ${enabled ? "bg-[#0f1025]" : "bg-[#d1d5db]"}`}
    >
      <span
        className={`absolute left-0.5 top-0.5 block h-5 w-5 rounded-full bg-white transition-transform duration-200 ${enabled ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  </div>
);

const NotificationsPage = () => {
  const { state, dispatch } = useGlobal();
  const { user } = state;
  const router = useRouter();
  const [view, setView] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [settings, setSettings] = useState({
    email: true,
    push: true,
    marketing: false,
  });

  useEffect(() => {
    apiCall(axiosInstance, dispatch, router, toast, setView);
  }, []);

  if (!view) return <LoadingScreen />;

  const adminName = user?.name || user?.fullname || "Admin";
  const adminEmail = user?.email || "admin@jkd.com";
  const adminRole = user?.role || "administrator";
  const adminInitials =
    adminName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "AD";

  const toggleKey = (key) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  };

  const onDeleteConfirm = () => {
    setShowDeleteModal(false);
    toast.info("Delete account request received.");
  };

  return (
    <div className="flex min-h-screen w-full bg-[#edf0ef]">
      <AdminLeftSidebar className="w-[276px] shrink-0" />
      <main className="flex-1 overflow-auto p-4 md:p-6 bg-white ">
        <div className="mx-auto max-w-6xl space-y-6">
          <header className="flex flex-col gap-4 px-1 py-1 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-[32px] font-semibold leading-none text-[#121212]">Notifications</h1>
              <p className="mt-2 text-[20px] ">Manage your account notifications</p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              <div className="text-right">
                <p className="text-base font-semibold text-[#111827]">{adminEmail}</p>
                <p className="text-sm text-[#00000066] font-medium capitalize">{adminRole}</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#275D84] text-lg font-medium text-white shadow-sm">
                {adminInitials}
              </div>
            </div>
          </header>

          <section className="rounded-2xl border-2 border-gray-300  bg-white p-6  shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#efe8fd] text-[#8b5cf6]">
                <IoNotificationsOutline className="text-2xl" />
              </div>
              <div>
                <h2 className="text-[28px] font-semibold ">Notifications</h2>
                <p className="text-base text-gray-700">Choose how you receive updates</p>
              </div>
            </div>

            <div className="space-y-3 px-5 pt-2">
              <NotificationRow
                title="Email Notifications"
                subtitle="Receive email updates about applications"
                enabled={settings.email}
                onToggle={() => toggleKey("email")}
              />
              <NotificationRow
                title="Push Notifications"
                subtitle="Receive browser notifications"
                enabled={settings.push}
                onToggle={() => toggleKey("push")}
              />
              <NotificationRow
                title="Marketing Emails"
                subtitle="Receive promotional content and updates"
                enabled={settings.marketing}
                onToggle={() => toggleKey("marketing")}
              />
            </div>
          </section>

          <div className="flex items-center justify-end gap-4 px-1">
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="rounded-2xl bg-[#e63d3d] px-4 py-2.5 text-base cursor-pointer font-medium text-white transition-colors hover:bg-[#d63d3d]"
            >
              Delete Account
            </button>
            <button
              type="button"
              className="rounded-2xl bg-[#275D84] px-6 py-2.5 text-base cursor-pointer font-medium text-white transition-colors hover:bg-[#1f4b6a]"
            >
              Done
            </button>
          </div>
        </div>
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

export default NotificationsPage;
