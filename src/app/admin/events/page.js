"use client";

import { useEffect, useState } from "react";
import AdminLeftSidebar from "@/component/AdminLeftSidebar";
import LoadingScreen from "@/component/LoadingScreen";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axios";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/events");
      setEvents(response.data.data);
      setFilteredEvents(response.data.data);
    } catch (err) {
      console.error("Error fetching events:", err);
      toast.error("Failed to fetch event bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          `${event.firstName} ${event.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "All Status") {
      filtered = filtered.filter((event) => event.status === statusFilter);
    }

    setFilteredEvents(filtered);
  }, [searchTerm, statusFilter, events]);

  const getStatusBadge = (status) => {
    const statusMap = {
      Pending: "bg-yellow-100 text-yellow-800",
      Confirmed: "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-red-800",
    };
    return statusMap[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminLeftSidebar />

      <main className="flex-1">
        <div className="bg-white shadow-sm p-6 border-b border-gray-200">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Event Bookings</h1>
              <p className="text-sm text-gray-600 mt-1">Manage event booking requests</p>
            </div>
          </div>

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
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">NAME</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">CONTACT</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">EVENT TYPE</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">DATE/TIME</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">PAYMENT</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event, index) => (
                    <tr key={event._id || index} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {String(index + 1).padStart(2, "0")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-medium text-gray-900">{event.firstName} {event.lastName}</p>
                        <p className="text-xs text-gray-500">{event.email}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{event.phoneNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{event.eventType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{event.eventDateTime}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{event.paymentMethod}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(event.status || "Pending")}`}>
                          {event.status || "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      No event bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventsPage;
