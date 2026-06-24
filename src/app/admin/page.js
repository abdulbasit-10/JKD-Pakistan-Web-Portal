// "use client"
// import AdminLeftSidebar from '@/component/AdminLeftSidebar';
// import { useGlobal } from '@/context/GlobleContext'
// import { apiCall } from '@/helper/authenticateApiCall';
// import axiosInstance from '@/lib/axios';
// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react'
// import { toast } from 'react-toastify';

// const Adimn = () => {
//     const {state , dispatch} = useGlobal();
//     const {theme , email , role} = state;
//     const router = useRouter();
//     const [ view , setView ] = useState(false);

//     useEffect(()=>{
//       apiCall(axiosInstance, dispatch,router,toast , setView)
//     },[]);

//     if(!view) return <div>loading... </div>; 
//     console.log(document.cookie.token)
//   return (
//     <div className='flex h-screen  w-full'>
//       <AdminLeftSidebar className="w-[20%]" />
//       <div className={`w-[80%] ${theme === 'light' ? 'bg-white':'bg-[#080808]'} `}>
//         <div className=' flex justify-between items-center px-10 pt-[18px]' >
//           <h1 className={`${theme === 'light' ? 'text-[#00874F]': 'text-[#177faa]'} text-start   lg:text-[39px] lg:font-extrabold font-bold  `}>{role==="admin" ? "Admin " : "User "}Dashboard</h1>
//           <div className='text-sm'>
//             <p className='flex gap-1 items-center mb-1'>
//               <span className=' font-semibold'>Email - </span>
//               <span>{email}</span>
//             </p>
//             {/* <p className='flex gap-1 items-center'>
//               <span className='font-semibold'>Role -</span>
//               <span>{role}</span>
//             </p> */}
//             <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full font-semibold">System Administrator</span>

//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Adimn


"use client"
import AdminLeftSidebar from "@/component/AdminLeftSidebar";
import { useGlobal } from "@/context/GlobleContext";
import { apiCall } from "@/helper/authenticateApiCall";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingScreen from "@/component/LoadingScreen";
import Link from "next/link";


// Sample data for demonstration purposes
const recentApplications = [
    { id: 1, name: 'Ahmad Khan', course: 'Electrical Technician', date: '2024-10-25', status: 'Approved' },
    { id: 2, name: 'Sana Batool', course: 'Welding Certification', date: '2024-10-28', status: 'Pending' },
    { id: 3, name: 'Zeeshan Malik', course: 'Advanced Plumbing', date: '2024-10-29', status: 'Rejected' },
    { id: 4, name: 'Maria Iqbal', course: 'Mobile Repair Course', date: '2024-11-01', status: 'Pending' },
    { id: 5, name: 'Fahad Riaz', course: 'HVAC Installation', date: '2024-11-02', status: 'Approved' },
];

const recentBookings = [
    { id: 101, user: 'Usman Ali', service: 'Site Consultation', date: '2024-11-03' },
    { id: 102, user: 'Ayesha Bibi', service: 'Lab Rental (Welding)', date: '2024-11-01' },
    { id: 103, user: 'Farooq Hassan', service: 'Certification Exam', date: '2024-10-30' },
    { id: 104, user: 'Noor Fatima', service: 'Site Consultation', date: '2024-10-27' },
    { id: 105, user: 'Bilal Khan', service: 'Lab Rental (Plumbing)', date: '2024-10-26' },
];

// Helper component for KPI Cards
const KPICard = ({ title, value, subtext, accentClass, valueClass = "text-[#1f2937]" }) => (
    <div className="rounded-xl flex flex-col items-start justify-between border-2 border-gray-400 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
        {/* <div className={`mb-3 h-1.5 w-14 rounded-full ${accentClass}`} /> */}
        <p className="text-2xl font-medium text-[#20252b]">{title}</p>
        <p className={`mt-3 text-4xl font-semibold tracking-tight ${valueClass}`}>{value}</p>
        {subtext ? <p className="mt-3 text-xl font-medium text-[#3B8554]">{subtext}</p> : null}
    </div>
);

