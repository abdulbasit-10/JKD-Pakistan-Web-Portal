"use client";
import AdminLeftSidebar from '@/component/AdminLeftSidebar';
import LoadingScreen from '@/component/LoadingScreen';
import { useGlobal } from '@/context/GlobleContext';
  import axiosInstance from '@/lib/axios';
  import { useRouter } from 'next/navigation';
  import React, { useEffect, useState } from 'react';
  import { toast } from 'react-toastify';

  const Booking = () => {
    const { state } = useGlobal();
    const { email, role } = state;
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    // Fetch tourism applications
    useEffect(() => {
      applyApiCall();
    }, []);

    // Filter data based on search term
    useEffect(() => {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }, [searchTerm, data]);

    async function applyApiCall() {
      try {
        const response = await axiosInstance.get('/api/apply/tourism');
        console.log(response.data);
        setLoading(false);
        setData(response.data);
      } catch (error) {
        console.log(error);
        if (error.status === 401) {
          router.push('/login');
          toast.error('Unauthorized login again');
        }
        setLoading(false);
      }
    }

    // Update status
    const onStatusChange = async (item, newStatus) => {
      try {
        const response = await axiosInstance.put(`/api/apply/tourism/${item._id}`, { status: newStatus });
        const responseData = response.data;
        toast.success(responseData.message || "Status updated successfully");
        setData((prevData) =>
          prevData.map((application) =>
            application._id === item._id ? { ...application, status: newStatus } : application
          )
        );
      } catch (error) {
        console.error(error);
        toast.error('Error updating status');
      }
    };

    // Format date
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      });
    };

    // Get status color
    const getStatusColor = (status) => {
      switch (status) {
        case 'Confirmed':
          return 'bg-emerald-100 text-emerald-700';
        case 'Approved':
          return 'bg-emerald-100 text-emerald-700';
        case 'Pending':
          return 'bg-orange-100 text-orange-700';
        case 'Rejected':
          return 'bg-red-100 text-red-700';
        default:
          return 'bg-gray-100 text-gray-700';
      }
    };

    // Calculate stats
    const stats = {
      total: data.length,
      approved: data.filter((item) => item.status === 'Confirmed' || item.status === 'Approved').length,
      pending: data.filter((item) => item.status === 'Pending').length,
    };

    if (loading) {
      return <LoadingScreen />;
    }

    return (
      <div className="flex min-h-screen bg-white ">
        <AdminLeftSidebar />

        <main className="flex-1 overflow-x-hidden">
          <div className="px-6 py-8 sm:px-8">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#0f172a]">Booking Forms</h1>
              <p className="mt-1 text-sm text-[#64748b]">Manage service bookings and appointments</p>
            </div>

            {/* Search and Export Section */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-[#e2e8f0] bg-white px-4 py-2.5 text-sm text-[#0f172a] placeholder-[#94a3b8] outline-none transition focus:border-[#1f4d73] focus:ring-2 focus:ring-[#1f4d73]/10"
                />
              </div>
              <button className="inline-flex items-center justify-center rounded-lg bg-[#1f4d73] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1a3f5e]">
                Export
              </button>
            </div>

            {/* Stats Section */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-[#e2e8f0] bg-white p-5">
                <p className="text-sm text-[#64748b]">Total Bookings</p>
                <p className="mt-2 text-3xl font-bold text-[#0f172a]">{stats.total}</p>
              </div>
              <div className="rounded-lg border border-[#e2e8f0] bg-white p-5">
                <p className="text-sm text-[#64748b]">Approved</p>
                <p className="mt-2 text-3xl font-bold text-[#16a34a]">{stats.approved}</p>
              </div>
              <div className="rounded-lg border border-[#e2e8f0] bg-white p-5">
                <p className="text-sm text-[#64748b]">Pending</p>
                <p className="mt-2 text-3xl font-bold text-[#ea580c]">{stats.pending}</p>
              </div>
            </div>

            {/* Table Section */}
            <div className="w-full overflow-x-scroll w-[1000px]  rounded-lg border border-[#e2e8f0] bg-white">
              <table className="table-fixed  w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e2e8f0] bg-[#f8fafc]">
                    <th className="px-3 py-4 w-[50px] text-left font-semibold text-[#64748b] ">ID</th>
                    <th className="px-3 py-4 w-[120px] text-left font-semibold text-[#64748b]  ">CUSTOMER INFO</th>
                    <th className="px-3 py-4 w-[120px] text-center font-semibold text-[#64748b] ">CONTACT</th>
                    <th className="px-3 py-4 w-[120px] text-center font-semibold text-[#64748b] ">CNIC</th>
                    <th className="px-3 py-4 text-left font-semibold text-[#64748b] ">PACKAGE</th>
                    <th className="px-3 py-4 text-left font-semibold text-[#64748b] ">NO. OF PERSONS</th>
                    <th className="px-3 py-4 text-left font-semibold text-[#64748b] ">PREFER TRAVEL DATE</th>
                    <th className="px-3 py-4 text-center font-semibold text-[#64748b] ">STATUS</th>
                    <th className="px-3 py-4 text-left font-semibold text-[#64748b] ">DOCUMENTS</th>
                    <th className="px-3 py-4 text-center font-semibold text-[#64748b] ">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((booking, index) => (
                      <tr key={booking._id} className="border-b border-[#e2e8f0] hover:bg-[#f8fafc]">
                        <td className="px-3 py-4 font-medium text-[#0f172a]">{String(index + 1).padStart(2, '0')}</td>
                        <td className="px-3 py-4">
                          <div>
                            <p className="font-medium text-[#0f172a]">{booking.name}</p>
                            <p className="text-xs text-[#64748b]">{booking.email}</p>
                          </div>
                        </td>
                        <td className="px-3 py-4">
                          <p className="text-[#0f172a]">{booking.phoneNumber}</p>
                        </td>
                        <td className="px-3 py-4">
                          <p className="text-[#0f172a]">{booking.cnic}</p>
                        </td>
                        <td className="px-3 py-4">
                          <p className="text-[#0f172a]">{booking.packageTitle}</p>
                        </td>
                        <td className="px-3 py-4 text-center">
                          <p className="text-[#0f172a]">{booking.numberOfPersons}</p>
                        </td>
                        <td className="px-3  py-4">
                          <p className="text-[#0f172a]">{formatDate(booking.preferredTravelDate)}</p>
                        </td>
                        <td className="px-3 py-4">
                          <select
                            value={booking.status}
                            onChange={(e) => onStatusChange(booking, e.target.value)}
                            className={`rounded-full px-1 py-1 text-xs font-semibold cursor-pointer border-0 ${getStatusColor(booking.status)}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="px-3 text-right py-4">
                          <div className="flex flex-wrap gap-1">
                            <span className="inline-block rounded-full bg-[#d4f5d4] px-2.5 py-1 text-xs font-semibold text-[#16a34a]">
                              CNIC
                            </span>
                            {booking.documentMimeType?.includes('pdf') && (
                              <span className="inline-block rounded-full bg-[#fce4ec] px-2.5 py-1 text-xs font-semibold text-[#c2185b]">
                                Document
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-4">
                          <div className="flex gap-3">
                            <button
                              className="text-[#1f4d73] hover:text-[#1a3f5e] transition"
                              title="Call"
                            >
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </button>
                            <button
                              className="text-[#1f4d73] hover:text-[#1a3f5e] transition"
                              title="Email"
                            >
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </button>
                            <a
                              href={booking.applicationDocumentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#1f4d73] hover:text-[#1a3f5e] transition"
                              title="View Document"
                            >
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="px-6 py-8 text-center text-[#64748b]">
                        No bookings found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              </div>
            </div>
          {/* </div> */}
        </main>
      </div>
    );
  };

  export default Booking;

  //           })
  //       }catch (error) {
  //           console.log(error);
  //       }
  //   }

  //   const onDelete = async (item) => {
  //   try {
  //       const response = await axiosInstance.delete(`/api/booking/${item._id}`);
  //       const data = response.data;

  //       toast.success(data.message || "Deleted successfully");

  //       // ❗ Remove the deleted item from UI
  //       setData((prevData) => prevData.filter((app) => app._id !== item._id));

  //   } catch (error) {
  //       console.log(error);
  //       toast.error("Failed to delete");
  //   }
  //   };

  //   useEffect(() => {
  //     applyApiCall();
  //   }, []);
  //   // if(loading) {
  //   //   return <div>Loading</div>;
  //   // }
  //   if(loading) {
  //     return <LoadingScreen />;
  //   }
  //   return(
  //     // <div className={`${theme === 'light' ? 'bg-[#eefbff]':'bg-[#080808]'} flex  h-screen  w-full `}>
  //     //   <AdminLeftSidebar className="w-[20%]" />
  //     //     {/* program page content */}
  //     //     <form onSubmit={handleSubmit} className={` w-[80%] flex flex-col items-center overflow-y-scroll px-10 `}>
  //     //         <h1 className={`${theme === 'light' ? 'text-[#00874F]': 'text-[#177faa]'} text-start w-full pt-[18px] lg:text-[39px] lg:font-extrabold font-bold  `}>Booking</h1>
  //     //         {/* Name / Contact Number */}
  //     //         <div className='flex w-full gap-5 pt-8'>
  //     //             <div className='flex flex-col gap-3  w-[50%]'>
  //     //                 <label className='font-semibold'>Full Name</label>
  //     //                 <input type='text' name="fullName" value={bookingForm.fullName} onChange={handleChange} placeholder='full name' className={`${theme === 'dark' ? 'bg-[#177eaa94]' : 'bg-[#00874f85]'} p-2 rounded  outline-none`} />
  //     //             </div>
  //     //             <div className='flex flex-col gap-3 ] w-[50%]'>
  //     //                 <label className='font-semibold'>Contact Number</label>
  //     //                 <input type='number' name="contactNumber" value={bookingForm.contactNumber} onChange={handleChange} placeholder='phone Number' className={`${theme === 'dark' ? 'bg-[#177eaa94]' : 'bg-[#00874f85]'} p-2 rounded  outline-none`} />
  //     //             </div>
  //     //         </div>
  //     //         {/* Email / Booking Data */}
  //     //         <div className='flex w-full gap-5 pt-5'>
  //     //             <div className='flex flex-col gap-3  w-[50%]'>
  //     //                 <label className='font-semibold'>Email Address</label>
  //     //                 <input type='text' name="emailAddress" value={bookingForm.emailAddress} onChange={handleChange} placeholder='email' className={`${theme === 'dark' ? 'bg-[#177eaa94]' : 'bg-[#00874f85]'} p-2 rounded  outline-none`} />
  //     //             </div>
  //     //             <div className='flex flex-col gap-3  w-[50%]'>
  //     //                 <label className='font-semibold'>Booking Date</label>
  //     //                 <input type='date' name="bookingDate" value={bookingForm.bookingDate} onChange={handleChange} className={`${theme === 'dark' ? 'bg-[#177eaa94]' : 'bg-[#00874f85]'} p-2 rounded  outline-none`} />
  //     //             </div>
  //     //         </div>
  //     //         {/* time / service */}
  //     //         <div className='flex w-full gap-5 pt-5'>
  //     //             <div className='flex flex-col gap-3  w-[50%]'>
  //     //                 <label className='font-semibold'>Time Slot</label>
  //     //                 <input type='time' name="timeSlot" value={bookingForm.timeSlot} onChange={handleChange} className={`${theme === 'dark' ? 'bg-[#177eaa94]' : 'bg-[#00874f85]'} p-2 rounded  outline-none`} />
  //     //             </div>
  //     //             <div className='flex flex-col gap-3  w-[50%]'>
  //     //                 <label className='font-semibold'>Select Service / Package</label>
  //     //                 <select name="selectService" value={bookingForm.selectService} onChange={handleChange} className={`${theme === 'dark' ? 'bg-[#177eaa94]' : 'bg-[#00874f85]'} p-2 rounded  outline-none`}>
  //     //                     <option value="">Select Service / Package</option>
  //     //                     <option value="basic">Basic Package</option>
  //     //                     <option value="premium">Premium Package</option>
  //     //                     <option value="vip">VIP Package</option>
  //     //                 </select>                    
  //     //             </div>

  //     //         </div>
  //     //         {/* Persons / payment method */}
  //     //         <div className='flex w-full gap-5 pt-5'>
  //     //             <div className='flex flex-col gap-3  w-[50%]'>                
  //     //                 <label className='font-semibold'>Persons</label>
  //     //                 <input name="persons" value={bookingForm.persons} onChange={handleChange} type='number' min={1}  className={`${theme === 'dark' ? 'bg-[#177eaa94]' : 'bg-[#00874f85]'} p-2 rounded  outline-none`} />
  //     //             </div>
  //     //             <div >
  //     //                 <p className="font-medium">Payment Method:</p>
  //     //                 <div className=" flex mt-5 gap-5 ">
  //     //                     <label className="flex  gap-2">
  //     //                         <input type="radio" name="paymentMethod" value="cash" />
  //     //                         Cash
  //     //                     </label>
  //     //                     <label className="flex  gap-2">
  //     //                         <input type="radio" name="paymentMethod" value="bank"  />
  //     //                         Bank Transfer
  //     //                     </label>
  //     //                     <label className="flex  gap-2">
  //     //                         <input type="radio"  name="paymentMethod"  value="online" />
  //     //                         Online Payment
  //     //                     </label>
  //     //                 </div>
  //     //             </div>
  //     //         </div>
  //     //         <div className='self-start pt-5'>
  //     //             <button type='submit' className={`hidden md:block px-4 py-2 rounded ${theme === 'light' ? 'bg-[#00874F] hover:text-white hover:bg-black': 'hover:text-black hover:bg-white bg-[#177faa]'} transition cursor-pointer text-white text-sm md:text-[14px] lg:text-base`}>
  //     //                 Submit
  //     //             </button>
  //     //         </div>
  //     //     </form>
  //     // </div>
  //         <div className='flex   w-full h-screen'>
  //           <AdminLeftSidebar className="w-[20%]" />
  //           <div className={`w-[80%] ${theme === 'light' ? 'bg-gray-50':'bg-[#080808]'} `}>        
  //             <div className=' flex justify-between items-center px-10 h-[100px] ' >
  //                 <h1 className="text-4xl font-extrabold text-gray-800">Booking Forms</h1>
  //             </div>
  //             <div className='overflow-auto h-[500px] mx-5 '>
  //                 <div className=' p-5 bg-white rounded w-full'>
  //                 <h2 className="text-xl font-semibold text-gray-800 pb-5">All Booking Requests</h2>
  //                 <GenericTable onEdit={onEdit} onDelete={onDelete} data={data} headers={["#", "Full Name (Signature)",	"Contact & Email",	"Date & Time",	"Location (Organization)",	"Fee (Method)", "Actions"	, "Status",	"Actions & Documents"]} />
  //                 </div>
  //             </div>
  //           </div>



  //           {/* <div className={`w-[80%] ${theme === 'light' ? 'bg-white':'bg-[#080808]'} `}>        
  //             <div className=' flex justify-between items-center px-10 pt-[18px]' >
  //               <h1 className={`${theme === 'light' ? 'text-[#00874F]': 'text-[#177faa]'} text-start   lg:text-[39px] lg:font-extrabold font-bold  `}>Students Forms</h1>
  //               <div className='text-sm'>
  //                 <p className='flex gap-1 items-center'>
  //                   <span className=' font-semibold'>Email - </span>
  //                   <span>{email}</span>
  //                 </p>
  //                 <p className='flex gap-1 items-center'>
  //                   <span className='font-semibold'>Role -</span>
  //                   <span>{role}</span>
  //                 </p>
  //               </div>
  //             </div>
  //             <div className='overflow-auto h-[500px] mt-10 mx-5 '>
  //                 <GenericTable data={data} headers={[ "fullName", "email","phoneNumber", "emergencyContact", "province", "district", "tehsil", "organization", "prefferedDate", "prefferedTime", "medical", "idImageUrl", "signatureName" , "eventFee","paymentMethod", "paymentScreenshotUrl"]} />
  //                 {/* "paymentReferenceNumber" , 
  //             </div>
  //           </div> */}
  //         </div>
  //   )
  // }

  // export default Booking
