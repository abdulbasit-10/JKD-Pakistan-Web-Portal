"use client";

import { useGlobal } from "@/context/GlobleContext";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import LoadingScreen from "@/component/LoadingScreen";
import StudentLeftSidebar from "@/component/studentLeftSidebar";
import axiosInstance from "@/lib/axios";
import { FiEdit2, FiUploadCloud } from "react-icons/fi";
import { toast } from "react-toastify";

const StudentProfilePage = () => {
  const { state, dispatch } = useGlobal();
  const { user } = state;

  const router = useRouter();
  const [view, setView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appliedCourses, setAppliedCourses] = useState([]);
  const [profileImageUrl, setProfileImageUrl] = useState(user?.profileImage || "");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [latestApplication, setLatestApplication] = useState(null);

  const formatDate = (date) => {
    if (!date) return "";
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return "";
    return parsedDate.toISOString().split("T")[0];
  };

  // const getStudentApplications = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axiosInstance.get("/api/apply");
  //     const filteredCourses = res.data.filter(
  //       (application) => application?.userId?._id === user?.id
  //     );
  //     setAppliedCourses(filteredCourses);
  //     // Get the latest application to display in profile
  //     if (filteredCourses.length > 0) {
  //       const latest = filteredCourses.sort(
  //         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  //       )[0];
  //       setLatestApplication(latest);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching student applications:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getStudentApplications = async () => {
  try {
    setLoading(true);
    // ✅ Ab server khud filter karta hai
    const res = await axiosInstance.get("/api/apply/my");
    setAppliedCourses(res.data);
    if (res.data.length > 0) {
      const latest = [...res.data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )[0];
      setLatestApplication(latest);
    }
  } catch (error) {
    console.error("Error fetching student applications:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (!user || user?.role !== "student") {
      router.push("/login");
      return;
    }
    setView(true);
  }, [router, user]);

  useEffect(() => {
    if (!user?.id) return;
    getStudentApplications();
  }, [user?.id]);

  useEffect(() => {
    setProfileImageUrl(user?.profileImage || "");
  }, [user?.profileImage]);

  const onSelectProfileImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

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

      setProfileImageUrl(uploadedUrl);
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

  const enrolledCourseNames = useMemo(() => {
    const names = appliedCourses
      .map((course) => course?.chooseCourse)
      .filter(Boolean);
    return [...new Set(names)];
  }, [appliedCourses]);

  if (!view) return <LoadingScreen />;

  return (
    <div className="flex h-screen w-full bg-white">
      <StudentLeftSidebar className="w-[20%] min-w-[280px]" />

      <main className="min-h-screen w-full overflow-auto px-4 py-6 md:px-8">
        <section className="mx-auto max-w-[1120px]">
          <div className="mb-5">
            <h1 className="text-[32px] font-bold ">Student Profile</h1>
            <p className="mt-1 text-base font-medium">
              Manage your personal information and academic details
            </p>
          </div>

          <div className="rounded-2xl border border-white bg-white shadow-[0_2px_10px_rgba(15,23,42,0.08)]">
            <div className="h-[6px] w-full rounded-t-2xl bg-[#3f754f]" />

            <div className="grid grid-cols-1 gap-6 p-5 lg:grid-cols-[130px_1fr] lg:p-7">
              <div className="flex justify-center lg:justify-start">
                <label
                  htmlFor="profile-image-upload"
                  className="flex h-[108px] w-[108px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-full border-2 border-[#4a7d59] bg-gray-300"
                >
                  {profileImageUrl ? (
                    <img
                      src={profileImageUrl}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <>
                      <FiUploadCloud className="text-xl text-[#1f2937]" />
                      <span className="mt-1 rounded bg-[#666666] p-1 text-xs font-semibold text-white">
                        {uploadingImage ? "Uploading..." : "+ Upload"}
                      </span>
                    </>
                  )}
                </label>
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onSelectProfileImage}
                  disabled={uploadingImage}
                />
              </div>

              <div className="space-y-7">
                <section>
                  <div className="mb-3 flex items-center justify-between border-b border-[#d6dbd9] pb-2">
                    <h2 className="text-[24px] font-bold text-[#3f754f]">Personal Details</h2>
                    {/* <FiEdit2 className="text-[#1f2937]" /> */}
                    <img src="/icons/editIcon.svg" alt="Edit Icon" className="text-[#1f2937] h-5 w-5 cursor-pointer" />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <ProfileInput label="Full Name" value={user?.name || ""} placeholder="Name" />
                    <ProfileInput label="Father Name" value={latestApplication?.fatherName || ""} placeholder="Name" />
                    <ProfileInput label="CNIC" value={latestApplication?.CNIC || ""} placeholder="00000-0000000-0" />
                    <ProfileInput label="Gender" value={latestApplication?.gender || ""} placeholder="Select" />
                    <ProfileInput
                      label="Date of Birth"
                      value={formatDate(latestApplication?.dateOfBirth)}
                      placeholder="DD/MM/YY"
                    />
                  </div>
                </section>

                <section>
                  <div className="mb-3 flex items-center justify-between border-b border-[#d6dbd9] pb-2">
                    <h2 className="text-[24px] font-bold text-[#3f754f]">Contact Information</h2>
                    {/* <FiEdit2 className="text-[#1f2937]" /> */}
                    <img src="/icons/editIcon.svg" alt="Edit Icon" className="text-[#1f2937] h-5 w-5 cursor-pointer" />
                    
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <ProfileInput label="Email" value={user?.email || ""} placeholder="xyz@gmail.com" />
                    <ProfileInput label="Contact Number" value={latestApplication?.whatsappNumber || latestApplication?.phoneNumber || user?.phone || ""} placeholder="+92 00000000" />
                  </div>
                </section>

                <section>
                  <div className="mb-3 flex items-center justify-between border-b border-[#d6dbd9] pb-2">
                    <h2 className="text-[24px] font-bold text-[#3f754f]">Academic Information</h2>
                    {/* <FiEdit2 className="text-[#1f2937]" /> */}
                    <img src="/icons/editIcon.svg" alt="Edit Icon" className="text-[#1f2937] h-5 w-5 cursor-pointer" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <ProfileInput label="Student ID" value={user?.studentId || ""} placeholder="JKD-001" />
                    <ProfileInput
                      label="Enrollment Date"
                      value={formatDate(latestApplication?.createdAt || user?.createdAt)}
                      placeholder="DD/MM/YY"
                    />
                  </div>

                  <div className="mt-4">
                    <p className="mb-1 text-base font-semibold text-[#111827]">Courses Enrolled</p>
                    <div className="min-h-[42px] rounded-lg border border-[#cfd4d2] bg-[#f8f8f8] px-3 py-2">
                      {loading ? (
                        <span className="text-sm text-[#6b7280]">Loading...</span>
                      ) : enrolledCourseNames.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {enrolledCourseNames.map((courseName) => (
                            <span
                              key={courseName}
                              className="rounded-full bg-[#e8ecea] px-3 py-1 text-sm text-[#374151]"
                            >
                              {courseName}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-[#6b7280]">No enrolled courses yet</span>
                      )}
                    </div>
                  </div>
                </section>

                <section>
                  <div className="mb-3 flex items-center justify-between border-b border-[#d6dbd9] pb-2">
                    <h2 className="text-[24px] font-bold text-[#3f754f]">Address</h2>
                    {/* <FiEdit2 className="text-[#1f2937]" /> */}
                    <img src="/icons/editIcon.svg" alt="Edit Icon" className="text-[#1f2937] h-5 w-5 c" />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <ProfileInput
                      label="Street Address"
                      value={latestApplication?.province || latestApplication?.district || ""}
                      placeholder="Street Address"
                      className="md:col-span-2"
                    />
                    <ProfileInput label="City" value={latestApplication?.district || ""} placeholder="City" />
                    <ProfileInput label="Province" value={latestApplication?.province || ""} placeholder="Select" />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const ProfileInput = ({ label, value, placeholder, className = "" }) => {
  return (
    <div className={className}>
      <p className="mb-1 text-base font-semibold text-[#111827]">{label}</p>
      <input
        defaultValue={value}
        placeholder={placeholder}
        className="h-[42px] w-full rounded-lg border border-[#cfd4d2] bg-[#f8f8f8] px-3 text-[15px] text-[#1f2937] outline-none"
      />
    </div>
  );
};

export default StudentProfilePage;
