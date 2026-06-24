"use client"

import { useEffect, useState } from "react"
import AdminLeftSidebar from "@/component/AdminLeftSidebar"
import { toast } from "react-toastify"
import axiosInstance from "@/lib/axios"
import { FiEye, FiPhone, FiMail, FiDownload, FiTrash2, FiEdit2 } from "react-icons/fi"
import LoadingScreen from "@/component/LoadingScreen"

const JobApplications = () => {
  const [applications, setApplications] = useState([])
  const [filteredApplications, setFilteredApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get("/api/apply/job")
      setApplications(response.data.data);
      setFilteredApplications(response.data.data)
    } catch (err) {
      console.error("Error fetching applications:", err)
      toast.error("Failed to fetch job applications")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let filtered = applications

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== "All Status") {
      filtered = filtered.filter(app => app.status === statusFilter)
    }

    setFilteredApplications(filtered)
    setCurrentPage(1)
  }, [searchTerm, statusFilter, applications])
  console.log("filered applications", filteredApplications);
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage)
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const stats = {
    total: applications.length,
    newThisWeek: applications.filter(app => {
      const appDate = new Date(app.createdAt)
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      return appDate > weekAgo
    }).length,
    contacted: applications.filter(app => app.status === "Contacted").length,
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      "Contacted": "bg-yellow-100 text-yellow-800",
      "NEW": "bg-blue-100 text-blue-800",
      "Rejected": "bg-red-100 text-red-800",
      "Selected": "bg-green-100 text-green-800",
    }
    return statusMap[status] || "bg-gray-100 text-gray-800"
  }

  const getDocumentBadges = (app) => {
    const docs = []
    if (app.cnicPicture) docs.push("CNIC")
    if (app.latestQualificationPicture) docs.push("Resume")
    if (app.passportSizePhotograph) docs.push("Portfolio")
    if (app.paidChallanFile) docs.push("Degree")
    if (app.resumeUrl) docs.push("Resume")
    return [...new Set(docs)]
  }

  if (loading) return <LoadingScreen />

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminLeftSidebar />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-white shadow-sm p-6 border-b border-gray-200">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Job Applications</h1>
              <p className="text-sm text-gray-600 mt-1">Manage and contact applicants</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">admin@jkd.com</span>
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                AD
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 items-center">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 text-sm"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 text-sm font-medium cursor-pointer"
            >
              <option value="All Status">All Status</option>
              <option value="NEW">NEW</option>
              <option value="Contacted">Contacted</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition">
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="p-6 grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-600 text-sm font-medium mb-2">Total Applications</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-600 text-sm font-medium mb-2">New This Week</p>
            <p className="text-3xl font-bold text-gray-900">{stats.newThisWeek}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-600 text-sm font-medium mb-2">Contacted Applications</p>
            <p className="text-3xl font-bold text-gray-900">{stats.contacted}</p>
          </div>
        </div>

        {/* Table */}
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">APPLICANT INFO</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">CONTACT</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">APPLIED POSITION</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">LOCATION</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">STATUS</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">DOCUMENTS</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedApplications.length > 0 ? (
                  paginatedApplications.map((app, index) => (
                    <tr key={app._id || index} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {String((currentPage - 1) * itemsPerPage + index + 1).padStart(2, "0")}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{app.fullName || "N/A"}</p>
                          <p className="text-xs text-gray-500">{app.email || "N/A"}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-600">{app.contactNumber || app.whatsappNumber || "N/A"}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-medium text-gray-900">{app.appliedPosition || "N/A"}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-600">
                          {app.district || app.province || "N/A"}, {app.province || "Pakistan"}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(app.status || "NEW")}`}>
                          {app.status || "NEW"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-2">
                          {getDocumentBadges(app).length > 0 ? (
                            getDocumentBadges(app).map((doc, idx) => (
                              <span key={idx} className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">
                                {doc}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-gray-500">No docs</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <button
                            title="View"
                            className="text-gray-400 hover:text-gray-600 transition"
                            onClick={() => toast.info("View functionality coming soon")}
                          >
                            <FiEye size={16} />
                          </button>
                          <button
                            title="Call"
                            className="text-gray-400 hover:text-gray-600 transition"
                            onClick={() => {
                              if (app.contactNumber) window.location.href = `tel:${app.contactNumber}`
                              else toast.warning("No contact number available")
                            }}
                          >
                            <FiPhone size={16} />
                          </button>
                          <button
                            title="Email"
                            className="text-gray-400 hover:text-gray-600 transition"
                            onClick={() => {
                              if (app.email) window.location.href = `mailto:${app.email}`
                              else toast.warning("No email available")
                            }}
                          >
                            <FiMail size={16} />
                          </button>
                          <button
                            title="Download Resume"
                            className="text-gray-400 hover:text-gray-600 transition"
                            onClick={() => {
                              if (app.resumeUrl) window.open(app.resumeUrl, "_blank")
                              else toast.warning("No resume available")
                            }}
                          >
                            <FiDownload size={16} />
                          </button>
                          <button
                            title="More options"
                            className="text-gray-400 hover:text-gray-600 transition"
                            onClick={() => toast.info("More options coming soon")}
                          >
                            ⋮
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                      No applications found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <span className="text-sm text-gray-600">
              Page{" "}
              <span className="font-bold text-blue-600">
                {currentPage}
              </span>{" "}
              of{" "}
              <span className="font-bold">
                {totalPages || 1}
              </span>
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border border-gray-300 text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                ←
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded text-sm font-medium transition ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border border-gray-300 text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                →
              </button>
            </div>
            <span className="text-sm text-gray-600">
              {paginatedApplications.length} items shown
            </span>
          </div>
        </div>
      </main>
    </div>
  )
}

export default JobApplications
