"use client";

import Image from "next/image";
import { useGlobal } from "@/context/GlobleContext";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import LoadingScreen from "@/component/LoadingScreen";
import StudentLeftSidebar from "@/component/studentLeftSidebar";
import axiosInstance from "@/lib/axios";
import courseData from "@/data/course.json";
import { FiSearch } from "react-icons/fi";
import { MdOutlineSchool, MdOutlineMenuBook, MdOutlineWorkspacePremium } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";



const normalizeCourseText = (value = "") => value.toLowerCase().replace(/[^a-z0-9]+/g, "").trim();

const getCourseImage = (courseName = "") => {
  const normalizedCourseName = normalizeCourseText(courseName);
  const matchedCourse = courseData.find((course) => {
    const normalizedId = normalizeCourseText(course.id);
    const normalizedTitle = normalizeCourseText(course.title);
    return normalizedId === normalizedCourseName || normalizedTitle === normalizedCourseName;
  });

  return matchedCourse?.image || "/cardPic1.jpg";
};

const StudentDashboardPage = () => {
  const { state } = useGlobal();
  const { user } = state;

  const router = useRouter();
  const [view, setView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingId, setUploadingId] = useState(null);
  const [appliedCourses, setAppliedCourses] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All Courses");
  const [searchTerm, setSearchTerm] = useState("");

  const filters = ["All Courses", "Ongoing", "Completed", "Not Started"];

  const normalizeStatus = (status = "") => status.toLowerCase();

  const getCourseGroup = (status = "") => {
    const normalized = normalizeStatus(status);
    if (normalized === "completed") return "Completed";
    if (normalized === "pending") return "Not Started";
    return "Ongoing";
  };

  const getStatusClasses = (status = "") => {
    const normalized = normalizeStatus(status);
    if (normalized === "pending") return "bg-amber-100 text-amber-700";
    if (normalized === "rejected") return "bg-rose-100 text-rose-700";
    if (normalized === "completed") return "bg-blue-100 text-blue-700";
    return "bg-emerald-100 text-emerald-700";
  };

  // const getStudentApplications = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axiosInstance.get("/api/apply");
  //     const filteredCourses = res.data.filter((application) => {
  //       // Handle both populated userId (object with _id) and string userId
  //       const appUserId = application?.userId?._id || application?.userId;
  //       const currentUserId = user?.id || user?._id;
  //       return appUserId === currentUserId;
  //     });
  //     setAppliedCourses(filteredCourses);
  //   } catch (error) {
  //     console.error("Error fetching student applications:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getStudentApplications = async () => {
  try {
    setLoading(true);
    // ✅ Ab server khud filter karta hai, client-side filtering ki zarurat nahi
    const res = await axiosInstance.get("/api/apply/my");
    setAppliedCourses(res.data);
  } catch (error) {
    console.error("Error fetching student applications:", error);
  } finally {
    setLoading(false);
  }
};

  const handleUploadChallan = async (event, applicationId) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploadingId(applicationId);
      const formData = new FormData();
      formData.append("challanImage", file);
      formData.append("applicationId", applicationId);

      const response = await axiosInstance.post("/api/challan/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update the applications list to reflect the uploaded challan
      const updatedCourses = appliedCourses.map((course) =>
        course._id === applicationId
          ? { ...course, challanUploaded: true, challanUrl: response.data.challanUrl }
          : course
      );
      setAppliedCourses(updatedCourses);

      console.log("Challan uploaded successfully:", response.data);
      toast.success("Challan uploaded successfully!");
    } catch (error) {
      console.error("Error uploading challan:", error);
      toast.error(error.response?.data?.error || "Failed to upload challan. Please try again.");
    } finally {
      setUploadingId(null);
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

  const filteredCourses = useMemo(() => {
    return appliedCourses.filter((course) => {
      const courseName = course?.chooseCourse?.toLowerCase() || "";
      const matchesSearch = courseName.includes(searchTerm.toLowerCase());
      if (activeFilter === "All Courses") return matchesSearch;
      return getCourseGroup(course?.status) === activeFilter && matchesSearch;
    });
  }, [activeFilter, appliedCourses, searchTerm]);

  const totalEnrolled = appliedCourses.length;
  const inProgressCourses = appliedCourses.filter(
    (course) => getCourseGroup(course?.status) === "Ongoing"
  ).length;
  const completedCourses = appliedCourses.filter(
    (course) => getCourseGroup(course?.status) === "Completed"
  ).length;

  if (!view) return <LoadingScreen />;

  return (
    <div className="flex h-screen w-full bg-white">
      <StudentLeftSidebar className="w-[20%] min-w-[280px]" />

      <main className="min-h-screen w-full overflow-auto px-6 py-8 md:px-10">
        <section className="rounded-xl bg-white p-6 shadow-[0_12px_30px_rgba(16,24,40,0.08)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-3xl font-bold  md:text-[44px]">
                Welcome back, {user?.name || "Student"} <span className="text-3xl md:text-4xl">👋</span>
              </h1>
              <p className="mt-2 text-lg text-[#344054]">Stay updated with your learning journey</p>
            </div>
            <div className="flex items-center gap-3 rounded-xl px-4 py-3">
              <div className="text-right">
                <p className="text-base font-semibold text-[#111827]">{user?.email}</p>
                <p className="text-sm text-[#667085]">Student</p>
              </div>
              <div className="grid h-16 w-16 place-items-center rounded-full bg-[#1f5f87] text-sm font-bold text-white">
                {(user?.name || "ST")
                  .split(" ")
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")
                  .toUpperCase()}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
            <StatCard
              title="Total Enrolled"
              value={totalEnrolled}
              caption="Active courses"
              valueClass="text-[#101828] "
              borderColor="border-[#406C4A]"
              iconBg="bg-[#2f855a]"
              icon={<MdOutlineSchool className="text-3xl" />}
            />
            <StatCard
              title="In Progress"
              value={inProgressCourses}
              caption="Currently learning"
              valueClass="text-[#2f855a]"
              borderColor="border-[#3B8554]"
              iconBg="bg-[#d08335]"
              icon={<img src="/icons/book2.svg" alt="Certificate Icon" className="h-8 w-8" />}
            />
            <StatCard
              title="Completed"
              value={completedCourses}
              caption="Certificates earned"
              valueClass="text-[#1f5f87]"
              borderColor="border-[#275D84]"
              iconBg="bg-[#1f5f87]"
              icon={<img src="/icons/certificationIcon.svg" alt="Certificate Icon" className="h-8 w-8" />}
            />
          </div>
        </section>

        <section className="mt-6 rounded-2xl bg-white p-6 shadow-[0_12px_30px_rgba(16,24,40,0.08)]">
          <h2 className="text-3xl font-extrabold text-[#101828]">My Courses</h2>
          <div className="mt-4 flex flex-col gap-4 rounded-2xl shadow-lg p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-3">
              {filters.map((filterItem) => (
                <button
                  key={filterItem}
                  type="button"
                  onClick={() => setActiveFilter(filterItem)}
                  className={`cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    activeFilter === filterItem
                      ? "bg-[#2f855a] text-white"
                      : "bg-[#d1d5db] text-[#1f2937] hover:bg-[#bfc5cc]"
                  }`}
                >
                  {filterItem}
                </button>
              ))}
            </div>
            <div className="relative w-full max-w-[300px]">
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#98a2b3]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="h-11 w-full rounded-xl border border-[#eaecf0] bg-white pl-10 pr-3 text-sm outline-none transition-colors focus:border-[#2f855a]"
              />
            </div>
          </div>

          <div className="mt-6" id="course-applications">
            {loading ? (
              <div className="py-8 text-[#475467]">Loading courses...</div>
            ) : filteredCourses.length < 1 ? (
              <div className="rounded-xl border-2 border-dashed border-[#d0d5dd] bg-[#f9fafb] py-10 text-center">
                <h3 className="text-lg font-semibold text-[#1d2939]">No courses found</h3>
                <p className="text-sm text-[#667085]">Try changing filters or explore the Courses section to apply.</p>
              </div>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
                {filteredCourses.map((application, index) => (
                  <article
                    key={index}
                    className="overflow-hidden rounded-xl w-full min-h-[448px] border border-[#e5e7eb] bg-white shadow-md transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col"
                  >
                    {/* Image Header */}
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={getCourseImage(application.chooseCourse)}
                        alt={application.chooseCourse || "Course image"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-16">
                        {/* <p className="text-sm font-semibold text-white drop-shadow-md line-clamp-2">
                          {application.chooseCourse}
                        </p> */}
                      </div>
                      {/* Status Badge - Positioned Top Right */}
                      <span className={`absolute top-3 right-3 rounded-lg px-3 py-1 text-xs font-semibold ${getStatusClasses(application.status)}`}>
                        {application.status}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow border-2 border-gray-500">
                      {/* Title */}
                     <div className="mb-3">
                       <h3 className="text-xl font-bold text-[#111827] leading-tight line-clamp-2">
                        {application.chooseCourse}
                      </h3>
                      
                      {/* Duration */}
                      <div className="mt-2 flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-[#6b7280] font-medium">12 weeks</p>
                      </div>
                     </div>
                      
                      {/* Description */}
                      <p className="text-base text-[#000000] leading-relaxed mb-5 flex-grow">
                        {application.description || "Master the skills and knowledge required for this course through comprehensive learning and hands-on practice."}
                      </p>
                    {/* <div className="flex justify-around">  
                      {/* Learn More Button */}
                      {/* <Link href={`/student/Challan/${application._id}`} className="w-[40%] h-[39px] bg-[#d97706] hover:bg-[#b45309] active:bg-[#92400e] text-white text-[11px] font-medium py-4 px-4 rounded-lg cursor-pointer transition-colors text-xs flex items-center justify-center gap-2">
                        Generate Challan
                       < FaArrowRight />
                      </Link> */}
                      {/* upload challan */}
                      {/* <div className="relative">
                        <button
                          onClick={() => document.getElementById(`challan-upload-${application._id}`)?.click()}
                          disabled={uploadingId === application._id}
                          className="w-[80%] h-[39px] bg-[#d97706] hover:bg-[#b45309] active:bg-[#92400e] text-white text-[11px] font-medium py-4 px-4 rounded-lg cursor-pointer transition-colors text-xs flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {uploadingId === application._id ? "Uploading..." : "Upload Challan"}
                         < FaArrowRight />
                        </button>
                        <input
                          id={`challan-upload-${application._id}`}
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleUploadChallan(e, application._id)}
                          className="hidden"
                        />
                      </div> */}
                    {/* </div> */}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, caption, valueClass, iconBg, icon, borderColor }) => (
  <div className={`rounded-2xl border-l-6 ${borderColor} bg-white p-5 shadow-sm`}>
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-4">
        <p className="text-[#757575] text-lg font-medium">{title}</p>
        <p className={`mt-1 text-4xl font-bold ${valueClass}`}>{value}</p>
        <p className="mt-1 text-base text-[#757575]">{caption}</p>
      </div>
      <span className={`grid h-12 w-12 place-items-center rounded-xl text-white ${iconBg}`}>{icon}</span>
    </div>
  </div>
);

export default StudentDashboardPage;

