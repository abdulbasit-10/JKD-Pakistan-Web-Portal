"use client";

import AdminLeftSidebar from "@/component/AdminLeftSidebar";
import LoadingScreen from "@/component/LoadingScreen";
import { useGlobal } from "@/context/GlobleContext";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FiEdit2, FiPrinter, FiSearch, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

// Legacy commented code preserved intentionally:
// import Footer from '@/component/Footer'
// import GenericTable from '@/component/genericTable'
// import Header from '@/component/Header'
// const theme = 'light';
// <div className='overflow-auto h-[500px] mx-5 '>
//   <div className=' p-5 bg-white rounded w-full'>
//     <h2 className="text-xl font-semibold text-gray-800 pb-5">All Registrations</h2>
//     <GenericTable
//       data={data}
//       onEdit={onEdit}
//       onDelete={onDelete}
//       headers={["#", "Name (Father)", "Contact & Email", "CNIC & DOB", "Course", "Location (Tehsil)", "Actions", "Status", "Documents"]}
//     />
//   </div>
// </div>

const formatDate = (value) => {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "-";

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusBadgeClass = (status) => {
  if (status === "Approved") {
    return "bg-[#d7f4df] text-[#2f8f52]";
  }

  if (status === "Rejected") {
    return "bg-[#fde5e5] text-[#b73838]";
  }

  return "bg-[#f8edcc] text-[#d07a2d]";
};

const Apply = () => {
  const { state } = useGlobal();
  const { user } = state;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const statusOptions = ["All", "Pending", "Approved", "Rejected"];

  const applyApiCall = async () => {
    try {
      let response;

      try {
        response = await axiosInstance.get("api/apply");
      } catch (firstError) {
        response = await axiosInstance.get("/api/apply");
      }

      setData(Array.isArray(response?.data) ? response.data : []);
    } catch (error) {
      const status = error?.response?.status;
      const message = error?.response?.data?.error || error?.response?.data?.detail;
      if (status === 401) {
        router.push("/login");
        toast.error("Unauthorized. Please login again.");
      } else {
        toast.error(message || "Failed to fetch applications");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    applyApiCall();
  }, []);

  const onEdit = async (item, updateStatus) => {
    try {
      const response = await axiosInstance.put(`/api/apply/${item._id}`, { status: updateStatus });
      toast.success(response.data?.message || "Status updated successfully");
      setData((prevData) =>
        prevData.map((application) =>
          application._id === item._id ? { ...application, status: updateStatus } : application
        )
      );
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to update status");
    }
  };

  const onDelete = async (item) => {
    try {
      const response = await axiosInstance.delete(`/api/apply/${item._id}`);
      toast.success(response.data?.message || "Deleted successfully");
      setData((prevData) => prevData.filter((application) => application._id !== item._id));
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const handlePrintDocuments = (item) => {
    const documents = [
      { label: "CNIC", url: item?.CNICPictureUrl },
      { label: "Degree", url: item?.qualificationUrl },
      { label: "Photo", url: item?.passportSizePicUrl },
      { label: "Challan", url: item?.challanUrl },
    ].filter((documentItem) => Boolean(documentItem.url));

    if (!documents.length) {
      toast.info("No documents available to print.");
      return;
    }

    const isImageUrl = (url) => /\.(png|jpe?g|webp|gif|bmp|svg)(\?|$)/i.test(url);
    const isPdfUrl = (url) => /\.pdf(\?|$)/i.test(url);
    const escapeHtml = (value) =>
      String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");

    const sections = documents
      .map(({ label, url }) => {
        const safeLabel = escapeHtml(label);
        const safeUrl = escapeHtml(url);

        if (isImageUrl(url)) {
          return `
            <section class="doc-block">
              <h2>${safeLabel}</h2>
              <img src="${safeUrl}" alt="${safeLabel}" />
            </section>
          `;
        }

        if (isPdfUrl(url)) {
          return `
            <section class="doc-block">
              <h2>${safeLabel}</h2>
              <iframe src="${safeUrl}" title="${safeLabel}"></iframe>
              <p class="fallback-link">If not visible, open: <a href="${safeUrl}" target="_blank" rel="noreferrer">${safeLabel}</a></p>
            </section>
          `;
        }

        return `
          <section class="doc-block">
            <h2>${safeLabel}</h2>
            <p class="fallback-link">Open document: <a href="${safeUrl}" target="_blank" rel="noreferrer">${safeLabel}</a></p>
          </section>
        `;
      })
      .join("");

    const printWindow = window.open("", "_blank", "width=900,height=900");
    if (!printWindow) {
      toast.error("Unable to open print preview. Please allow popups.");
      return;
    }

    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>Application Documents</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 24px; color: #1f2937; }
            h1 { font-size: 22px; margin-bottom: 6px; }
            .meta { margin-bottom: 18px; font-size: 14px; color: #4b5563; }
            .doc-block { page-break-inside: avoid; margin-bottom: 24px; border: 1px solid #e5e7eb; border-radius: 10px; padding: 12px; }
            .doc-block h2 { margin: 0 0 10px 0; font-size: 16px; }
            img { width: 100%; max-height: 950px; object-fit: contain; border: 1px solid #d1d5db; }
            iframe { width: 100%; min-height: 800px; border: 1px solid #d1d5db; }
            .fallback-link { font-size: 14px; }
            a { color: #1d4ed8; }
            @media print {
              body { margin: 12px; }
            }
          </style>
        </head>
        <body>
          <h1>Application Documents</h1>
          <p class="meta">Student: ${escapeHtml(item?.name || "-")} | Course: ${escapeHtml(item?.chooseCourse || "-")}</p>
          ${sections}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 300);
  };

  const filteredData = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return data.filter((item) => {
      const matchesStatus = statusFilter === "All" ? true : item?.status === statusFilter;
      const searchable = `${item?.name || ""} ${item?.email || ""} ${item?.phoneNumber || ""}`.toLowerCase();
      const matchesSearch = term ? searchable.includes(term) : true;
      return matchesStatus && matchesSearch;
    });
  }, [data, searchTerm, statusFilter]);

  const totalApplications = data.length;
  const approvedCount = data.filter((item) => item?.status === "Approved").length;
  const pendingCount = data.filter((item) => item?.status === "Pending").length;

  const handleExport = () => {
    if (!filteredData.length) {
      toast.info("No data to export.");
      return;
    }

    const headers = [
      "ID",
      "Name",
      "Phone",
      "CNIC",
      "Course",
      "Location",
      "Status",
      "Email",
      "Date",
    ];

    const rows = filteredData.map((item, index) => [
      index + 1,
      item?.name || "-",
      item?.phoneNumber || "-",
      item?.CNIC || "-",
      item?.chooseCourse || "-",
      item?.district || item?.tehsil || "-",
      item?.status || "Pending",
      item?.email || "-",
      formatDate(item?.createdAt),
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `students-forms-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <LoadingScreen />;
  }

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

  return (
    <div className="flex min-h-screen w-full bg-white">
      <AdminLeftSidebar className="w-[276px] shrink-0" />

      <main className="flex-1 overflow-auto px-4 py-5 md:px-6 md:py-5">
        <div className="mx-auto w-full max-w-[1200px] space-y-5">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-[35px] font-semibold leading-none ">Students Forms</h1>
              <p className="mt-2 text-[20px] font-normal ">Manage student applications and documents</p>
            </div>

            <div className="flex items-center gap-3 self-start">
              <div className="text-right">
                <p className="text-sm font-semibold text-[#111827]">{adminEmail}</p>
                <p className="text-sm font-medium capitalize text-[#667085]">{adminRole}</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#275D84] text-lg font-medium text-white">
                {adminInitials}
              </div>
            </div>
          </header>

          <section className="rounded-2xl  bg-white p-5 shadow-lg md:px-5 md:py-7">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-[620px]">
                <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#98a2b3]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by name or email..."
                  className="h-12 w-full rounded border border-gray-600 bg-[#fcfcfd] pl-11 pr-4 text-sm text-[#101828] outline-none transition focus:border-[#275D84]"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsStatusMenuOpen((prev) => !prev)}
                    className="flex h-12 min-w-[140px] items-center justify-between rounded-2xl cursor-pointer border border-[#d0d5dd] bg-white px-4 text-[18px] font-medium text-[#101828]"
                    aria-haspopup="listbox"
                    aria-expanded={isStatusMenuOpen}
                  >
                    <span>{statusFilter === "All" ? "All Status" : statusFilter}</span>
                    {/* <span className="text-sm text-[#667085]">{isStatusMenuOpen ? "▲" : "▼"}</span> */}
                  </button>

                  {isStatusMenuOpen ? (
                    <ul
                      role="listbox"
                      className="absolute right-0 z-20 mt-2 w-full overflow-hidden rounded-xl border border-[#d0d5dd] bg-white py-1 shadow-lg"
                    >
                      {statusOptions.map((option) => (
                        <li key={option}>
                          <button
                            type="button"
                            onClick={() => {
                              setStatusFilter(option);
                              setIsStatusMenuOpen(false);
                            }}
                            className={`w-full px-4 py-2 text-left text-base transition ${
                              statusFilter === option
                                ? "bg-[#eaf2f8] font-semibold text-[#275D84]"
                                : "text-[#101828] hover:bg-[#f2f4f7]"
                            }`}
                          >
                            {option === "All" ? "All Status" : option}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                <button
                  type="button"
                  onClick={handleExport}
                  className="h-12 min-w-[145px] rounded-2xl cursor-pointer bg-[#275D84] px-5 text-[18px] font-medium text-white transition hover:bg-[#1f4b6a]"
                >
                  Export
                </button>
              </div>
            </div>

            <div className="mt-6 border-t-2 border-gray-300 pt-4">
              <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                  <p className="text-[24px] font-medium text-[#757575]">Total Applications</p>
                  <p className="mt-1 text-[40px] font-semibold leading-none ">{totalApplications}</p>
                </div>
                <div>
                  <p className="text-[24px] font-medium text-[#757575]">Approved</p>
                  <p className="mt-1 text-[40px] font-semibold leading-none text-[#2f8f52]">{approvedCount}</p>
                </div>
                <div>
                  <p className="text-[24px] font-medium text-[#757575]">Pending</p>
                  <p className="mt-1 text-[40px] font-semibold leading-none text-[#d07a2d]">{pendingCount}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-xl border border-[#eaecf0] bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-[1100px] w-full text-left">
                <thead className="bg-gray-200  ">
                  <tr className="text-sm uppercase tracking-wide text-[#344054]">
                    <th className="px-4 py-3 font-semibold">ID</th>
                    <th className="px-4 py-3 font-semibold">Student Info</th>
                    <th className="px-4 py-3 font-semibold">Contact</th>
                    <th className="px-4 py-3 font-semibold">CNIC</th>
                    <th className="px-4 py-3 font-semibold">Course</th>
                    <th className="px-4 py-3 font-semibold">Location</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Documents</th>
                    <th className="px-4 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredData.length ? (
                    filteredData.map((item, index) => {
                      const status = item?.status || "Pending";

                      return (
                        <tr key={item?._id || index} className="border-t border-[#eaecf0] align-top text-sm text-[#475467]">
                          <td className="px-4 py-4">{index + 1}</td>
                          <td className="px-4 py-4">
                            <p className="font-medium text-[#344054]">{item?.name || "-"}</p>
                            <p className="text-xs text-[#667085]">{item?.email || "-"}</p>
                          </td>
                          <td className="px-4 py-4">{item?.phoneNumber || item?.whatsappNumber || "-"}</td>
                          <td className="px-4 py-4">{item?.CNIC || "-"}</td>
                          <td className="px-4 py-4">{item?.chooseCourse || "-"}</td>
                          <td className="px-4 py-4">{item?.district || item?.tehsil || "-"}</td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex rounded-md px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(status)}`}>
                              {status}
                            </span>
                          </td>
                          <td className="px-2 py-4">
                            <div className="flex flex-wrap gap-1.5">
                              {item?.CNICPictureUrl ? (
                                <a href={item.CNICPictureUrl} target="_blank" rel="noreferrer" className="rounded bg-[#d7f4df] px-2 py-1 text-xs font-semibold text-[#19b03a]">
                                  CNIC
                                </a>
                              ) : null}
                              {item?.qualificationUrl ? (
                                <a href={item.qualificationUrl} target="_blank" rel="noreferrer" className="rounded bg-[#d7f4df] px-2 py-1 text-xs font-semibold text-[#19b03a]">
                                  Degree
                                </a>
                              ) : null}
                              {item?.passportSizePicUrl ? (
                                <a href={item.passportSizePicUrl} target="_blank" rel="noreferrer" className="rounded bg-[#d7f4df] px-2 py-1 text-xs font-semibold text-[#19b03a]">
                                  Photo
                                </a>
                              ) : null}
                              {item?.challanUrl ? (
                                <a href={item.challanUrl} target="_blank" rel="noreferrer" className="rounded bg-[#f2f4f7] px-2 py-1 text-xs font-semibold text-[#667085]">
                                  Challan
                                </a>
                              ) : null}
                              {!item?.CNICPictureUrl && !item?.qualificationUrl && !item?.passportSizePicUrl && !item?.challanUrl ? (
                                <span className="text-xs text-[#98a2b3]">No documents</span>
                              ) : null}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2  text-[#667085]">
                              <button
                                type="button"
                                onClick={() => handlePrintDocuments(item)}
                                className="rounded p-1 transition cursor-pointer hover:bg-[#f2f4f7]"
                                aria-label="Print application"
                              >
                                {/* <FiPrinter /> */}
                                <img src="/icons/printer.svg" alt="Print" className="w-8 h-8" />
                              </button>
                              <button
                                type="button"
                                onClick={() => onDelete(item)}
                                className="rounded  transition cursor-pointer hover:bg-[#fef3f2] hover:text-[#b42318]"
                                aria-label="Delete application"
                              >
                                {/* <FiTrash2 /> */}
                                <img src="/icons/Trash.svg" alt="Delete" className="w-8 h-8" />
                              </button>
                              <button
                                type="button"
                                onClick={() => onEdit(item, item?.status === "Approved" ? "Pending" : "Approved")}
                                className="rounded p-2 cursor-pointer transition hover:bg-[#eff8ff] w-12 h-12 hover:text-[#175cd3]"
                                aria-label="Toggle approve status"
                              >
                                {/* <FiEdit2 /> */}
                                <img src="/icons/edit.svg" alt="edit icon"  className="w-8 h-8"/>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={9} className="px-4 py-10 text-center text-sm text-[#98a2b3]">
                        No student forms found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Apply;
