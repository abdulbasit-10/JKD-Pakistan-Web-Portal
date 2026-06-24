"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { CreditCard, GraduationCap, Image as ImageIcon, Globe, Clock} from "lucide-react";
import { useState } from 'react';

// import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';

function readibleDate(isoDate) {
    const date = new Date(isoDate);

    const onlyDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    });

    return onlyDate;
}

function readibleTime(isoDateTime) {
  console.log(isoDateTime);
  const date = new Date(isoDateTime);
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // show AM/PM
  });

  return formattedTime;
}

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



const GenericTable = ({ headers,  data, currentTheme, onEdit, onDelete}) => {
  
const [editView, setEditView] = useState(false);
  return (
    <table className=" overflow-scroll rounded w-full">
      <thead className='text-sm text-[#1F2937]  border-b border-gray-300 '>
        {/* top Header */}
      <tr className=''>
          {headers.map((header, index) => (
                <th
                  key={index}
                  className={`bg-gray-50 px-4 py-2`}
                >
                  {header}
                </th> 
          ))}
          </tr>
      </thead>

      {/* tabel data */}
      <tbody>
        {data?.length > 0 ? (
          data?.map((item, idx) => (
            <tr
              key={idx}
              className={`hover:bg-gray-100  text-sm ${currentTheme === 'dark' ? 'hover:bg-[#404052]' : ''
                }`}
            >
              {/* {headers.map((header, index) => {
                // if (header.toLowerCase() === 'actions') {
                //   return (
                //     <td
                //       key={index}
                //       className={`px-4 py-2 ${currentTheme === 'dark' ? 'text-white' : 'text-black'
                //         } text-center`}
                //     >
                //       <FontAwesomeIcon
                //         icon={faEdit}
                //         className="text-green-500 mr-2 cursor-pointer"
                //         onClick={() => onEdit(item)}
                //       />
                //       <FontAwesomeIcon
                //         icon={faTrash}
                //         className="text-red-500 cursor-pointer"
                //         onClick={() => onDelete(item)}
                //       />
                //     </td>
                //   );
                // }

                if (header.toLowerCase() === 'cnicpictureurl' || header.toLowerCase() === 'qualificationurl' || header.toLowerCase() === 'passportsizepicurl' || header.toLowerCase() === 'paymentscreenshoturl' || header.toLowerCase() === 'passporturl'|| header.toLowerCase() === 'idimageurl'){
                return (
                  <td
                  className='text-center'
                    key={index}
                    >
                        <a href={item[header]} target="_blank" rel="noopener noreferrer" style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}> {item[header]? header.split(/(?=[A-Z])/).join(' ') : null}</a>
                    </td>
                )
                }
                
                if(header.toLowerCase() === 'sno'){
                  return (
                    <td
                    className='text-center'
                      key={index}
                      >
                          {idx + 1}
                      </td>
                  )
                }


                // if (header.toLowerCase() === 'qualificationurl') {
                //     return (
                //     <td
                //     className='text-center'
                //         key={index}
                //         >
                //             <a href={item[header]} target="_blank" rel="noopener noreferrer" style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}> Qualification Pic</a>
                //         </td>
                //     )
                // }

                // if (header.toLowerCase() === 'passportsizepicurl') {
                //     return (
                //         <td
                //         className='text-center'
                //             key={index}
                //             >
                //             <a href={item[header]} target="_blank" rel="noopener noreferrer" style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}> Student Pic</a>
                //         </td>
                //     )
                // }

                // if (header.toLowerCase() === 'passporturl') {
                //     return (
                //         <td
                //         className='text-center'
                //             key={index}
                //             >
                //             <a href={item[header]} target="_blank" rel="noopener noreferrer" style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}> passport Pic</a>
                //         </td>
                //     )
                // }

                if (header.toLowerCase() === 'dateofbirth' || header.toLowerCase() === 'preffereddate') {
                return (
                  <td
                    key={index}
                    >
                        {readibleDate(item[header])}
                    </td>
                )
                }

                return (
                  <td
                    key={index}
                    className={`px-4 py-2 ${currentTheme === 'dark' ? 'text-white' : 'text-black'
                      } text-center`}
                  >
                    {item[header]}
                  </td>
                );
              })} */}
              
              {headers.map((header, index) => {
                if(header.toLowerCase() === '#'){
                  return (
                    <td
                    className='text-center pt-2'
                      key={index}
                      >
                          {idx + 1}
                      </td>
                  )
                }

                if(header === 'Name (Father)'){
                  return (
                    <td
                    className='text-center pt-2'
                      key={index}
                      >
                      <p className=''>
                        {item['name']}
                      </p>
                      
                      <span className=' text-[#6B7280]'>
                        {item['gender'] === 'Male'?'S/O: ':"D/O: "}{item['fatherName']}
                      </span>
                    </td>
                  )
                }

                if(header === 'Contact & Email'){
                  return (
                    <td
                    className='text-center pt-2'
                      key={index}
                      >
                      <p className=''>
                        {item['phoneNumber']}
                      </p>
                      <p className=''>
                        {item['whatsappNumber'] ? `(what: ${item['whatsappNumber']})` : `(Emer: ${item['emergencyContact']})`}
                      </p>                      
                      <span className=' text-[#2563EB]'>{item['email']}
                      </span>
                    </td>
                  )
                }

                if(header === 'CNIC & DOB'){
                  return (
                    <td
                    className='text-center pt-2'
                      key={index}
                      >
                      <p className=''>
                        {item['CNIC']}
                      </p>
                      <p className=' text-[#6B7280]'>
                        {readibleDate(item['dateOfBirth'])}
                      </p>                     
                      <span className=' text-[#6B7280]'>
                        ({item['gender']})
                      </span>
                    </td>
                  )
                }
                
                if(header === 'Course'){
                  return (
                    <td
                    className='text-center text-base px-4 text-[#00874F] pt-2'
                      key={index}
                    >
                    {item['chooseCourse']}  
                    </td>
                  )
                }

                if(header === 'Location (Tehsil)' || header === 'Location (Organization)'){
                  return (
                    <td
                    className='text-center pt-2'
                      key={index}
                      >
                      <p className=''>
                        {item['province']},{item['district']}
                      </p>
                      <p className={`${item['organization'] ? null:'text-[#6B7280]'}`}>
                        (Tehsil: {item['tehsil']})
                      </p>          
                      {item['organization'] &&           
                      <span className='text-xs text-[#6B7280]'>
                        (Organization: {item['organization']})
                      </span>
                      }
                    </td>
                  )
                }

                if (header.toLowerCase() === 'actions') {
                  return (
                    <td
                      key={index}
                      className={`px-4 py-2 ${currentTheme === 'dark' ? 'text-white' : 'text-black'
                        } text-center`}
                    >
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="text-green-500 mr-2 cursor-pointer"
                        // onClick={() => onEdit(item)}
                        onClick={()=>setEditView(!editView)}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-red-500 cursor-pointer"
                        onClick={() => onDelete(item)}
                      />
                      {editView}

                      {editView && (
                        <div className=" flex flex-col gap-2 mt-2">
                          <button onClick={()=>{setEditView(!editView); onEdit(item , "Approved")}} className="font-semibold text-sm border border-gray-300 bg-gray-50 px-2 rounded  cursor-pointer">Approve</button>
                          <button onClick={()=>{setEditView(!editView); onEdit(item , "Rejected")}} className="font-semibold text-sm border border-gray-300 bg-gray-50 px-2 rounded cursor-pointer">Reject</button>
                        </div>
                      )}
                    </td>
                  );
                }

                if(header === 'Documents' || header === 'Actions & Documents'){
                  return (
                      <td   key={index}>
                      {
                        item['idImageUrl']?
                        <div className='pt-2 flex  gap-2 flex-wrap justify-center '>
                          {/* <!-- CNIC --> */}
                          <a href={item['idImageUrl']} target="_blank" className="flex items-center bg-blue-500 text-white text-xs px-3  py-1 rounded-full  hover:bg-blue-600">
                              <CreditCard className="w-3 h-3 mr-1" /> Client CNIC
                          </a>
                        </div>
                        :  
                        <div className="pt-2 flex  gap-2 flex-wrap justify-center ">
                            {/* <!-- CNIC --> */}
                            <a href={item['CNICPictureUrl']} target="_blank" className="flex items-center bg-blue-500 text-white text-xs px-3  py-1 rounded-full  hover:bg-blue-600">
                                <CreditCard className="w-3 h-3 mr-1" /> CNIC
                            </a>
                            {/* <!-- Qualification --> */}
                            <a href={item['qualificationUrl']} target="_blank" className="flex items-center bg-green-500 text-white text-xs px-3 py-1 rounded-full  hover:bg-green-600">
                                <GraduationCap className="w-3 h-3 mr-1" /> Degree
                            </a>
                            {/* <!-- Passport Photo --> */}
                            <a href={item['passportSizePicUrl']} target="_blank" className="flex  items-center bg-yellow-500 text-white text-xs px-3 py-1 rounded-full  hover:bg-yellow-600">
                                <ImageIcon className="w-3 h-3 mr-1" /> Photo
                            </a>
                            {/* <!-- Passport (if applicable) --> */}
                            {/* <a href={item['passportUrl']} target="_blank" className="flex items-center bg-red-500 text-white text-xs px-3 py-1 rounded-full hover:bg-red-600">
                                <Globe className="w-3 h-3 mr-1" /> Passport
                            </a> */}
                            <a href={item['challanUrl']} target="_blank" className="flex items-center bg-black text-white text-xs px-3 py-1 rounded-full ">
                                <Globe className="w-3 h-3 mr-1" /> Challan
                            </a>
                        </div>
                      }
                    </td>
                  )
                }
                  // booking table
                if(header === 'Full Name (Signature)'){
                  return (
                    <td
                    className='text-center pt-2'
                      key={index}
                      >
                      <p className=''>
                        {item['fullName']}
                      </p>
                      
                      <span className=' text-[#6B7280]'>
                        Signature: {item['signatureName']}
                      </span>
                    </td>
                  )
                }

                if(header === 'Date & Time'){
                  return (
                    <td
                    className='text-center pt-2'
                      key={index}
                      >
                      <p className=''>
                        {readibleDate(item['prefferedDate'])}
                      </p>
                      <p className=' text-[#6B7280]'>
                        {item['prefferedTime']}
                      </p>   
                    </td>
                  )
                }

                if(header === 'Fee (Method)'){
                  return (
                    <td
                    className='text-center  px-4  pt-2'
                      key={index}
                    >
                      <p className='text-[#00874F] text-base'>{item['eventFee']}</p>
                      <span className=' text-[#6B7280]'>Method: {item['paymentMethod']}</span>
                    </td>
                  )
                }

                if(header === 'Status'){
                  return (
                    // <td
                    // className='text-center pt-2'
                    //   key={index}
                    //   >
                    //     <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    //       <Clock  className="w-3 h-3 mr-1"/> Pending
                    //     </span>
                    // </td>
                    <td key={index} className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(item['status'])}`}>
                          {item['status']}
                      </span>
                    </td>
                  )
              }

                return (
                  <td
                    key={index}
                    className={`px-4 py-2 ${currentTheme === 'dark' ? 'text-white' : 'text-black'
                      } text-center`}
                  >
                    {item[header]}
                  </td>
                );
              })}
            </tr>
          )))
          : (
            <tr>
              <td colSpan={headers.length} className="px-4 py-2 text-center text-gray-500">
                no form submitted
              </td>
            </tr>
          )}

      </tbody>
    </table>
);
};

export default GenericTable;