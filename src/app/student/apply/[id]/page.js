"use client"

import AdminLeftSidebar from '@/component/AdminLeftSidebar'
import Footer from '@/component/Footer'
import Header from '@/component/Header'
import { useGlobal } from '@/context/GlobleContext'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState, useRef } from 'react'
import { toast } from 'react-toastify'
import axiosInstance from '@/lib/axios'
import LoadingScreen from '@/component/LoadingScreen'
import StudentLeftSidebar from '@/component/studentLeftSidebar'
import Image from 'next/image'


const SubProgram = {
TVET : ["Mason – Carpenter","Welder – Plumber", "Steel Fixer – Shuttering Carpenter"," Tiles Fitter – Plaster Finisher"," Marble Fixer – Safety Supervisor"," Land Surveyor – Civil Draftsman","Building Painter – Interior Designer", "Scaffolder – Construction Labors","Electrician - Auto-mechanic","Cable Technician - HVAC Technician","CCTV Technician - Lift Operator","Loader - Auto-electrician","Refrigerator Technician","Fiber Technician - Machine Operator","Solar System Technician","Bike Mechanic - Bike Riders" ,"Housekeepers - Janitors/Cleaners","Super Store Workers/Helpers","HTV Drivers - LTV Drivers - Tyreman","Gardeners - Factory Workers", "General Farming - Dairy Farming","Poultry Farming - Aquaculture","Fruit Picker - Fruit Packaging","Construction     Workers"],
IT_and_Digital_Skills:["Graphic Designing","Web Development", "Software Development", "Digital Marketing", "Professional Photography","Documentary Ad Making 3D", "Animation VR Diploma in DIT", "Technical Drawing", "AutoCAD Civil 3D","eCommerce", "Artificial Intelligence", "Search Engine Optimization (SEO)","Cyber Security"," AI for Banking", "Investing/Trading in Stock/Forex Markets", "AI for Financial Institutes", "Anti-Money Laundering"," Diploma in Financial Market"," 3D CAD Interior Design"],
Sports_and_Fitness:[ "Indoor Futsal","Indoor Cricket","Karate","Badminton","Yoga", "Table Tennis"," Volley Ball"," Gym & Fitness","Boxing"],
Overseas_Recruitment:["Bodyweight Exercises","High-Intensity Interval Training","Spiritual & Meditative Practice","Yoga or Pilates","Exercise through Sports","Walking or Jogging","Outdoor Activities","Meal Planning & Mindful Eating","Sustainable weight loss","Increased energy and confidence","Enhanced mental well-being","Certified trainers and weightloss specialist","Personalized coaching and support","Customized fitness and training plans"],
Travels_and_Tours:["Eco-Friendly Lodges Booking","Sustainable Air Travel Reservation","Green Transportation Facility","Eco-Friendly Events","Environmental Tour Guides","Eco-Focus Photography","Eco-Fresh Meals Experience","Sustainable Tourism Certifications","Tourism Management Courses","Airline Operations – Cargo and Logistics Courses","IATA Certified – Air Ticketing Courses","Religious Tourism","Cultural Tourism – Sports Tourism","Adventure Tourism","Educational Tourism","Health Tourism – Culinary Tourism","Trade Tourism","Industrial Tourism","Corporate/Business Tourism","Backpackers Tourism","Eco-Tourism – Agriculture Tourism","Rural Tourism – Urban Tourism"],
Parlour:["Skin care","styling coloring treatment","beauty treatment","facial manicures pedicures","waxing","nail care nail art","nail shaping gel extensions","wedding makeup","Beauty therapy certifications","makeup artistry courses","skincare and product knowledge","nail technology courses","hair cutting and styling courses","bridal makeup","hair styling workshops","empowering Parlour professionals"],
Boutique:["Dress making","Tailoring & Fitting","Alterations","Fashion design","Bridal wears","Personalized styling","Wardrobe management","Fabric selection","Boutique certifications","Fashion design courses","Garment making training","Fashion illustrations","Fashion business","Alteration workshops","Bridal wear designing","Entrepreneurship training"],
Uplift_Events:["Sports Tourism & Exposures","Family/Friendly Sports Matches","Corporate/NGOs Sports Events","Sports & Cultural Festivals","Sports Championships","Arts & Literature Festivals","Meetings & Trainings","Hunar Rozgar Mela","Environmental workshops and seminars","Corporate / Business / NGOs Events","Trade Fair Exhibitions","Sustainable Food Festivals","Tourism Expos","Environmental fairs and expos","Workshops & Seminars","Job Recruitment Fair"],
Foudium:["Brunch & Breakfast","Lunch & Dinner","Pakistani Cuisine","Tandoori Chicken or Fish","Biryani – Karahi","Fast Food & Chinese Food","Burgers – Pizza – Pasta","Chai (Tea) & Coffee","Sandwiches – French Toast – Omelets","Fresh Juices & Soft Drinks","Milkshakes & Ice creams","Mineral Water – Fresh Lemonade","Certified Hospitality Management","Hospitality Accounting","Hotel Management Courses","Resort Management","Event Management","Front Desk Operations","Reception Management","Waiter/Waitress Training","Certified Chef Course (CCC)","Catering Management","Laundry Operations","Menu Planning & Kitchen Management"],

};

