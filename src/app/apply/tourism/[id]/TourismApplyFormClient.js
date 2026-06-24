"use client";

import { useState } from "react";

export default function TourismApplyFormClient({ packageId, trip, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    cnic: "",
    phoneNumber: "",
    email: "",
    numberOfPersons: "",
    preferredTravelDate: "",
  });
  const [documentFile, setDocumentFile] = useState(null);
  const [status, setStatus] = useState({ loading: false, message: "", error: false });

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setDocumentFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!documentFile) {
      setStatus({
        loading: false,
        message: "Please upload CNIC/Passport copy.",
        error: true,
      });
      return;
    }
    setStatus({ loading: true, message: "", error: false });

    const formData = new FormData();
    formData.append("packageId", packageId.toString());
    formData.append("packageTitle", trip.title);
    formData.append("packageLocation", trip.location || "");
    formData.append("packageDuration", trip.duration || "");
    formData.append("packagePrice", trip.price || "");
    formData.append("name", form.name);
    formData.append("fatherName", form.fatherName);
    formData.append("cnic", form.cnic);
    formData.append("phoneNumber", form.phoneNumber);
    formData.append("email", form.email);
    formData.append("numberOfPersons", form.numberOfPersons);
    formData.append("preferredTravelDate", form.preferredTravelDate);

    if (documentFile) {
      formData.append("applicationDocument", documentFile);
    }

    try {
      const response = await fetch("/api/apply/tourism", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to submit application.");
      }

      const bookingReference = `TRS${Math.floor(100000000 + Math.random() * 900000000)}`;
      const resultData = {
        bookingId: bookingReference,
        packageName: trip.title,
        persons: form.numberOfPersons || "1",
        travelDate: formatDisplayDate(form.preferredTravelDate),
        email: form.email,
      };

      if (onSuccess) {
        onSuccess(resultData);
      }
      setStatus({ loading: false, message: "", error: false });
    } catch (error) {
      setStatus({ loading: false, message: error.message, error: true });
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-semibold text-[#25364a]">Full Name*</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            placeholder="Full Name"
            className="h-11 w-full rounded-xl border-2 border-gray-300 bg-white px-3 text-[13px] outline-none transition placeholder:text-[#b6bec8] focus:border-[#84a8c7] focus:ring-2 focus:ring-[#d9e7f2]"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-semibold text-[#25364a]">Father Name*</label>
          <input
            name="fatherName"
            value={form.fatherName}
            onChange={handleChange}
            type="text"
            placeholder="Father Name"
            className="h-11 w-full rounded-xl border-2 border-gray-300 bg-white px-3 text-[13px] outline-none transition placeholder:text-[#b6bec8] focus:border-[#84a8c7] focus:ring-2 focus:ring-[#d9e7f2]"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-[#25364a]">CNIC*</label>
          <input
            name="cnic"
            value={form.cnic}
            onChange={handleChange}
            type="text"
            placeholder="XXXXX-XXXXXXX-X"
            className="h-11 w-full rounded-xl border-2 border-gray-300 bg-white px-3 text-[13px] outline-none transition placeholder:text-[#b6bec8] focus:border-[#84a8c7] focus:ring-2 focus:ring-[#d9e7f2]"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-[#25364a]">Contact Number*</label>
          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            type="tel"
            placeholder="+92 XXXXXXXXXX"
            className="h-11 w-full rounded-xl border-2 border-gray-300 bg-white px-3 text-[13px] outline-none transition placeholder:text-[#b6bec8] focus:border-[#84a8c7] focus:ring-2 focus:ring-[#d9e7f2]"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-semibold text-[#25364a]">Email Address*</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email Address"
            className="h-11 w-full rounded-xl border-2 border-gray-300 bg-white px-3 text-[13px] outline-none transition placeholder:text-[#b6bec8] focus:border-[#84a8c7] focus:ring-2 focus:ring-[#d9e7f2]"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-[#25364a]">Number of Persons*</label>
          <select
            name="numberOfPersons"
            value={form.numberOfPersons}
            onChange={handleChange}
            className="h-11 w-full rounded-xl border-2 border-gray-300 bg-white px-3 text-[13px] text-[#4b5563] outline-none transition focus:border-[#84a8c7] focus:ring-2 focus:ring-[#d9e7f2]"
            required
          >
            <option value="">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5+">5+</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-[#25364a]">Preferred Travel Date*</label>
          <input
            name="preferredTravelDate"
            value={form.preferredTravelDate}
            onChange={handleChange}
            type="date"
            className="h-11 w-full rounded-xl border-2 border-gray-300 bg-white px-3 text-[13px] text-[#4b5563] outline-none transition focus:border-[#84a8c7] focus:ring-2 focus:ring-[#d9e7f2]"
            required
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-[#25364a]">Upload Documents (CNIC/Passport Copy)*</label>
        <div className="rounded-xl border-2 border-dashed border-[#506EE4] bg-white px-4 py-5">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3 text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2d5b82] shadow-sm">
                <span className="text-[18px]">🖼</span>
              </div>
              <div>
                <p className="text-[12px] font-medium text-[#344556]">Drag And Drop Files Here Or Upload</p>
                <p className="mt-1 text-[10px] text-[#7a8797]">Accepted file types: PNG, JPG, JPEG, PDF</p>
                {documentFile && <p className="mt-1 text-[11px] text-[#1f4d73]">Selected: {documentFile.name}</p>}
              </div>
            </div>

            <label className="inline-flex cursor-pointer items-center rounded-[6px] bg-[#2d5b82] px-4 py-2 text-[13px] font-medium text-white transition hover:bg-[#214865]">
              Upload
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.pdf"
                className="hidden"
                onChange={handleFileChange}
                // required
              />
            </label>
          </div>
        </div>
      </div>

      {status.message ? (
        <div className={`rounded-lg px-4 py-3 text-sm ${status.error ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"}`}>
          {status.message}
        </div>
      ) : null}

      <div className="flex justify-center pt-2">
        <button
          type="submit"
        //   onClick={handleSubmittest}
          disabled={status.loading}
          className="h-10 w-full max-w-[320px] rounded-[6px] bg-[#4d76a8] px-4 text-[18px] font-medium text-white transition hover:bg-[#3f6798] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status.loading ? "Submitting..." : "Submit Form"}
        </button>
      </div>
    </form>
  );
}
