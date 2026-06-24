"use client"
import Image from "next/image"
import logo from "../../public/jkd-icon.png"
import jkdLogo from "../../public/jkd_logo.png"
import text from "../../public/logo-text.png"
import { useEffect, useState } from "react"
import { useRouter  , usePathname } from "next/navigation"
import Link from "next/link"
import upArrow from "../../public/arrowUp.png"
import downArrow from "../../public/arrowDown.png"
import { useGlobal } from "@/context/GlobleContext"

export default function Header() {
  const [dropDown,setDropDown] = useState({
    itCourses:false,
    tevet:false,
    // traingings:false
    trainings:false
  });
  const  pages = [
    {path:'/' , name:'Home'},
    // {path:'/about-us' , name:'About us'},
    {path:'#' , name:'Trainings' , hover:'trainings'},
    {path:'/tourism' , name:'Tourism'},
    {path:'/events' , name:'Events'},
    {path:'/apply/job' , name:'Jobs'},
    {path:'/media' , name:'Media'},
    {path:'/contact-us', name:'Contact us'}
  ]
  // const {theme , setTheme} = useGlobal();
  const theme = "dark";
  const {user} = useGlobal().state;
  const router = useRouter();
  const pathname = usePathname();
  const itCoursesPaths = [
    "/course/search-engine-marketing",
    "/course/social-media-marketing",
    "/course/content-marketing-course",
    "/course/email-marketing-course",
    "/course/mern-stack",
    "/course/mean-stack",
    "/course/pern-stack",
    "/course/flutter",
    "/course/react-native",
    "/course/graphic-design",
    "/course/uiux-design"
  ];
  const trainingsPaths = [
    "/course/front-office-manager",
    "/course/professional-cook-course",
    "/course/fast-food",
    "/course/house-keeping",
    "/course/tour-operator",
    "/course/futsal",
    "/course/badminton-indoor",
    "/course/badminton-outdoor",
    "/course/table-tennis",
    "/course/fitness-club",
    "/course/cricket",
    "/course/plumber-and-pipe-fabricator",
    "/course/tile-fixer",
    "/course/plaster",
    "/course/steel-fixer",
    "/course/mason",
    "/course/carpenter",
    "/course/electrician",
    "/course/fiber-optics-technician",
    "/course/cctv-technician",
    "/course/welder",
    "/course/hvacr-technician",
    "/course/lift-operator",
    "/tile-fixer",
    "/plaster"
  ];
  const isMenuItemActive = (page) => {
    if (page.path === pathname) return true;
    if (page.hover === "itCourses") return itCoursesPaths.includes(pathname);
    if (page.hover === "trainings") return trainingsPaths.includes(pathname);
    return false;
  };
  // console.log(pathname)

  // const themeChange = ()=>{
  //   theme === 'light' ? setTheme('dark') : setTheme('light')
  // }


  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [nestedDropdown, setNestedDropdown] = useState({
    fullStack: false,
    mobileApp: false,
    designing: false,
    tourismManagement: false,
    eventManagement: false,
    itDigital: false,
    tvet: false,
    hospitality: false,
    sport: false
  });
  // const [view , setView] = useState(false);

  // const handleClick = ()=>{
  //   setView(!view)
  // }
  const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

  const routChange = (path) =>{
    router.push(path)
  }

  return (
  <>
    <header 
      className={`relative z-50 w-full bg-[#4A709F33] `}
      // onMouseLeave={()=>setDropDown({itCourses:false})}
    >
      <div className= {` overflow-x-hidden flex items-center justify-between h-[70px] sm:h-[80px] px-4 md:px-6  mx-auto`}>
        {/* Logo Section */}
        <div onClick={()=> router.push('/')} className="flex items-center h-full  ml-[-20px] group cursor-pointer">
          {/* <div className="relative w-[90%] h-[90%]  md:h-[80px] md:w-[70px] z-10">            
            <Image 
              src={logo} 
              alt="LOGO" 
              fill
            />        
          </div>

          <div className=" hidden md:block relative transform ml-[-20px]  h-[70px] w-[150px]">
            <Image 
              src={text} 
              alt="TEXT" 
              fill
              className="object-fill"
            />
          </div> */}

          <div className="relative h-[52px] w-[160px] sm:h-[62px] sm:w-[190px] md:h-[80px] md:w-[250px] z-10">   
            <Image 
              src={jkdLogo} 
              alt="jkd_logo" 
              fill
              className="object-cover"
              sizes="(max-width: 640px) 160px, (max-width: 768px) 190px, 250px"
              priority
            />
          </div> 



          {/* TEXT (mobile screen) */}
          <div className="hidden md:hidden relative transform transition-transform duration-700 lg:group-hover:translate-x-[150px] h-[52px] w-[120px] ml-[-12px]">
            <Image 
              src={text} 
              alt="TEXT" 
              fill
              className="object-contain"
              sizes="120px"
            />
          </div>    
        </div>


        {/* Desktop Nav */}
        <nav className="hidden lg:flex flex-1 justify-end">
          <ul className="flex gap-6 items-center text-sm md:text-[14px] lg:text-base">
            {pages.map((page, index) => (
              <li key={index} onClick={()=> routChange(page.path)} onMouseEnter={()=>setDropDown({ [page.hover]:true})}  className={`flex gap-2 items-center px-3 py-1.5 rounded-lg transition ${isMenuItemActive(page) ? 'bg-[#D08348] text-white font-bold' : `${theme === 'light' ? 'hover:text-[#00d17a]' : 'hover:text-[#177faa]'}`} cursor-pointer`}>
                {page.name}
                {
                  page.hover === 'itCourses' || page.hover === "trainings" ? dropDown[page.hover] ?
                  <Image src={upArrow} className="w-[10px] h-[10px] " alt="icon" />
                  :
                  <Image src={downArrow} className="w-[10px] h-[10px]" alt="icon" />:null
                }
              </li>
            ))}
            <li>
              {!mounted ? (
                <div
                  className={`px-8 py-2 rounded-xl ${
                    theme === "light"
                      ? "bg-[#00874F]"
                      : "bg-[#177faa]"
                  } text-white text-sm md:text-[14px] lg:text-base`}
                >
                  Login
                </div>
                ) :user?.id ? (
                <button
                  onClick={()=> {
                    user?.role === 'student' ? router.push('/student')
                    : user?.role === 'admin' ? router.push('/admin')
                    : router.push('/')
                  }}
                  className={`px-6 py-2 rounded-2xl ${theme === 'light' ? 'bg-[#00874F] hover:text-white hover:bg-black': 'hover:text-black hover:bg-white bg-[#177faa]'} transition cursor-pointer text-white text-sm md:text-[14px] lg:text-base`}
                >
                  Profile
                </button>
              ) : (
                <Link
                  href={'/login'}
                  className={`px-8 py-2 rounded-xl ${theme === 'light' ? 'bg-[#00874F] hover:text-white hover:bg-black': 'hover:text-black hover:bg-white bg-[#177faa]'} transition cursor-pointer text-white text-sm md:text-[14px] lg:text-base`}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </nav>

        <div className="flex gap-5 ">  
          {/* Contact Button (desktop only) */}
          {/* <Link href={'/apply/course'}  className={`hidden md:block px-4 py-2 rounded ${theme === 'light' ? 'bg-[#00874F] hover:text-white hover:bg-black': 'hover:text-black hover:bg-white bg-[#177faa]'} transition cursor-pointer text-white text-sm md:text-[14px] lg:text-base`}>
            Apply Now
            {/* Register 
          </Link> */}
          
          {/* {
            view && 
            <div className={`hidden md:flex absolute bg-black text-white flex-col p-4 gap-5 top-16 right-20 rounded z-50`}>
              {/* <button onClick={()=> {router.push('/apply'); handleClick()}} className={` text-start cursor-pointer py-1 px-2 rounded ${theme === 'light' ? 'hover:bg-[#00874F]  ': 'hover:text-white hover:bg-[#177faa]'}`}>Join the Program</button>
              <button onClick={()=> {router.push('/booking'); handleClick()}} className={`text-start  cursor-pointer py-1 px-2 rounded ${theme === 'light' ? 'hover:bg-[#00874F]  ': 'hover:text-white hover:bg-[#177faa]'}`}>Book Events</button> */}
              {/* <button onClick={()=> {router.push('/login'); handleClick()}} className={` text-start cursor-pointer py-1 px-2 rounded ${theme === 'light' ? 'hover:bg-[#00874F]  ': 'hover:text-white hover:bg-[#177faa]'}`}>Login</button>
              <button onClick={()=> {router.push('/signup'); handleClick()}} className={`text-start  cursor-pointer py-1 px-2 rounded ${theme === 'light' ? 'hover:bg-[#00874F]  ': 'hover:text-white hover:bg-[#177faa]'}`}>SignUp</button>
            </div>
          } */}

          {/* Hamburger (mobile and tablet) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            suppressHydrationWarning
            className="lg:hidden text-[#00d17a] text-2xl cursor-pointer"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-lg flex flex-col items-center gap-4 py-6 px-4 border-t border-gray-200 max-h-[calc(100vh-80px)] overflow-y-auto">
          {pages.map((page, index) => (
            <div key={index} className="w-full">
              <button
                onClick={() => {
                  if (page.path !== '#') {
                    router.push(page.path);
                    setMenuOpen(false);
                  } else {
                    setDropDown(prev => ({ ...prev, [page.hover]: !prev[page.hover] }));
                  }
                }}
                suppressHydrationWarning
                className={`w-full text-center py-2 px-4 rounded transition flex items-center justify-center gap-2 ${page.path === pathname ? 'bg-[#D08348] text-white font-bold ' : `${theme === 'light' ? 'hover:text-[#00d17a] hover:bg-gray-100' : 'hover:text-[#177faa] hover:bg-gray-100'} text-gray-700`}`}
              >
                {page.name}
              </button>
              
              {/* IT Courses Dropdown in Mobile Menu */}
              {page.hover === 'itCourses' && dropDown.itCourses && (
                <div className="w-full mt-2 bg-[#00874F] rounded p-3 space-y-2">
                  <div className="border-b border-white/30 pb-2">
                    <button 
                      onClick={() => setNestedDropdown(prev => ({ ...prev, fullStack: !prev.fullStack }))}
                      className="w-full flex justify-between md:justify-center md:gap-3 lg:justify-between lg:gap-0 items-center font-semibold text-xs text-black py-2 hover:text-white"
                    >
                      <span>Full Stack Development</span>
                      <span className="text-xs">{nestedDropdown.fullStack ? <Image src={upArrow} alt="UP Arrow" className="w-[10px] h-[10px]" /> : <Image src={downArrow} className="w-[10px] h-[10px]" alt="icon" />}</span>
                    </button>
                    {nestedDropdown.fullStack && (
                      <div className="mt-2 pl-2 space-y-1">
                        <Link href="/course/mern-stack" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">MERN Stack</Link>
                        <Link href="/course/mean-stack" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">MEAN Stack</Link>
                        <Link href="/course/pern-stack" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">PERN Stack</Link>
                      </div>
                    )}
                  </div>
                  <div className="border-b border-white/30 pb-2">
                    <button 
                      onClick={() => setNestedDropdown(prev => ({ ...prev, mobileApp: !prev.mobileApp }))}
                      className="w-full flex justify-between md:justify-center md:gap-3 lg:justify-between lg:gap-0 items-center font-semibold text-xs text-black py-2 hover:text-white"
                    >
                      <span>Mobile App Development</span>
                      <span className="text-xs">{nestedDropdown.mobileApp ? <Image src={upArrow} className="w-[10px] h-[10px]" alt="icon" /> : <Image src={downArrow} className="w-[10px] h-[10px]" alt="icon" />}</span>
                    </button>
                    {nestedDropdown.mobileApp && (
                      <div className="mt-2 pl-2 space-y-1">
                        <Link href="/course/flutter" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">Flutter</Link>
                        <Link href="/course/react-native" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">React Native</Link>
                      </div>
                    )}
                  </div>
                  <div className="pb-2">
                    <button 
                      onClick={() => setNestedDropdown(prev => ({ ...prev, designing: !prev.designing }))}
                      className="w-full flex justify-between md:justify-center md:gap-3 lg:justify-between lg:gap-0 items-center font-semibold text-xs text-black py-2 hover:text-white"
                    >
                      <span>Designing</span>
                      <span className="text-xs">{nestedDropdown.designing ? <Image src={upArrow} className="w-[10px] h-[10px]" alt="icon" /> : <Image src={downArrow} className="w-[10px] h-[10px]" alt="icon" />}</span>
                    </button>
                    {nestedDropdown.designing && (
                      <div className="mt-2 pl-2 space-y-1">
                        <Link href="/course/graphic-design" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">Graphic</Link>
                        <Link href="/course/uiux-design" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">UI/UX</Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Trainings Dropdown in Mobile Menu */}
              {page.hover === 'trainings' && dropDown.trainings && (
                <div className="w-full mt-2 bg-[#00874F] rounded p-3 space-y-2 max-h-96 overflow-y-auto">
                  <div className="border-b border-white/30 pb-2">
                    <button 
                      onClick={() => setNestedDropdown(prev => ({ ...prev, tourismManagement: !prev.tourismManagement }))}
                      className="w-full flex justify-between md:justify-center md:gap-3 lg:justify-between lg:gap-0 items-center font-semibold text-xs text-white py-2"
                    >
                      <span>Tourism Management</span>
                      <span className="text-xs">{nestedDropdown.tourismManagement ? <Image src={upArrow} className="w-[10px] h-[10px]" alt="icon" /> : <Image src={downArrow} className="w-[10px] h-[10px]" alt="icon" />}</span>
                    </button>
                    {nestedDropdown.tourismManagement && (
                      <div className="mt-2 pl-2 space-y-1">
                        <Link href="/course/tour-operator" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">Tour Operator</Link>
                        <Link href="/course/app-development" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">App Development</Link>
                        <Link href="/course/digital-marketing" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">Digital Marketing</Link>
                        <Link href="/course/uiux-design" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">Visual Design & UX</Link>
                      </div>
                    )}
                  </div>

                   <div className="border-b border-white/30 pb-2">
                    <button 
                      onClick={() => setNestedDropdown(prev => ({ ...prev, hospitality: !prev.hospitality }))}
                      className="w-full flex justify-between md:justify-center md:gap-3 lg:justify-between lg:gap-0 items-center font-semibold text-xs text-white py-2"
                    >
                      <span>Hospitality Management Skills</span>
                      <span className="text-xs">{nestedDropdown.hospitality ? <Image src={upArrow} className="w-[10px] h-[10px]" alt="icon" /> : <Image src={downArrow} className="w-[10px] h-[10px]" alt="icon" />}</span>
                    </button>
                    {nestedDropdown.hospitality && (
                      <div className="mt-2 pl-2 space-y-1">
                        <Link href="/course/front-office-manager" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">Front Office Manager</Link>
                        <Link href="/course/professional-cook-course" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">Professional Cook</Link>
                        <Link href="/course/fast-food" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">Fast Food Expert</Link>
                        <Link href="/course/house-keeping" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">House keeping</Link>
                        <Link href="/course/domestic-skills" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">Domestic Skilled Worker</Link>
                      </div>
                    )}
                  </div>


                  <div className="border-b border-white/30 pb-2">
                    <button 
                      onClick={() => setNestedDropdown(prev => ({ ...prev, sport: !prev.sport }))}
                      className="w-full flex justify-between md:justify-center md:gap-3 lg:justify-between lg:gap-0 items-center font-semibold text-xs text-white py-2 "
                    >
                      <span>Sport And Fitness Skills</span>
                      <span className="text-xs">{nestedDropdown.sport ? <Image src={upArrow} className="w-[10px] h-[10px]" alt="icon" /> : <Image src={downArrow} className="w-[10px] h-[10px]" alt="icon" />  }</span>
                    </button>
                    {nestedDropdown.sport && (
                      <div className="mt-2 pl-2 space-y-1">
                        <Link href="/course/fitness-club" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">Gym & Fitness</Link>
                        <Link href="/course/personal-training" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">Personal Trainer</Link>
                        <Link href="/course/futsal" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">Futsal Coach</Link>
                        <Link href="/course/cricket" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">Cricket Coach</Link>
                      </div>
                    )}
                  </div>

                  <div className="border-b border-white/30 pb-2">
                    <button 
                      onClick={() => setNestedDropdown(prev => ({ ...prev, eventManagement: !prev.eventManagement }))}
                      className="w-full flex justify-between md:justify-center md:gap-3 lg:justify-between lg:gap-0 items-center font-semibold text-xs text-white py-2"
                    >
                      <span>Event Management</span>
                      <span className="text-xs">{nestedDropdown.eventManagement ? <Image src={upArrow} className="w-[10px] h-[10px]" alt="icon" /> : <Image src={downArrow} className="w-[10px] h-[10px]" alt="icon" />}</span>
                    </button>
                    {nestedDropdown.eventManagement && (
                      <div className="mt-2 pl-2 space-y-1">
                        <Link href="/course/tour-operator" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">Tour Operator</Link>
                        <Link href="/course/app-development" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">App Development</Link>
                        <Link href="/course/digital-marketing" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">Digital Marketing</Link>
                        <Link href="/course/uiux-design" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">Visual Design & UX</Link>
                      </div>
                    )}
                  </div>

                  <div className="border-b border-white/30 pb-2">
                    <button 
                      onClick={() => setNestedDropdown(prev => ({ ...prev, itDigital: !prev.itDigital }))}
                      className="w-full flex justify-between md:justify-center md:gap-3 lg:justify-between lg:gap-0 items-center font-semibold text-xs  py-2 text-white"
                    >
                      <span>IT & Digital Skills</span>
                      <span className="text-xs">{nestedDropdown.itDigital ? <Image src={upArrow} className="w-[10px] h-[10px]" alt="icon" /> : <Image src={downArrow} className="w-[10px] h-[10px]" alt="icon" />}</span>
                    </button>
                    {nestedDropdown.itDigital && (
                      <div className="mt-2 pl-2 space-y-1">
                        <Link href="/course/web-development" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">Web Development</Link>
                        <Link href="/course/app-development" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">App Development</Link>
                        <Link href="/course/digital-marketing" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">Digital Marketing</Link>
                        <Link href="/course/uiux-design" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">UI/UX Design</Link>
                      </div>
                    )}
                  </div>

                  <div className="pb-2">
                    <button 
                      onClick={() => setNestedDropdown(prev => ({ ...prev, tvet: !prev.tvet }))}
                      className="w-full flex justify-between md:justify-center md:gap-3 lg:justify-between lg:gap-0 items-center font-semibold text-xs py-2 text-white"
                    >
                      <span>TVET Skills</span>
                      <span className="text-xs">{nestedDropdown.tvet ? <Image src={upArrow} className="w-[10px] h-[10px]" alt="icon" /> : <Image src={downArrow} className="w-[10px] h-[10px]" alt="icon" />}</span>
                    </button>
                    {nestedDropdown.tvet && (
                      <div className="mt-2 pl-2 space-y-1">
                        <Link href="/course/plumber-and-pipe-fabricator" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">Plumber & Pipe Fabricator Course</Link>
                        <Link href="/course/mason" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">Mason</Link>
                        <Link href="/course/carpenter" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">Carpenter</Link>
                        <Link href="/course/auto-Mechanic" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">Auto Mechanic</Link>
                        <Link href="/course/mechanic" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">Mechanic</Link>
                        <Link href="/course/building-electrician" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">Building Electrician</Link>
                        <Link href="/course/industrial-electrician" onClick={() => setMenuOpen(false)} className="block text-xs text-white hover:underline py-1">Industrial Electrician</Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="w-full flex flex-col sm:flex-row gap-3 mt-4">
            {mounted && user?.id ? (
              <button 
                onClick={() => {
                  user?.role === 'student' ? router.push('/student')
                  : user?.role === 'admin' ? router.push('/admin')
                  : router.push('/');
                  setMenuOpen(false);
                }} 
                className={`w-full py-2 px-4 rounded ${theme === 'light' ? 'bg-[#00874F] hover:bg-black' : 'bg-[#177faa] hover:bg-gray-800'} transition cursor-pointer text-white text-sm`}
              >
                Profile
              </button>
            ) : (
              <>
                <button 
                  onClick={() => { router.push('/login'); setMenuOpen(false); }} 
                  className={`w-full py-2 px-4 rounded ${theme === 'light' ? 'bg-[#00874F] hover:bg-black' : 'bg-[#177faa] hover:bg-gray-800'} transition cursor-pointer text-white text-sm`}
                >
                  Login
                </button>
                <button 
                  onClick={() => { router.push('/signup'); setMenuOpen(false); }} 
                  className={`w-full py-2 px-4 rounded ${theme === 'light' ? 'bg-[#00874F] hover:bg-black' : 'bg-[#177faa] hover:bg-gray-800'} transition cursor-pointer text-white text-sm`}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* dropdown */}
      {/* IT Courses Dropdown - Desktop/Laptop */}
      {
        dropDown.itCourses && !menuOpen ?
        (      
        <div className="absolute left-0 top-full hidden w-full lg:flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-10 bg-[#00874F] py-4 md:py-6 lg:py-8 px-4 md:px-6 lg:px-8 text-white z-[70] shadow-xl"
        onMouseEnter={() => setDropDown({ itCourses: true })}
        onMouseLeave={() => setDropDown({ itCourses: false })}>
          
          <div className="w-full md:w-[23%] lg:w-[23%]" onClick={() => setDropDown({ itCourses: false })}>
            <h5 className="text-white font-semibold text-sm md:text-xl">Digital Marketing</h5>
            <hr className="my-2 md:my-4"/>
            <Link href="/course/search-engine-marketing" className="text-sm md:text-base hover:underline block">Search Engine Marketing (SEM)</Link>
            <hr className="my-2"/>
            <Link href="/course/social-media-marketing" className="text-sm md:text-base hover:underline block">Social Media Marketing (SMM)</Link>
            <hr className="my-2"/>
            <Link href="/course/content-marketing-course" className="text-sm md:text-base hover:underline block">Content Marketing</Link>
            <hr className="my-2"/>
            <Link href="/course/email-marketing-course" className="text-sm md:text-base hover:underline block">Email Marketing</Link>
            <hr className="my-2"/>
          </div>
          <div className="w-full md:w-[30%] lg:w-[28%]" onClick={() => setDropDown({ itCourses: false })}>
            <h5 className="text-white font-semibold text-sm md:text-xl">Full Stack Development</h5>
            <hr className="my-2 md:my-4"/>
            <Link href="/course/mern-stack" className="text-sm md:text-base hover:underline block">MERN Stack</Link>
            <hr className="my-2"/>
            <Link href="/course/mean-stack" className="text-sm md:text-base hover:underline block">MEAN Stack</Link>
            <hr className="my-2"/>
            <Link href="/course/pern-stack" className="text-sm md:text-base hover:underline block">PERN Stack</Link>
            <hr className="my-2"/>
          </div>
          <div className="w-full md:w-[30%] lg:w-[28%]" onClick={() => setDropDown({ itCourses: false })}>
            <h5 className="text-white font-semibold text-sm md:text-xl">Mobile App Development</h5>
            <hr className="my-2 md:my-4"/>
            <Link href="/course/flutter" className="text-sm md:text-base hover:underline block">Flutter</Link>
            <hr className="my-2"/>
            <Link href="/course/react-native" className="text-sm md:text-base hover:underline block">React Native</Link>
            <hr className="my-2"/>
          </div>
          <div className="w-full md:w-[30%] lg:w-[28%]" onClick={() => setDropDown({ itCourses: false })}>
            <h5 className="text-white font-semibold text-sm md:text-xl">Designing</h5>
            <hr className="my-2 md:my-4"/>
            <Link href="/course/graphic-design" className="text-sm md:text-base hover:underline block"> Graphic </Link>
            <hr className="my-2"/>
            <Link href="/course/uiux-design" className="text-sm md:text-base hover:underline block"> UI/UX </Link>
            <hr className="my-2"/>
          </div>
        </div>
        ): dropDown.trainings && !menuOpen && (
        <div className="absolute left-0 top-full hidden w-full lg:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6 lg:gap-8 bg-[#00874F] py-4 md:py-6 lg:py-8 px-4 md:px-6 lg:px-8 text-white z-[70] shadow-xl max-h-[70vh] overflow-y-auto"
        onMouseEnter={() => setDropDown({ trainings: true })}
        onMouseLeave={() => setDropDown({ trainings: false })}>
          <div className="w-full" onClick={() => setDropDown({ trainings: false })}>
            <h5 className="text-white font-semibold text-sm md:text-base">Tourism  Management</h5>
            <hr className="my-2 md:my-4 "/>
            <Link href="/course/tour-operator" className="text-xs md:text-sm hover:underline block"> Tour Operator </Link>
            <hr className="my-2"/>
            <Link href="/course/app-development" className="text-xs md:text-sm hover:underline block">App Development </Link>
            <hr className="my-2"/>
            <Link href="/course/digital-marketing" className="text-xs md:text-sm hover:underline block"> Digital Marketing </Link>
            <hr className="my-2"/>
            <Link href="/course/uiux-design" className="text-xs md:text-sm hover:underline block"> Visual Desing & UX </Link>
           
          </div>
          <div className="w-full" onClick={() => setDropDown({ trainings: false })}>
            <h5 className="text-white font-semibold text-sm md:text-base tracking-tight [word-spacing:0px]">Hospitality Management</h5>
            <hr className="my-2 md:my-4 "/>
            <Link href="/course/front-office-manager" className="text-xs md:text-sm hover:underline block"> Front Office Manager </Link>
            <hr className="my-2"/>
            <Link href="/course/professional-cook-course" className="text-xs md:text-sm hover:underline block"> Professional Cook </Link>
            <hr className="my-2"/>
            <Link href="/course/fast-food" className="text-xs md:text-sm hover:underline block"> Fast Food Expert </Link>
            <hr className="my-2"/>
            <Link href="/course/house-keeping" className="text-xs md:text-sm hover:underline block"> House keeping </Link>
            <hr className="my-2"/>
            {/* <Link href="/course/tour-operator" className="text-xs md:text-sm hover:underline block"> Tour Operator </Link>
            <hr className="my-2"/> */}
            <Link href="/course/domestic-skills" className="text-xs md:text-sm hover:underline block"> Domestic Skilled Worker </Link>
            <hr className="my-2"/>
          </div>
         

          <div className="w-full" onClick={() => setDropDown({ trainings: false })}>
            <h5 className="text-white font-semibold text-sm md:text-base">Sport And Fitness Skills</h5>
            <hr className="my-2 md:my-4"/>
            <Link href="/course/fitness-club" className="text-xs md:text-sm hover:underline block">Gym & Fitness</Link>
            <hr className="my-2"/>
            <Link href="/course/personal-training" className="text-xs md:text-sm hover:underline block">Personal Trainer</Link>
            <hr className="my-2"/>
            <Link href="/course/futsal" className="text-xs md:text-sm hover:underline block">Futsal Traing</Link>
            <hr className="my-2"/>
            <Link href="/course/cricket" className="text-xs md:text-sm hover:underline block">Cricket Training</Link>
            <hr className="my-2"/>
            {/* <Link href="/course/fitness-club" className="text-xs md:text-sm hover:underline block"> Fitness Club </Link>
            <hr className="my-2"/>
            <Link href="/course/cricket" className="text-xs md:text-sm hover:underline block"> Cricket </Link>
            <hr className="my-2"/> */}
          </div>

         
          <div className="w-full" onClick={() => setDropDown({ trainings: false })}>
            <h5 className="text-white font-semibold text-sm md:text-base">Event Management </h5>
            <hr className="my-2 md:my-4"/>
            <Link href="/course/tour-operator" className="text-xs md:text-sm hover:underline block">
            Tour Operator
            </Link>
            <hr className="my-2"/>
            <Link href="/course/app-development" className="text-xs md:text-sm hover:underline block ">App Development</Link>
            <hr className="my-2"/>
            <Link href="/course/digital-marketing" className="text-xs md:text-sm hover:underline block">Digital Marketing</Link>
            <hr className="my-2"/>
            <Link href="/course/uiux-design" className="text-xs md:text-sm hover:underline block">Visual Design & UX</Link>
            <hr className="my-2"/>
          </div>

          <div className="w-full" onClick={() => setDropDown({ trainings: false })}>
            <h5 className="text-white font-semibold text-sm md:text-base">IT & Digital Skills </h5>
            <hr className="my-2 md:my-4"/>
            <Link href="/course/web-development" className="text-xs md:text-sm hover:underline block">
            Web Development
            </Link>
            <hr className="my-2"/>
            <Link href="/course/app-development" className="text-xs md:text-sm hover:underline block">App Development</Link>
            <hr className="my-2"/>
            <Link href="/course/digital-marketing" className="text-xs md:text-sm hover:underline block">Digital Marketing</Link>
            <hr className="my-2"/>
            <Link href="/course/uiux-design" className="text-xs md:text-sm hover:underline block">UI/UX Design</Link>
            <hr className="my-2"/>
          </div>

           <div className="w-full" onClick={() => setDropDown({ trainings: false })}>
            <h5 className="text-white font-semibold text-sm md:text-base">TVET Skills</h5>
            <hr className="my-2 md:my-4"/>
            <Link href="/course/plumber-and-pipe-fabricator" className="text-xs md:text-sm hover:underline block">Plumber & Pipe Fabricator Course</Link>
            {/* <hr className="my-2"/>
            <Link href="/course/tile-fixer" className="text-xs md:text-sm hover:underline block">Tile Fixer</Link>
            <hr className="my-2"/>
            <Link href="/course/plaster" className="text-xs md:text-sm hover:underline block">Plasterer</Link>
            <hr className="my-2"/>
            <Link href="/course/steel-fixer" className="text-xs md:text-sm hover:underline block">Steel Fixer</Link> */}
            <hr className="my-2"/>
            <Link href="/course/mason" className="text-xs md:text-sm hover:underline block text-gray-100">Mason</Link>
            <hr className="my-2"/>
            <Link href="/course/carpenter" className="text-xs md:text-sm hover:underline block ">Carpenter</Link>
            <hr className="my-2"/>
            <Link href="/course/auto-Mechanic" className="text-xs md:text-sm hover:underline block">Auto Mechanic</Link>
            <hr className="my-2"/>
            <Link href="/course/mechanic" className="text-xs md:text-sm hover:underline block">Mechanic</Link>
            <hr className="my-2"/>
            <Link href="/course/building-electrician" className="text-xs md:text-sm hover:underline block">Building Electrician</Link>
            <hr className="my-2"/>
            <Link href="/course/industrial-electrician" className="text-xs md:text-sm hover:underline block">Industrial Electrician</Link>
            <hr className="my-2"/>
          </div>
          
          {/* <div className="w-full" onClick={() => setDropDown({ trainings: false })}>
            <h5 className="text-white font-semibold text-sm md:text-xl">Mechanical</h5>
            <hr className="my-2 md:my-4"/>
            <Link href="/course/welder" className="text-xs md:text-sm hover:underline block"> Welder</Link>
            <hr className="my-2"/>
            <Link href="/course/hvacr-technician" className="text-xs md:text-sm hover:underline block"> HVACR Technician  </Link>
            <hr className="my-2"/>
            <Link href="/course/lift-operator" className="text-xs md:text-sm hover:underline block"> Lift Operator  </Link>
            <hr className="my-2"/>
          </div> */}
          
        </div>
        )
      }
    </header>
  </> 
  );
}

