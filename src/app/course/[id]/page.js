"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import course from '@/data/course.json'
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import Link from "next/link";
import LoadingScreen from "@/component/LoadingScreen";
import Image from "next/image";


const Courses = () => {
  const {id} = useParams();
  const currCourse = course.find(c => c.id === id);
  const previewImages = [currCourse?.bgImage, '/sportImage.png',"/jkd-front-photo.jpg"]
    .filter(Boolean)
    .filter((src, index, arr) => arr.indexOf(src) === index);
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);

    const [screenLoading, setScreenLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreenLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setActivePreviewIndex(0);
  }, [id]);

  if (screenLoading) return <LoadingScreen />;

  const handlePreviewSlide = (direction) => {
    if (previewImages.length <= 1) return;
    setActivePreviewIndex((prev) => {
      if (direction === 'prev') {
        return prev === 0 ? previewImages.length - 1 : prev - 1;
      }
      return prev === previewImages.length - 1 ? 0 : prev + 1;
    });
  };

  const currentPreviewImage = previewImages[activePreviewIndex] || '/jkd-front-photo.jpg';
  const trainingName = (currCourse?.title || 'Training Program').replace(/\s*Course$/i, '').trim();
  const tradeType = (currCourse?.focusOnTrade || '').trim().toLowerCase();
  const defaultWhyChooseIcons = ['/icons/image28.svg', '/icons/image29.svg', '/icons/image30.svg', '/icons/image31.svg'];
  const whyChooseIconsByFocus = {
    'it focused': ['/icons/internet.svg', '/icons/image29.svg', '/icons/image30.svg', '/icons/ProjectBased.svg'],
    'strategy focused': ['/icons/internet.svg', '/icons/image29.svg', '/icons/image30.svg', '/icons/ProjectBased.svg'],
    'industrial focused': ['/icons/image28.svg', '/icons/image29.svg', '/icons/image30.svg', '/icons/image31.svg'],
    'sports focused': ['/icons/image33.svg', '/icons/image29.svg', '/icons/image34.svg', '/icons/image35.svg'],
    // 'fitness focused': ['/icons/circle.svg', '/icons/handIcon.svg', '/icons/image30.svg', '/icons/image31.svg'],
  };
  const defaultWhyChooseCards = [
    {
      title: 'Career-Focused Learning',
      description: 'Practical training aligned with real-world outcomes and employability.',
    },
    {
      title: 'Expert Mentorship',
      description: 'Learn from experienced trainers with industry and teaching exposure.',
    },
    {
      title: 'Hands-On Practice',
      description: 'Apply concepts in guided labs, workshops, and real practice tasks.',
    },
    {
      title: 'Growth Pathway',
      description: 'Build confidence, portfolio, and readiness for jobs or freelancing.',
    },
  ];
  const whyChooseByFocus = {
    'it focused': [
      {
        title: 'Industry-relavent',
        description: 'Learn in-demand technologies, tools, and workflows used by modern software teams.',
      },
      {
        title: 'Expert Trainers',
        description: 'Learn from seasoned professionals with years of field experience',
      },
      {
        title: 'Career Focus Training',
        description: 'Get practical skills and support to start your tech career.',
      },
      {
        title: 'Project Based',
        description: 'Real-world projects that prepare you for immediate employment',
      },
    ],
    //add the strategy focused content here
    'strategy focused': [
      {
        title: 'Industry-relevant',
        description: 'Learn the most in-demand technologies used to build modern, scalable web applications.',
      },
      {
        title: 'Expert Trainers',
        description: 'Learn from seasoned professionals with years of field experience',
      },
      {
        title: 'Career-Focus Training',
        description: 'Get practical skills and support to start your marketing career.',
      },
      {
        title: 'Project Based',
        description: 'Real-world projects that prepare you for immediate employment',
      },
    ],

    'industrial focused': [
      {
        title: 'Modern Labs',
        description: 'State-of-the-art training facilities with latest equipment and technology.',
      },
      {
        title: 'Expert Trainers',
        description: 'Learn from seasoned professionals with years of field experience.',
      },
      {
        title: 'Industry Standards',
        description: 'Training aligned with international quality and safety standards.',
      },
      {
        title: 'Project-Based',
        description: 'Real-world projects that prepare you for immediate employment.',
      },
    ],
    'sports focused': [
      {
        title: 'Training Environment',
        description: 'Practice in a structured and game-focused setup.',
      },
      {
        title: 'Expert Trainers',
        description: 'Learn from trained professionals with real sports experience',
      },
      {
        title: 'Skill-Based Training',
        description: 'Focus on improving technique, speed, and performance.',
      },
      {
        title: 'Modern Sports Facilities',
        description: 'Train in a fully equipped environment with proper equipments',
      },
    ],
    // 'fitness focused': [
    //   {
    //     title: 'Structured workout programs',
    //     description: 'Practice in a structured and fitness-focused setup.',
    //   },
    //   {
    //     title: 'Expert Trainers',
    //     description: 'Learn from trained professionals with real fitness experience.',
    //   },
    //   {
    //     title: 'Health & well-being',
    //     description: 'Focus on improving health & well-being.',
    //   },
    //   {
    //     title: 'Modern Fitness Facilities',
    //     description: 'Train in a fully equipped environment with proper equipments.',
    //   },
    // ],
  };

  
  const whyChooseTradeContent = whyChooseByFocus[tradeType] || defaultWhyChooseCards;
  const whyChooseIcons = whyChooseIconsByFocus[tradeType] || defaultWhyChooseIcons;

  const overviewCards = [
    {
      icon: "/icons/duration.svg",
      title: currCourse?.courseDuration,
      description:currCourse?.desc,
    },
    {
      icon: "/icons/handIcon.svg",
      title: 'Hands-On Training',
      description: currCourse?.trainingDesc,
    },
    {
      icon: "/icons/circle.svg",
      title: currCourse?.focusOnTrade,
      description: currCourse?.focusedOn,
    },
    {
      icon: "/icons/book.svg",
      title: 'Practical + theory',
      description: currCourse?.learningOutcomesDesc,
    },
  ];

  const whyChooseCards = [
    ...whyChooseTradeContent.map((item, index) => ({
      icon: whyChooseIcons[index % whyChooseIcons.length],
      title: item.title,
      description: item.description,
    })),
  ];

  return (    
    <div className={`min-h-screen w-full overflow-x-hidden flex flex-col justify-between`}>
      <Header />
      {/* lift side */}
      <div className="bg-[#eefbff] relative  flex flex-col items-center">

        {/* hero section */}
        <section
          className="relative w-full overflow-hidden min-h-[420px] sm:min-h-[520px] lg:h-[615px]"
          style={{
            backgroundImage: `url(${currCourse?.bgImage || currCourse?.image || '/jkd-front-photo.jpg'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        >
          <div className="absolute inset-0 bg-black/65 " />
          <div className="relative flex min-h-[420px] w-full flex-col justify-center px-4 py-12 text-white sm:min-h-[520px] sm:px-8 md:px-12 lg:min-h-[600px] lg:px-16">
            <div className="w-full max-w-[921px] ml-0 sm:ml-10">
              <h1 style={{ whiteSpace: "pre-line" }} className="max-w-full  text-[34px] font-bold leading-tight sm:text-[44px] md:text-[56px] lg:text-[60px]">
                {currCourse?.title}
              </h1>
              <p style={{ whiteSpace: "pre-line" }} className="mt-8 max-w-full text-[15px] leading-relaxed text-white/95 sm:mt-10 sm:text-[17px] md:text-[20px] lg:text-[24px]">
                {currCourse?.description?.[0]}
              </p>
              <Link
                href="/login"
                className="mt-14 inline-flex h-8 w-full max-w-[280px] items-center justify-center gap-6 rounded-2xl bg-[#D08348] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#cf883d] sm:mt-16 sm:h-12 sm:px-6 sm:text-base md:h-[70px] md:px-8 md:text-2xl md:font-normal"
              >
                Enroll Now
                <span aria-hidden="true">&#8594;</span>
              </Link>
            </div>
          </div>
        </section>
      
      {/* Course Overview */}
          <section className="w-full bg-white px-4 py-8 sm:p-10">
            <div className=" text-center">
              <p className="text-xs font-bold    sm:text-[50px]">Course Overview</p>
              <h2 className="py-4 text-lg  leading-tight text-black sm:text-4xl md:text-xl">
                A complete professional training program built for real-world success
              </h2>
            </div>

            <div className="mt-8  grid  gap-10 sm:grid-cols-2 xl:grid-cols-4">
              {overviewCards.map((item, index) => (
                <article
                  key={`${item.icon}-${item.title || 'overview'}-${index}`}
                  className="flex w-full max-w-[280px] justify-center gap-3 h-[280px] flex-col rounded-2xl border-2 border-gray-300 bg-gray-100 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)]"
                >
                  <div className="flex h-[60px] w-[68px] items-center justify-center rounded-xl bg-[#2B354A]">
                    <Image src={item.icon} alt={item.title || 'Overview card icon'} width={20} height={20} className="h-8 w-8 bg-transparent" />
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-slate-950 sm:text-lg">{item.title}</h3>
                  <p className="mt-2 text-xs text-[#757575] leading-[1.6] sm:text-base">{item.description}</p>
                </article>
              ))}
            </div>
          </section>


{/* Course Preview */}
          <section className="w-full h-auto  bg-[#BECECA] px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
            <div className="mx-auto grid w-full max-w-[1200px] items-stretch gap-6 md:grid-cols-[minmax(0,1fr)_minmax(340px,520px)] md:gap-10">
              <div className="relative flex h-full w-full items-stretch justify-center">
                <button
                  type="button"
                  aria-label="Show previous image"
                  onClick={() => handlePreviewSlide('prev')}
                  className="absolute left-1 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center text-[30px] font-light text-white cursor-pointer transition hover:text-black sm:left-2"
                >
                  &#8249;
                </button>

                <div className="relative h-[260px] w-full overflow-hidden sm:h-[320px] md:h-full">
                  <Image
                    src={currentPreviewImage}
                    alt={currCourse?.title || 'Course preview'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px "
                  />
                </div>

                <button
                  type="button"
                  aria-label="Show next image"
                  onClick={() => handlePreviewSlide('next')}
                  className="absolute right-1 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center text-[30px] font-light text-white cursor-pointer transition hover:text-black sm:right-2"
                >
                  &#8250;
                </button>
              </div>

              <div className="w-full pt-1 md:max-w-[520px] md:justify-self-end md:pt-0">
                <h3 className="text-[28px] font-semibold leading-tight text-[#111] sm:text-[32px]">What You will Learn</h3>
                <ul className="mt-4 space-y-3 sm:mt-5">
                  {currCourse?.learningOutcomes?.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-3 text-[20px] leading-[1.35] text-black font-medium">
                      <span className="mt-[2px] text-[22px] leading-none text-[#4d5555]" aria-hidden="true">✔ </span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

{/* Certification */}
          <section className="w-full bg-[#275D84] px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-12  ">
            <div className="mx-auto grid w-full max-w-[1200px] items-center gap-6 md:grid-cols-2 md:gap-8">
              <div >
                <div className="flex items-center gap-3 ">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#D08348] text-xl text-[#2f6790]">
                  <Image
                  src="/icons/humbleicons_certificate.svg"
                  alt="Certificate Icon"
                  width={20}
                  height={20}
                  className="h-6 w-6 bg-transparent"
                />

                </div>
                <h3 className="mt-2 text-xl font-bold leading-tight text-[#f3f4f6] sm:text-3xl">Certification</h3>
                </div>
                <p className="mt-3 max-w-[520px] text-lg leading-[1.3] text-gray-300">
                  Earn your professional certificate from JKD Pakistan and step into the workforce with confidence.
                </p>

                <div className="mt-5 flex items-start gap-3 text-[#f0b482]">
                  {/* <span className="mt-1 inline-flex h-8 w-8 items-center justify-center text-2xl leading-none">&#10022;</span> */}
                  <Image
                  src="/icons/CertificateTik.svg"
                  alt="Hand Icon"
                  width={24}
                  height={24}
                  className="h-8 w-8 bg-transparent mt-1"
                />

          
                  <p className=" max-w-[520px] text-base leading-[1.3] text-gray-300">
                    Industry-recognized credentials that <br /> validate your expertise
                  </p>
                </div>
              </div>

              <div className="mx-auto w-full max-w-[400px] rounded-xl bg-white px-6 py-7 text-center shadow-[0_16px_40px_rgba(2,12,27,0.2)] sm:px-8 sm:py-8">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#2f6790] text-2xl text-[#f0b482]">
                   <Image
                  src="/icons/humbleicons_certificate2.svg"
                  alt="Hand Icon"
                  width={28}
                  height={28}
                  className="h-10 w-10 "
                />
                </div>
                <h4 className="mt-3 text-2xl font-semibold leading-tight ">JKD Pakistan</h4>
                <p className="mt-2 text-base text-[#333333]">Professional Certificate</p>
                <div className="mx-auto mt-3 h-[2px] w-full max-w-[280px] bg-[#9e9e9e]" />
                <p className="mt-4 text-lg font-semibold leading-tight text-[#D08348]">{trainingName}</p>
                <p className="mt-2 text-sm leading-tight text-[#333333]">Job Ready Skills Certificate</p>
              </div>
            </div>
          </section>

{/* Why Choose Us */}
          <section className="w-full bg-white px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12">
            <div className="mx-auto max-w-[1200px] text-center">
              <h3 className="text-[26px] font-bold leading-tight text-black sm:text-[32px] md:text-[40px]">
                Why Choose JKD Pakistan
              </h3>
              <p className="mt-2 text-xs text-gray-600 sm:text-sm md:text-base">
                Excellence in technical education with a proven track record
              </p>
            </div>

            <div className="mx-auto mt-6 grid w-full max-w-[1200px] gap-5 sm:grid-cols-2 lg:gap-6">
              {whyChooseCards.map((item, index) => (
                <article
                  key={`${item.icon}-${item.title || 'why-choose'}-${index}`}
                  className="flex items-start gap-6 rounded-lg border border-gray-200 bg-[#fafafa] px-4 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:px-5 sm:py-5"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#2B354A]">
                    <Image src={item.icon} alt={item.title || 'Why choose card icon'} width={24} height={24} className="h-10 w-10" />
                  </div>

                  <div className="pt-1 text-left">
                    <h4 className="text-base font-bold text-black sm:text-lg">{item.title}</h4>
                    <p className="mt-2 max-w-[339px] whitespace-pre-line text-xs leading-5 text-[#757575] sm:text-sm">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        {/* <div className="w-full  max-w-[1200px] px-4 sm:px-6 md:px-8">

          <section className="pb-8 pt-10 sm:pb-12 sm:pt-14">
            <h3 className='text-2xl sm:text-[26px] md:text-[30px] font-semibold pt-6 sm:pt-8 md:pt-10'>COURSE DETAILS</h3>
            
            <h4 className='text-lg sm:text-[18px] md:text-[20px] font-semibold pt-4 sm:pt-5 pb-2 sm:pb-3 text-black'>COURSE DESCRIPTION</h4>
            {currCourse?.courseOverview?.map((course , index)=>
              <p key={index} className="text-gray-700 text-sm sm:text-base w-full md:w-[65%]">
                {course}
                <br/><br/>
              </p>
            )}

            {currCourse?.certification && <h4 className='text-lg sm:text-[18px] md:text-[20px] font-semibold pb-2 sm:pb-3 text-black'>CERTIFICATION</h4>}
            {currCourse?.certification?.map((course, index) => {
              const isListItem = course.includes("<b>");
              if (isListItem) {
                return (
                  <li
                    key={index}
                    className="list-disc ml-4 sm:ml-6 text-sm sm:text-base"
                    dangerouslySetInnerHTML={{ __html: course }}
                  ></li>
                );
              }

              return (
                <p
                  className="text-gray-700 text-sm sm:text-base w-full md:w-[65%]"
                  key={index}
                  dangerouslySetInnerHTML={{ __html: course }}
                ></p>
              );
            })}

            <br/>
            <h4 className='text-lg sm:text-[18px] md:text-[20px] font-semibold pb-2 sm:pb-3 text-black'>LEARNING OUTCOMES</h4>
            <p className="text-gray-700 text-sm sm:text-base w-full md:w-[65%]">By the end of this course, students will be able to:</p>
            <ul className="w-full md:w-[65%] list-disc ml-6 sm:ml-8 md:ml-10 pt-2 sm:pt-3">
              {currCourse?.learningOutcomes?.map((course , index)=>
                <li key={index} className="text-gray-700 text-sm sm:text-base">
                  {course}
                  <br/>
                </li>
              )}
            </ul>

            {currCourse?.carrer && 
              <>
                <br/>
                <h4 className='text-lg sm:text-[18px] md:text-[20px] font-semibold pb-2 sm:pb-3 text-black'>CAREER OUTLOOK</h4>
                <p className="text-gray-700 text-sm sm:text-base w-full md:w-[65%]">
                  {currCourse?.carrer}
                </p>
              </>
            }

            {currCourse?.programBinits && 
              <>
                <br/>
                <h4 className='text-lg sm:text-[18px] md:text-[20px] font-semibold pb-2 sm:pb-3 text-black'>PROGRAM BENEFITS</h4>
                <ul className="w-full md:w-[65%] list-disc ml-4 sm:ml-6 pt-2 sm:pt-3">
                  {currCourse?.programBinits?.map((course , index)=>
                    <li key={index} className="text-gray-700 text-sm sm:text-base">
                      {course}
                      <br/>
                    </li>
                  )}
                </ul>
              </>
            }

            {currCourse?.whyChooseJKD  && 
              <>
                <br/>
                <h4 className='text-lg sm:text-[18px] md:text-[20px] font-semibold pb-2 sm:pb-3 text-black'>WHY CHOOSE JKD</h4>
                {currCourse?.whyChooseJKD?.map((course , index)=>
                  <p key={index} className="text-gray-700 text-sm sm:text-base w-full md:w-[65%]">
                    {course}
                    <br/>
                  </p>
                )}
              </>
            }

          </section>
        </div> */}


        
      </div>

      <Footer />
    </div>
  )
}

export default Courses