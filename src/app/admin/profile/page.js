"use client";

import AdminLeftSidebar from "@/component/AdminLeftSidebar";
import LoadingScreen from "@/component/LoadingScreen";
import { useGlobal } from "@/context/GlobleContext";
import { apiCall } from "@/helper/authenticateApiCall";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { toast } from "react-toastify";

const getProfileFieldValues = (profileUser) => ({
  fullName: profileUser?.fullName || profileUser?.fullname || profileUser?.name || "Admin User",
  username: profileUser?.userName || profileUser?.username || profileUser?.name || "user_name",
  phone: profileUser?.phone ?? "+92 3095050440",
  email: profileUser?.email || "admin@jkd.com",
});

const ProfilePage = () => {
  const { state, dispatch } = useGlobal();
  const { user } = state;
  const router = useRouter();
  const [view, setView] = useState(false);
  const [isPersonalDetailsEditable, setIsPersonalDetailsEditable] = useState(false);
  const [profilePreview, setProfilePreview] = useState(user?.profileImage || "");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [editProfileData, setEditProfileData] = useState(getProfileFieldValues(user));
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    ...getProfileFieldValues(user),
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    apiCall(axiosInstance, dispatch, router, toast, setView);
  }, []);

  useEffect(() => {
    return () => {
      if (profilePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(profilePreview);
      }
    };
  }, [profilePreview]);

  useEffect(() => {
    setProfilePreview(user?.profileImage || "");
  }, [user?.profileImage]);

  useEffect(() => {
    const nextValues = getProfileFieldValues(user);

    setFormData({
      ...nextValues,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setEditProfileData(nextValues);
  }, [user]);

  if (!view) return <LoadingScreen />;

  const adminName = user?.name || user?.fullname || "Admin User";
  const adminEmail = user?.email || "admin@jkd.com";
  const adminRole = user?.role || "administrator";
  const adminInitials =
    adminName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "AD";

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSave = async () => {
    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password must match.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }

    try {
      setUpdatingPassword(true);
      const { data } = await axiosInstance.put("/api/users/change-password", {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      setFormData((current) => ({
        ...current,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      toast.success(data?.message || "Password updated successfully.");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to update password.");
    } finally {
      setUpdatingPassword(false);
    }
  };

  const openProfileModal = () => {
    setEditProfileData(getProfileFieldValues(user));
    setIsProfileModalOpen(true);
  };

  const handleProfileModalChange = (event) => {
    const { name, value } = event.target;
    setEditProfileData((current) => ({ ...current, [name]: value }));
  };

  const handleProfileModalSave = async () => {
    try {
      setSavingProfile(true);

      const { data } = await axiosInstance.put("/api/users/profile", {
        fullName: editProfileData.fullName,
        userName: editProfileData.username,
        phone: editProfileData.phone,
        email: editProfileData.email,
      });

      const refreshed = await axiosInstance.get("/api/me");
      const updatedUser = refreshed?.data?.user || data?.user || {};
      console.log("Updated user data:", updatedUser);
      const nextValues = getProfileFieldValues(updatedUser);

      setFormData((current) => ({
        ...current,
        ...nextValues,
      }));

      setEditProfileData(nextValues);

      dispatch({
        type: "LOGIN",
        payload: {
          ...user,
          ...updatedUser,
          name: nextValues.fullName,
          fullname: nextValues.fullName,
          fullName: nextValues.fullName,
          userName: nextValues.username,
          username: nextValues.username,
          phone: updatedUser?.phone ?? editProfileData.phone ?? "",
          email: nextValues.email,
        },
      });

      toast.success(data?.message || "Profile updated successfully");
      setIsProfileModalOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadButtonClick = (event) => {
    event.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleImageSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    try {
      setUploadingImage(true);

      const formData = new FormData();
      formData.append("profileImage", file);

      const { data } = await axiosInstance.post("/api/users/profile-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const uploadedUrl = data?.profileImage || "";
      if (!uploadedUrl) {
        toast.error("Image uploaded but URL not returned");
        return;
      }

      setProfilePreview(uploadedUrl);
      dispatch({
        type: "LOGIN",
        payload: {
          ...user,
          profileImage: uploadedUrl,
        },
      });
      toast.success(data?.message || "Profile picture updated");
    } catch (error) {
      console.error("Profile image upload error:", error);
      toast.error(error?.response?.data?.error || "Failed to upload profile image");
    } finally {
      event.target.value = "";
      setUploadingImage(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#edf0ef]">
      <AdminLeftSidebar className="w-[376px] shrink-0" />

      <main className="flex-1 overflow-auto bg-white p-4 md:p-6">
        <div className="mx-auto max-w-6xl space-y-7">
          <header className="flex flex-col gap-4 px-1 py-1 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-[35px] font-semibold leading-none ">Profile</h1>
              <p className="mt-2 text-[20px] ">Manage your account information and preferences</p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              <div className="text-right">
                <p className="text-base font-semibold text-[#111827]">{adminEmail}</p>
                <p className="text-sm font-medium capitalize text-[#00000066]">{adminRole}</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#275D84] text-lg font-medium text-white shadow-sm">
                {adminInitials}
              </div>
            </div>
          </header>

          <section className="rounded-2xl  border-t-6 border-[#3f7355]  bg-white p-6 shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
            <div className="mb-7  pt-5" />

            <div className="flex flex-col gap-8 lg:flex-row">
              <div className="w-full lg:w-[250px]">
                <div 
                  className="relative mx-auto flex h-[132px] w-[132px] items-center justify-center overflow-hidden rounded-full border-2 border-[#6c936f] bg-[#d9d9d9] group cursor-pointer transition-all"
                  onClick={handleUploadClick}
                >
                  {profilePreview ? (
                    <>
                      <img
                        src={profilePreview}
                        alt="Profile Preview"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-full transition-all flex items-center justify-center">
                        <span className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Change Image</span>
                      </div>
                    </>
                  ) : null}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />

                  {!profilePreview && (
                    <button
                      type="button"
                      onClick={handleUploadButtonClick}
                      disabled={uploadingImage}
                      className="z-10 rounded-md bg-[#6f6f6f]/90 px-2 py-2 cursor-pointer text-xs font-semibold text-white"
                    >
                      {uploadingImage ? "Uploading..." : "+ Upload"}
                    </button>
                  )}
                </div>

                <div className="mt-5 text-center">
                  <h3 className="text-[24px] font-semibold leading-tight text-[#171717]">Admin User</h3>
                  <p className="text-base font-medium ">{adminEmail}</p>
                  <p className="text-base capitalize  font-medium text-gray-500">{adminRole}</p>
                </div>
              </div>

              <div className="flex-1 space-y-8">
                <div>
                  <div className="mb-4 flex items-center justify-between border-b-2  border-gray-300 pb-4">
                    <h2 className="text-[24px] font-semibold text-[#45744F]">Personal Details</h2>
                    <button
                      type="button"
                      className="text-[#212121]"
                      onClick={openProfileModal}
                      aria-label="Enable personal details editing"
                    >
                      {/* <FiEdit2 className="text-lg" /> */}
                       <img src="/icons/editIcon.svg" alt="Change Password" className="h-6 w-6 cursor-pointer" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-[20px] font-medium text-[#2a2a2a]">Full Name</label>
                      <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={onChange}
                        readOnly
                        className="h-11 w-full rounded-lg border-2 bg-gray-100 border-gray-300 px-3 text-base text-[#3d3d3d] outline-none"
                        placeholder="Name"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[20px] font-medium text-[#2a2a2a]">Username</label>
                      <input
                        name="username"
                        value={formData.username}
                        onChange={onChange}
                        readOnly
                        className="h-11 w-full rounded-lg border-2 bg-gray-100 border-gray-300 px-3 text-base text-[#3d3d3d] outline-none"
                        placeholder="user_name"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[20px] font-medium text-[#2a2a2a]">Phone Number</label>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={onChange}
                        readOnly
                        className="h-11 w-full rounded-lg border-2 bg-gray-100 border-gray-300 px-3 text-base text-[#7a7a7a] outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[20px] font-medium text-[#2a2a2a]">Email</label>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={onChange}
                        readOnly
                        className="h-11 w-full rounded-lg border-2 bg-gray-100 border-gray-300 px-3 text-base text-[#7a7a7a] outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-4 flex items-center justify-between border-b-2  border-gray-300 pb-4">
                    <h2 className="text-[24px] font-semibold text-[#45744F]">Change Password</h2>
                    <button type="button" className="text-[#212121]">
                      {/* <FiEdit2 className="text-lg" /> */}
                    <img src="/icons/editIcon.svg" alt="Change Password" className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <label className="mb-1 block text-[20px] font-medium text-[#2a2a2a]">Current Password</label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={onChange}
                        className="h-11 w-full rounded-lg border-2 bg-gray-100 border-gray-300 px-3 text-base text-[#3d3d3d] outline-none"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[20px] font-medium text-[#2a2a2a]">New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={onChange}
                        className="h-11 w-full rounded-lg border-2 bg-gray-100 border-gray-300 px-3 text-base text-[#3d3d3d] outline-none"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[20px] font-medium text-[#2a2a2a]">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={onChange}
                        className="h-11 w-full rounded-lg border-2 bg-gray-100 border-gray-300 px-3 text-base text-[#3d3d3d] outline-none"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={updatingPassword}
                    className="rounded-2xl cursor-pointer bg-[#275D84] px-9 py-2.5 text-base font-medium text-white transition-colors hover:bg-[#1f4b6a]"
                  >
                    {updatingPassword ? "Updating..." : "Done"}
                  </button>
                </div>

                {isProfileModalOpen ? (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
                    <div className="w-full max-w-[640px] rounded-2xl bg-white p-6 shadow-2xl">
                      <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-4">
                        <h2 className="text-[24px] font-semibold text-[#45744F]">Edit Profile</h2>
                        <button
                          type="button"
                          onClick={() => setIsProfileModalOpen(false)}
                          className="text-2xl leading-none text-gray-500 cursor-pointer hover:text-gray-700"
                          aria-label="Close profile editor"
                        >
                          ×
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-sm font-medium text-[#2a2a2a]">Full Name</label>
                          <input
                            name="fullName"
                            value={editProfileData.fullName}
                            onChange={handleProfileModalChange}
                            className="h-11 w-full rounded-lg border-2 border-gray-300 px-3 text-base outline-none"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-[#2a2a2a]">Username</label>
                          <input
                            name="username"
                            value={editProfileData.username}
                            onChange={handleProfileModalChange}
                            className="h-11 w-full rounded-lg border-2 border-gray-300 px-3 text-base outline-none"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-[#2a2a2a]">Phone Number</label>
                          <input
                            name="phone"
                            value={editProfileData.phone}
                            onChange={handleProfileModalChange}
                            className="h-11 w-full rounded-lg border-2 border-gray-300 px-3 text-base outline-none"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-[#2a2a2a]">Email</label>
                          <input
                            name="email"
                            type="email"
                            value={editProfileData.email}
                            onChange={handleProfileModalChange}
                            className="h-11 w-full rounded-lg border-2 border-gray-300 px-3 text-base outline-none"
                          />
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setIsProfileModalOpen(false)}
                          className="rounded-xl border cursor-pointer border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleProfileModalSave}
                          disabled={savingProfile}
                          className="rounded-xl bg-[#275D84] cursor-pointer px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
                        >
                          {savingProfile ? "Saving..." : "Done"}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