const itProgram=["MERN Stack","MEAN Stack" ,"Flutter ","React Native","UI/UX Design","Graphic Design",];
const tevet=["Plumber & Pipe Fabricator Course","Tile Fixer","Plasterer","Steel Fixer","Carpenter","Building Electrician","Industrial Electrician","Fiber Optics Technician","Solar System Technician","CCTV Technician","Front Office Manager","Professional Cook","Fast Food Expert","Housekeeing","Tour Operator","Domestic Skilled Worker","Welder","HVACR Technician","Lift Operator",,"Arena Football","Football","Badminton","Table Tennis","Fitness Club","Cricket"]

const CustomDropdown = ({ label, value, placeholder = 'Select', options = [], onSelect, widthClass = 'w-full', menuWidthClass = 'w-1/2', menuPosition = 'down' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const safeOptions = Array.isArray(options) ? options.filter(Boolean) : [];
    const selectedOption = safeOptions.find((option) => option?.value === value);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const menuPositionClass = menuPosition === 'up' ? 'bottom-full mb-2' : 'top-full mt-2';

    return (
        <div ref={dropdownRef} className={`relative ${widthClass}`}>
            {label ? <label className='text-sm md:text-lg font-semibold '>{label}</label> : null}
            <button
                type='button'
                onClick={() => setIsOpen((prev) => !prev)}
                className='mt-2 flex h-10 w-full  items-center justify-between rounded-md border border-gray-300 bg-white px-4 text-left text-sm text-[#222] shadow-sm transition hover:border-gray-400'
            >
                <span className={`${selectedOption ? 'text-[#222]' : 'text-[#9ca3af]'}`}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
            </button>

            {isOpen && (
                <div
                    className={`absolute left-0 z-40 max-h-[800px] overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${menuWidthClass} ${menuPositionClass}`}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {safeOptions.map((option, index) => (
                        <button
                            key={option.value}
                            type='button'
                            onClick={() => {
                                onSelect(option.value);
                                setIsOpen(false);
                            }}
                            className={`w-full  px-4 py-3 text-left text-sm text-[#222] transition hover:bg-[#f4f7fb] ${index !== options.length - 1 ? 'border-b border-gray-200' : ''}`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

const DocumentUploadBox = ({ id, label, name, required = false, value, onChange }) => {
    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor={id} className='text-sm md:text-lg font-semibold'>{label}</label>
            <div
                onClick={() => document.getElementById(id)?.click()}
                className='flex h-14 w-full cursor-pointer items-center justify-between rounded-lg border border-[#d6dbe1] bg-white px-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition hover:border-[#b7c0cb]'
            >
                <span className='text-sm text-[#525a66]'>Upload File</span>
                <Image src='/icons/uploadFile.svg' alt='Upload file icon' width={18} height={18} className='h-5 w-5 shrink-0 object-contain' />
            </div>
            <input id={id} type='file' name={name} onChange={onChange} className='hidden' required={required} />
            {value ? <p className='text-xs text-[#4f76a7] truncate'>Selected: {value.name}</p> : null}
        </div>
    )
}

const Apply = () => {
  const {id} = useParams();
  const theme = 'light';
  const [progm , setProgm] = useState(null);
  const router = useRouter();
  const {state} = useGlobal();
  const {user} = state;
  const [applyForm , setApplyForm] = useState({
    userId: user?.id || '',
    name:'',
    fatherName:'',
    gender:'',
    email:'',   
    dateOfBirth:'',
    whatsappNumber:'',
    phoneNumber:'',
    CNIC:'',
    parentsCNIC:'',
    province:'',
    district:'',
    tehsil:'',
    chooseCourse:'',
    CNICPicture:'',
    qualification:'',
    passportSizePic:'',
    passport:'',
  })
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const fieldClassName = 'h-10 w-full rounded-lg border-1 border-gray-300 bg-white px-3 text-sm text-[#222] outline-none placeholder:text-[#b7bdc5]';

  const updateField = (name, value) => {
    setApplyForm((prev) => ({
        ...prev,
        [name]: value,
    }));
  };

  const validateField = (name, value, fileValue) => {
    if (!name || name === 'passport') return '';
    
    const requiredFields = [
      'name', 'fatherName', 'gender', 'email', 'whatsappNumber', 'phoneNumber',
      'CNIC', 'parentsCNIC', 'dateOfBirth', 'province', 'district', 'tehsil',
      'chooseCourse', 'CNICPicture', 'passportSizePic'
    ];
    
    if (!requiredFields.includes(name)) return '';
    
    if (['CNICPicture', 'passportSizePic', 'qualification'].includes(name)) {
      if (!fileValue) return `${name === 'CNICPicture' ? 'CNIC Picture' : name === 'passportSizePic' ? 'Passport Size Photo' : 'Qualification'} is required.`;
      return '';
    }
    
    if (!value || value.toString().trim() === '') {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    }
    
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return 'Please enter a valid email address.';
    }
    
    if (['whatsappNumber', 'phoneNumber'].includes(name)) {
      const phoneRegex = /^\d{10,}$/;
      if (!phoneRegex.test(value.toString().replace(/\D/g, ''))) {
        return `${name === 'whatsappNumber' ? 'WhatsApp' : 'Phone'} number must be at least 10 digits.`;
      }
    }
    
    if (['CNIC', 'parentsCNIC'].includes(name)) {
      const cnicRegex = /^\d{13}$/;
      if (!cnicRegex.test(value.toString())) return 'CNIC must be 13 digits.';
    }
    
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    
    const requiredFields = [
      'name', 'fatherName', 'gender', 'email', 'whatsappNumber', 'phoneNumber',
      'CNIC', 'parentsCNIC', 'dateOfBirth', 'province', 'district', 'tehsil',
      'chooseCourse', 'CNICPicture', 'passportSizePic'
    ];
    
    requiredFields.forEach(field => {
      const error = validateField(field, applyForm[field], applyForm[field]);
      if (error) newErrors[field] = error;
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    event.preventDefault()
    const {value , name  , files } = event.target;
    if(files){
        setApplyForm((preValue) => {
            return {
                ...preValue,
                [name] : files[0]
            }
        })
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
        return;
    } 
    
    setApplyForm((preValue) => {
        return {
            ...preValue,
            [name] : value
        }
    })
    
    const error = validateField(name, value);
    setErrors((prev) => {
      const next = { ...prev };
      if (error) next[name] = error;
      else delete next[name];
      return next;
    });
  }


  
const handleSubmit = async (e) => {
  e.preventDefault()
  
  if (!validateForm()) {
    toast.error('Please fix all validation errors and try again.');
    return;
  }
  
  let formData = new FormData();
  for(let field in applyForm){
    if (applyForm[field]) {
      formData.append(field , applyForm[field]);
    }
  }
  console.log(applyForm)
  
  setLoading(true);
  try {
    const response = await axiosInstance.post("/api/apply", formData , {
      headers: { "Content-Type": "multipart/form-data" }
    });
    console.log(response);
    const data = response.data;

    toast.success(data.message || "Login successful");
    setApplyForm({
    userId: user?.id || '',
    name:'',
    fatherName:'',
    gender:'',
    email:'',   
    dateOfBirth:'',
    whatsappNumber:'',
    phoneNumber:'',
    CNIC:'',
    parentsCNIC:'',
    province:'',
    district:'',
    tehsil:'',
    chooseCourse:'',
    CNICPicture:'',
    qualification:'',
    passportSizePic:'',
    passport:'',
  });
    router.push("/student");

  } catch (err) {
    console.log("catch block", err)
    const errorMessage = err.response?.data?.error || "Something went wrong. Please try again.";
    toast.error(errorMessage);
  } finally {
    setLoading(false);
  }
};

  const [screenLoading, setScreenLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreenLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (screenLoading) return <LoadingScreen />;

  return (
    <div className={`${theme === 'light' ? 'bg-white text-black':'bg-[#080808] text-white'} min-h-screen flex w-full `}>
        <StudentLeftSidebar className="w-[20%]" />
        <div className='w-[80%] flex flex-col'>
          <form onSubmit={handleSubmit} className={`w-[95%] max-w-[1200px] flex flex-col items-start gap-2 border border-[#cdd3d9] rounded-md bg-[#f2f6f8] p-4 sm:p-6 md:p-8 mt-8 mb-10 mx-auto`}>
              <h3 className='text-[24px] font-bold w-full'>
                 Personal Details
              </h3>
              {/* name and father name */}
              <div className='grid w-full grid-cols-1 gap-4 pt-4 md:grid-cols-2'>
              <div  className='flex flex-col gap-2'>
                      <label htmlFor="name" className='font-semibold text-sm md:text-lg '>Name</label>
                      <input id='name' type='text' name='name' onChange={handleChange} value={applyForm.name} placeholder='Name' className={fieldClassName}  required/>
                      {errors.name && <p className='text-xs text-[#E82646]'>{errors.name}</p>}
                  </div>
                  <div className='flex flex-col gap-2'>
                      <label htmlFor='fName' className='text-sm md:text-lg font-semibold'>Father Name</label>
                      <input id='fName' type='text' name='fatherName' onChange={handleChange} value={applyForm.fatherName} placeholder='father name' className={fieldClassName} required />
                      {errors.fatherName && <p className='text-xs text-[#E82646]'>{errors.fatherName}</p>}
                  </div>
              </div>
              {/* gender and email */}
              <div className='grid w-full grid-cols-1 gap-4 pt-4 md:grid-cols-2'>
                  <CustomDropdown
                      label='Gender'
                      value={applyForm.gender}
                      placeholder='Select'
                      widthClass='w-full'
                      onSelect={(value) => {
                        updateField('gender', value);
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next['gender'];
                          return next;
                        });
                      }}
                      options={[
                          { label: 'Male', value: 'Male' },
                          { label: 'Female', value: 'Female' },
                          { label: 'Other', value: 'Other' },
                      ]}
                  />
                  {errors.gender && <p className='text-xs text-[#E82646]'>{errors.gender}</p>}
                  <div className='flex flex-col gap-2'>
                      <label className='text-sm md:text-lg font-semibold'>Email</label>
                      <input type='email' name='email' onChange={handleChange} value={applyForm.email}  placeholder='email' className={fieldClassName} required />
                      {errors.email && <p className='text-xs text-[#E82646]'>{errors.email}</p>}
                  </div>
              </div>
              {/* whatsapp and Phone number */}
              <div className='grid w-full grid-cols-1 gap-4 pt-4 md:grid-cols-2'>
                  <div className='flex flex-col gap-2'>
                      <label className='text-sm md:text-lg font-semibold'>Whatsapp Number</label>
                      <input type='text' name='whatsappNumber' onChange={handleChange} value={applyForm.whatsappNumber} placeholder='whatsapp number' className={fieldClassName} required />
                      {errors.whatsappNumber && <p className='text-xs text-[#E82646]'>{errors.whatsappNumber}</p>}
                  </div>
                  <div className='flex flex-col gap-2'>
                      <label className='text-sm md:text-lg font-semibold'>Phone Number</label>
                      <input type='tel' name='phoneNumber' onChange={handleChange} value={applyForm.phoneNumber} placeholder='phone number' className={fieldClassName} required />
                      {errors.phoneNumber && <p className='text-xs text-[#E82646]'>{errors.phoneNumber}</p>}
                  </div>
              </div>
              {/* CNIC and father/mother CNIC */}
              <div className='grid w-full grid-cols-1 gap-4 pt-4 md:grid-cols-2'>
                  <div className='flex flex-col gap-2'>
                      <label className='text-sm md:text-lg font-semibold'>CNIC</label>
                      <input type='text' name='CNIC' onChange={handleChange} value={applyForm.CNIC} placeholder='without dashes' className={fieldClassName} required />
                      {errors.CNIC && <p className='text-xs text-[#E82646]'>{errors.CNIC}</p>}
                  </div>
                  <div className='flex flex-col gap-2'>
                      <label className='text-sm md:text-lg font-semibold'>Father / Mother CNIC</label>
                      <input type='text' name='parentsCNIC' onChange={handleChange} value={applyForm.parentsCNIC} placeholder='without dashes' className={fieldClassName} required />
                      {errors.parentsCNIC && <p className='text-xs text-[#E82646]'>{errors.parentsCNIC}</p>}
                  </div>
              </div>
              <div className='flex flex-col gap-2 w-full pt-4 md:w-1/2'>
                  <label className='text-sm md:text-lg font-semibold'>Date of Birth</label>
                  <input type='date' name='dateOfBirth' onChange={handleChange} value={applyForm.dateOfBirth} className={fieldClassName} required />
                  {errors.dateOfBirth && <p className='text-xs text-[#E82646]'>{errors.dateOfBirth}</p>}
              </div>
              {/* Applicant Address */}
              <h3 className='text-[24px] font-bold w-full pt-6'>
                  Applicant Address
              </h3>
              {/* province / district / tehsil */}
              <div className='grid w-full grid-cols-1 gap-4 pt-4 md:grid-cols-3'>
                  <CustomDropdown
                      label='Province'
                      value={applyForm.province}
                      placeholder='Select'
                      onSelect={(value) => {
                        updateField('province', value);
                        updateField('district', '');
                        updateField('tehsil', '');
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next['province'];
                          delete next['district'];
                          delete next['tehsil'];
                          return next;
                        });
                      }}
                      options={[
                          { label: 'Punjab', value: 'Punjab' },
                          { label: 'Sindh', value: 'Sindh' },
                          { label: 'Balochistan', value: 'Balochistan' },
                          { label: 'Khyber Pakhtunkhwa', value: 'Khyber Pakhtunkhwa' },
                      ]}
                  />
                  {errors.province && <p className='text-xs text-[#E82646]'>{errors.province}</p>}
                  <CustomDropdown
                      label='District'
                      value={applyForm.district}
                      placeholder='Select'
                      onSelect={(value) => {
                        updateField('district', value);
                        updateField('tehsil', '');
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next['district'];
                          delete next['tehsil'];
                          return next;
                        });
                      }}
                      options={
                          applyForm?.province === 'Punjab' ? [{ label: 'Lahore', value: 'Lahore' }] :
                          applyForm?.province === 'Sindh' ? [{ label: 'Karachi', value: 'Karachi' }] :
                          applyForm?.province === 'Balochistan' ? [{ label: 'Quetta', value: 'Quetta' }] :
                          applyForm?.province === 'Khyber Pakhtunkhwa' ? [{ label: 'Peshawar', value: 'Peshawar' }] :
                          []
                      }
                  />
                  {errors.district && <p className='text-xs text-[#E82646]'>{errors.district}</p>}
                  <CustomDropdown
                      label='Tehsil'
                      value={applyForm.tehsil}
                      placeholder='Select'
                      onSelect={(value) => {
                        updateField('tehsil', value);
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next['tehsil'];
                          return next;
                        });
                      }}
                      options={
                          applyForm?.province === 'Punjab' && applyForm?.district === 'Lahore' ? [{ label: 'Lahore', value: 'Lahore' }] :
                          applyForm?.province === 'Sindh' && applyForm?.district === 'Karachi' ? [{ label: 'Karachi', value: 'Karachi' }] :
                          applyForm?.province === 'Balochistan' && applyForm?.district === 'Quetta' ? [{ label: 'Quetta', value: 'Quetta' }] :
                          applyForm?.province === 'Khyber Pakhtunkhwa' && applyForm?.district === 'Peshawar' ? [{ label: 'Peshawar', value: 'Peshawar' }] :
                          []
                      }
                  />
                  {errors.tehsil && <p className='text-xs text-[#E82646]'>{errors.tehsil}</p>}
              </div>
              {/* Preffered Course*/}
              <h3 className='text-[24px] font-bold w-full pt-6'>
                  Preferred Course
              </h3>
              {/* sector / course */}
              <div className='flex flex-col w-full gap-2 pt-4 md:w-1/2'>
                  <CustomDropdown
                      label='Choose Sector'
                      value={applyForm.chooseCourse}
                      placeholder='Select'
                      menuPosition='up'
                      onSelect={(value) => {
                        updateField('chooseCourse', value);
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next['chooseCourse'];
                          return next;
                        });
                      }}
                      options={
                          id === 'it-program' ? itProgram.map((program) => ({ label: program, value: program })) :
                          id === 'tevet' ? tevet.map((program) => ({ label: program, value: program })) :
                          []
                      }
                  />
                  {errors.chooseCourse && <p className='text-xs text-[#E82646]'>{errors.chooseCourse}</p>}
              </div> 

              {/* Documents */}
              <h3 className='text-[24px] font-bold w-full pt-6'>
                  Documents
              </h3>
              <p className='text-sm md:text-base font-medium w-full'>
                  Please upload the following documents
              </p>
              {/* CNIC and qualification pic */}
              <div className='grid w-full grid-cols-1 gap-4 pt-4 md:grid-cols-2'>
                  <div className='flex flex-col gap-2'>
                      <DocumentUploadBox id='CNICPicture' label='CNIC Picture (Front & Back)' name='CNICPicture' required value={applyForm.CNICPicture} onChange={handleChange} />
                      {errors.CNICPicture && <p className='text-xs text-[#E82646]'>{errors.CNICPicture}</p>}
                  </div>
                  <div className='flex flex-col gap-2'>
                      <DocumentUploadBox id='qualification' label='Latest Qualification Picture' name='qualification' value={applyForm.qualification} onChange={handleChange} />
                      {errors.qualification && <p className='text-xs text-[#E82646]'>{errors.qualification}</p>}
                  </div>
              </div>

              {/* Passport Size Photo and Passport */}
              <div className='grid w-full grid-cols-1 gap-4 pt-4 md:grid-cols-2'>
                  <div className='flex flex-col gap-2'>
                      <DocumentUploadBox id='passportSizePic' label='Passport Size Photograph' name='passportSizePic' required value={applyForm.passportSizePic} onChange={handleChange} />
                      {errors.passportSizePic && <p className='text-xs text-[#E82646]'>{errors.passportSizePic}</p>}
                  </div>
                  <DocumentUploadBox id='passport' label='Passport (optional)' name='passport' value={applyForm.passport} onChange={handleChange} />
              </div>    

              <div className='w-full flex justify-center pt-6'>
                  <button type='submit' disabled={loading || Object.keys(errors).length > 0} className={`w-full md:w-auto md:min-w-[300px] px-4 py-2 rounded-md ${theme === 'light' ? 'bg-[#4A709F] hover:bg-[#3d6290]': 'hover:text-black hover:bg-white bg-[#177faa]'} transition cursor-pointer text-white text-sm md:text-[14px] lg:text-base disabled:opacity-60 disabled:cursor-not-allowed`}>
                      {loading ? "Submiting..." : "Submit Form"}
                  </button>
              </div>
          </form>
        </div>
    </div>
  )
}

export default Apply