// Helper function for status colors
const getStatusClasses = (status) => {
    switch (status) {
        case 'Approved':
            return 'bg-green-100 text-green-800';
        case 'Pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'Rejected':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const getMonthTrend = (applications = []) => {
    return monthLabels.map((label, index) => {
        const count = applications.filter((app) => {
            const created = new Date(app.createdAt);
            return created.getMonth() === index;
        }).length;

        return {
            label,
            value: count,
        };
    });
};

const getCoursePopularity = (applications = []) => {
    const tally = applications.reduce((accumulator, application) => {
        const courseName = application.chooseCourse || "Unknown";
        accumulator[courseName] = (accumulator[courseName] || 0) + 1;
        return accumulator;
    }, {});

    return Object.entries(tally)
        .map(([label, value]) => ({ label, value }))
        .sort((left, right) => right.value - left.value)
        .slice(0, 5);
};

const coursePopularityDefaults = [
    "UI/UX",
    "Graphic Design",
    "Electrician",
    "MERN Stack",
    "Cricket",
];

// Main Admin Dashboard Component
const App = () => {
    // Icons (using inline SVG for cross-browser compatibility and simplicity)
    const UserIcon = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>;
    const FileIcon = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-3-3v6m-4-10H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V9.5M10 4.5l-2-2m0 0l-2 2"></path></svg>;
    const CalendarIcon = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>;
    const MailIcon = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26c.71.47 1.69.47 2.4 0L21 8m-1 12H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2z"></path></svg>;

    // Quick Action Icons
    const CourseIcon = <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.5v11m-4-4h8"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 19l9-5 9 5-9 5z"></path></svg>;
    const NewsletterIcon = <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.5 4.5M19 14.5l-4.5 4.5m-5.4-8.4a3 3 0 11-4.243-4.243 3 3 0 014.243 4.243zM10.757 14.243a3 3 0 11-4.243-4.243 3 3 0 014.243 4.243z"></path></svg>;
    const ManageIcon = <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.945 3.31.879 2.458 2.458a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.945 1.543-.879 3.31-2.458 2.458a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.945-3.31-.879-2.458-2.458a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.945-1.543.879-3.31 2.458-2.458a1.724 1.724 0 002.573-1.066z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;

    // const colorMap = {
    //   'bg-blue-600': '#2563eb',
    //   'bg-green-600': '#16a34a',
    //   'bg-yellow-600': '#ca8a04',
    //   'bg-red-600': '#dc2626',
    // };
    
    const {state , dispatch} = useGlobal();
    const {user , filteredApplications , filteredBookings , filteredUsers} = state;
    const router = useRouter();
    const [ view , setView ] = useState(false);
    const [allApplications, setAllApplications] = useState([]);

    const data = async () => {
        try {
        console.log("Fetching data...");
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const [users, applications, bookings] = await Promise.all([
            axiosInstance.get("/api/users"),
            axiosInstance.get("/api/apply"),
            axiosInstance.get("/api/booking"),
        ]);
        console.log("application" , applications.data);
        console.log("bookings" , bookings.data);

        // Filter users (remove admins)
        const fileteredUsers = users.data.filter(u => u.role !== 'admin');
        setAllApplications(applications.data);

        // Filter applications (Pending + created this month)
        const filteredApplications = applications.data.filter(app => {
            const created = new Date(app.createdAt);
            return (
                app.status === "Pending" &&
                created.getMonth() === currentMonth &&
                created.getFullYear() === currentYear
            );
        });

        // Filter bookings (created this month)
        const filteredBookings = bookings.data.filter(book => {
            const created = new Date(book.createdAt);
            return (
                created.getMonth() === currentMonth &&
                created.getFullYear() === currentYear
            );
        });
        dispatch({ type: "SET_FILTERED_USERS", payload: fileteredUsers });
        dispatch({ type: "SET_FILTERED_APPLICATIONS", payload: filteredApplications });
        dispatch({ type: "SET_FILTERED_BOOKINGS", payload: filteredBookings });

        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

    useEffect(()=>{
      data();
      apiCall(axiosInstance, dispatch,router,toast , setView)
    },[]);


    // if(!view) return <div>loading... </div>;
    if(!view) return <LoadingScreen />; 

        const recentApplications = [...(allApplications || [])]
            .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt))
            .slice(0, 5);
        const trendData = getMonthTrend(allApplications);
        const coursePopularity = getCoursePopularity(allApplications);
        const coursePopularityMap = coursePopularity.reduce((accumulator, item) => {
            accumulator[item.label] = item.value;
            return accumulator;
        }, {});
        const displayCoursePopularity = coursePopularityDefaults.map((label) => ({
            label,
            value: coursePopularityMap[label] || 0,
        }));
        const chartMaxValue = 80;
        const totalUsers = filteredUsers?.length || 0;
        const getMonthlyCount = (items = []) => {
            const now = new Date();
            const currentMonth = now.getMonth();
            const currentYear = now.getFullYear();
            const previousMonthDate = new Date(currentYear, currentMonth - 1, 1);
            const previousMonth = previousMonthDate.getMonth();
            const previousYear = previousMonthDate.getFullYear();

            const current = items.filter((item) => {
                const created = new Date(item.createdAt);
                if (Number.isNaN(created.getTime())) return false;
                return created.getMonth() === currentMonth && created.getFullYear() === currentYear;
            }).length;

            const previous = items.filter((item) => {
                const created = new Date(item.createdAt);
                if (Number.isNaN(created.getTime())) return false;
                return created.getMonth() === previousMonth && created.getFullYear() === previousYear;
            }).length;

            return { current, previous };
        };

        const formatMoMChange = (current, previous) => {
            if (previous === 0 && current === 0) return "No change from last month";
            if (previous === 0 && current > 0) return "+100% from last month";

            const change = ((current - previous) / previous) * 100;
            const sign = change >= 0 ? "+" : "";
            return `${sign}${change.toFixed(1)}% from last month`;
        };

        const thisMonthApplications = allApplications.filter((application) => {
                const created = new Date(application.createdAt);
                const now = new Date();
                return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
        }).length;
        const { current: currentMonthUsers, previous: previousMonthUsers } = getMonthlyCount(filteredUsers || []);
        const { current: currentMonthApplications, previous: previousMonthApplications } = getMonthlyCount(allApplications || []);
        const approvedApplications = allApplications.filter((application) => application.status === "Approved").length;
        const pendingApplications = allApplications.filter((application) => application.status === "Pending").length;

        const statCards = [
                {
                        title: "Total Users",
                        value: totalUsers.toLocaleString(),
                    subtext: formatMoMChange(currentMonthUsers, previousMonthUsers),
                        accentClass: "bg-[#0d4f7c]",
                },
                {
                        title: "Applications This Month",
                        value: thisMonthApplications.toLocaleString(),
                    subtext: formatMoMChange(currentMonthApplications, previousMonthApplications),
                        accentClass: "bg-[#174f78]",
                },
                {
                        title: "Approved Applications",
                        value: approvedApplications.toLocaleString(),
                        accentClass: "bg-[#2f7a4b]",
                        valueClass: "text-[#2f7a4b]",
                },
                {
                        title: "Pending Applications",
                        value: pendingApplications.toLocaleString(),
                        accentClass: "bg-[#ef4444]",
                        valueClass: "text-[#ef4444]",
                },
        ];

        const adminName = user?.name || user?.fullname || "Admin";
        const adminEmail = user?.email || "admin@jkd.com";
        const adminRole = user?.role || "administrator";
        const adminInitials = adminName
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part[0]?.toUpperCase())
                .join("") || "AD";

    return (
            <div className="flex min-h-screen w-full bg-[#edf0ef]">
                <AdminLeftSidebar className="w-[276px] shrink-0" />

                <main className="flex-1 overflow-auto p-4 md:p-6">
                    <div className="mx-auto max-w-6xl space-y-6">
                        <header className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <p className="text-xl font-bold text-[#111827] sm:text-[35px] ">Welcome back, <span className="capitalize">{adminRole}</span> 👋</p>
                                <p className="mt-1 text-lg font-medium">Welcome back! Here&apos;s what&apos;s happening with your platform today.</p>
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

                        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                            {statCards.map((card) => (
                                <KPICard key={card.title} {...card} />
                            ))}
                        </section>

                        <section className="rounded-2xl border border-[#d7d7d7] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                            <div className="mb-4">
                                <h2 className="text-3xl font-semibold text-[#111827]">Application Trends</h2>
                                <p className="text-xl mt-1">Monthly application statistics</p>
                            </div>

                            <div className="rounded-xl bg-[#fbfbfb] px-3 py-4">
                                <div className="grid grid-cols-[44px_1fr] gap-2">
                                    <div className="flex h-60 flex-col justify-between pb-6 pt-1 text-right text-xs text-[#9ca3af]">
                                        {[80, 60, 40, 20, 0].map((tick) => (
                                            <span key={tick} className="pr-1">{tick}</span>
                                        ))}
                                    </div>

                                    <div className="relative h-60 rounded-l-none border-l border-b border-[#d1d5db]">
                                        <div className="absolute inset-0 flex items-end gap-3 px-4 pb-3 pt-4 sm:gap-4 md:gap-5">
                                            {trendData.map((item) => {
                                                const height = `${Math.min((item.value / chartMaxValue) * 100, 100)}%`;

                                                return (
                                                    <div key={item.label} className="flex flex-1 flex-col items-center justify-end">
                                                        <div
                                                            className="mb-2 w-full max-w-[58px] rounded-t-md bg-[#2e678f] shadow-[0_3px_6px_rgba(46,103,143,0.15)]"
                                                            style={{ height: item.value > 0 ? height : "4%" }}
                                                        />
                                                        <span className="mt-1 text-base text-[#6b7280]">{item.label}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.8fr)]">
                            <div className="rounded-2xl border border-[#d7d7d7] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                                <div className="mb-4 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-semibold text-[#111827]">Recent Applications</h2>
                                        <p className="text-lg ">Latest student applications</p>
                                    </div>
                                    <Link href="/admin/apply" className="text-base font-medium text-[#275D84] transition-colors hover:text-[#1f4c6a]">
                                        View All →
                                    </Link>
                                </div>

                                <div className="overflow-hidden rounded-xl border border-[#e5e7eb]">
                                    <table className="min-w-full border-collapse">
                                        <thead >
                        
                                            <tr className="border-b border-gray-300 space-x-4 ">
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide ">Name</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide ">Course</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide ">Date</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide ">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentApplications.map((application) => (
                                                <tr key={application._id || application.id || `${application.name}-${application.createdAt}`} className="border-t border-[#e5e7eb]">
                                                    <td className="px-4 py-4 text-sm font-medium text-[#111827]">{application.name}</td>
                                                    <td className="px-4 py-4 text-sm text-[#4b5563]">{application.chooseCourse}</td>
                                                    <td className="px-4 py-4 text-sm text-[#4b5563]">{application.createdAt?.split("T")[0]}</td>
                                                    <td className="px-4 py-4 text-sm">
                                                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(application.status)}`}>
                                                            {application.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                            {recentApplications.length === 0 ? (
                                                <tr>
                                                    <td colSpan="4" className="px-4 py-10 text-center text-sm text-[#6b7280]">
                                                        No recent applications found.
                                                    </td>
                                                </tr>
                                            ) : null}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <aside className="rounded-2xl border border-[#d7d7d7] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                                <div className="mb-4 flex items-start gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f2efff] text-[#f1e8fd]">
                                        {/* <span className="text-lg">↗</span> */}
                                       <img src="/icons/bottomuparrow.svg" alt="Course Popularity" className="w-10 h-10" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-[#111827]">Course Popularity</h2>
                                        <p className="text-sm text-[#6b7280]">This month</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {displayCoursePopularity.map((item) => {
                                        const maxValue = Math.max(...displayCoursePopularity.map((course) => course.value), 1);
                                        const width = `${Math.max((item.value / maxValue) * 100, 16)}%`;

                                        return (
                                            <div key={item.label}>
                                                <div className="mb-2 flex items-center justify-between text-sm text-[#374151]">
                                                    <span>{item.label}</span>
                                                    <span className="font-medium text-[#111827]">{item.value}</span>
                                                </div>
                                                <div className="h-2 rounded-full bg-[#e5e7eb]">
                                                    <div className="h-2 rounded-full bg-[#557aa2]" style={{ width }} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </aside>
                        </section>
                    </div>
                </main>
            </div>
    );
};

export default App;