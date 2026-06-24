"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Footer from "@/component/Footer";
import Header from "@/component/Header";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";



export default function EventsPage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        eventType: "",
        cateringService: "",
        audioVisual: "",
        decorations: "",
        eventDateTime: "",
        paymentMethod: "",
        message: "",
    });
    const { ref: leftCardRef, inView: leftCardInView } = useInView({
        triggerOnce: true,
        threshold: 0.25,
    });
    const { ref: rightCardRef, inView: rightCardInView } = useInView({
        triggerOnce: true,
        threshold: 0.25,
    });

    const upliftSlides = [
        { src: "/img5.jpeg", alt: "Uplift event moment 1" },
        { src: "/img6.jpeg", alt: "Uplift event moment 1" },
        { src: "/img7.jpeg", alt: "Uplift event moment 2" },
        { src: "/img8.jpeg", alt: "Uplift event moment 3" },
        { src: "/img9.jpeg", alt: "Uplift event moment 4" },
        { src: "/img10.jpeg", alt: "Uplift event moment 5" },
        { src: "/img14.jpeg", alt: "Uplift event moment 6" },
    ];

    const goToPrevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? upliftSlides.length - 1 : prev - 1));
    };

    const goToNextSlide = () => {
        setCurrentSlide((prev) => (prev === upliftSlides.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === upliftSlides.length - 1 ? 0 : prev + 1));
        }, 4000);

        return () => clearInterval(interval);
    }, [upliftSlides.length]);
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const validateForm = () => {
        const requiredFields = [
            "firstName",
            "lastName",
            "email",
            "phoneNumber",
            "eventType",
            "cateringService",
            "audioVisual",
            "decorations",
            "eventDateTime",
            "paymentMethod",
        ];

        for (let field of requiredFields) {
            if (!formData[field] || formData[field].trim() === "") {
                toast.error(`${field.replace(/([A-Z])/g, " }, [upliftSlides.length]);").trim()} is required`);
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("/api/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message || "Event booking submitted successfully!");
                setShowSuccessModal(true);
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    eventType: "",
                    cateringService: "",
                    audioVisual: "",
                    decorations: "",
                    eventDateTime: "",
                    paymentMethod: "",
                    message: "",
                });
                setTimeout(() => setShowSuccessModal(false), 3000);
            } else {
                toast.error(data.error || "Failed to submit form");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // const whatWeDo = [
    // {
    // title:'Sports & Recreational Tournaments',
    // firstDesc:'We regularly organize sports tournaments and recreational events to encourage teamwork, discipline, and healthy competition.From friendly matches to large-scale tournaments, our goal is to bring people together in a positive and energetic environment.',
    // lists:['Football & Cricket Tournaments','Volleyball & Badminton Matches','Annual J.K.D. Sports League','Team-Building and Fun Activity Days'],
    // lastDesc:'These events help participants stay physically active, build confidence, and create a strong sense of community bonding.'
    // },
    // {
    // title:'Community Development Programs',
    // firstDesc:'J.K.D. is deeply committed to community welfare and social responsibility.We conduct a variety of awareness and uplift programs that focus on education, skill enhancement, and personal well-being.',
    // lists:['Career guidance and motivational seminars','Skill development and job-readiness workshops','Health check-up camps and awareness drives','Social welfare initiatives and charity events'],
    // lastDesc:'Through these programs, we aim to uplift communities by providing them with the knowledge, motivation, and support they need to grow and succeed.'
    // },
    // {
    // title:'Youth Empowerment & Motivation',
    // firstDesc:'Our Uplift Events serve as a platform to empower the younger generation by helping them discover their potential and pursue their goals confidently.We collaborate with professionals, trainers, and motivational speakers to conduct sessions that focus on:',
    // lists:['Leadership development','Personal growth and mindset building','Overcoming challenges and achieving goals','Promoting positivity and teamwork'],
    // lastDesc:'These interactive events inspire participants to believe in themselves and create a better future for their families and communities.'
    // },
    // {
    // title:'Employee Engagement & Cultural Programs',
    // firstDesc:'We also arrange employee engagement events, appreciation ceremonies, and cultural celebrations to keep morale high and strengthen organizational relationships.',
    // lists:['Annual gatherings and award functions','Festival celebrations and cultural performances','Appreciation events for outstanding employees','Workshops for personal and professional enrichment'],
    // lastDesc:'Such events create a balanced environment where both work and well-being go hand in hand.'
    // },
    // ]

    const eventsFestivalCards = [
        {
            image: "/cardPic1.jpg",
            title: "Events & Festivals",
            items: [
                "Sports Tourism & Exposures",
                "Family/Friendly Sports Matches",
                "Corporate/NGOs Sports Events",
                "Sports & Cultural Festivals",
                "Sports Championships",
                "Arts & Literature Festivals",
                "Meetings & Trainings",
                "Hunar Rozgar Mela",
            ],
        },
        {
            image: "/cardPic2.jpg",
            title: "Events & Festivals",
            items: [
                "Environmental workshops and seminars",
                "Corporate / Business / NGOs Events",
                "Trade Fair Exhibitions",
                "Sustainable Food Festivals",
                "Tourism Expos",
                "Environmental fairs and expos",
                "Workshops & Seminars",
                "Job Recruitment Fair",
            ],
        },
    ];

    return (
        <div className="flex flex-col w-full min-h-screen overflow-x-hidden">
            <Header />
            <div className="py-6">
                <h1 className={`flex items-center justify-center gap-6  text-[30px] md:text-[40px] pb-2 lg:text-[50px] font-semibold w-full`}>Uplift  - <span className="text-[#D08348]">Events</span></h1>
            </div>
            {/* <h1 className="text-3xl font-bold">Events Page Coming Soon!</h1> */}
            <section className="w-full border-y border-[#2ea0ff]  bg-gradient-to-r from-[#7d9ab2] to-[#66696d] text-white">
                <div className="mx-auto flex w-full max-w-[1500px] flex-col">
                    {/* <div className="border-b border-[#2ea0ff] bg-white px-4 py-3">
                    <h2 className="flex items-center justify-center text-[28px] font-bold leading-none sm:text-[34px]">
                        <span className="text-black">UPLIFT</span>
                        <span className="mx-3 border-r-2 border-dashed border-[#2ea0ff] py-6" />
                        <span className="text-[#D08348]">EVENTS</span>
                    </h2>
                </div> */}

                    <div className="relative flex min-h-[220px] flex-col gap-8 px-5 py-14 sm:px-8 md:min-h-[260px] md:px-12 lg:flex-row lg:items-center">
                        <p className="w-full text-[22px] leading-relaxed sm:text-[28px] lg:w-1/2">
                            As a vital part of the Jkd Pakistan, Uplift-Events is a dynamic and innovative event management program dedicated to creating unforgettable experiences that inspire, educate, and uplift individuals and communities. Our team of passionate and experienced professionals is committed to delivering exceptional events that exceed expectations and leave a lasting impact.
                        </p>


                        {/* Slide Navigation */}
                        <div className="relative w-full lg:w-1/2  ">
                            <div className="relative h-[380px] w-[90%] mx-auto overflow-hidden rounded border border-[#2ea0ff55] bg-black/20">
                                {upliftSlides.map((slide, index) => (
                                    <div
                                        key={slide.src}
                                        className={`absolute inset-0 transition-opacity duration-500 ${currentSlide === index ? "opacity-100" : "opacity-0"}`}
                                    >
                                        <Image
                                            src={slide.src}
                                            alt={slide.alt}
                                            fill
                                            priority={index === 0}
                                            className="object-cover "
                                        />
                                    </div>
                                ))}


                                {/* Slide Indicators */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-2">
                                    {upliftSlides.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentSlide(index)}
                                            className={`h-2 sm:h-3 rounded-full transition-all duration-300 cursor-pointer ${index === currentSlide
                                                    ? "bg-orange-500 w-6 sm:w-8"
                                                    : "bg-white/50 w-2 sm:w-3 hover:bg-white/75"
                                                }`}
                                            aria-label={`Go to slide ${index + 1}`}
                                            suppressHydrationWarning
                                        ></button>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="button"
                                aria-label="Previous uplift event"
                                onClick={goToPrevSlide}
                                suppressHydrationWarning
                                className="absolute left-2 sm:left-2 md:left-[-20px] top-1/2 z-10 -translate-y-1/2 px-3 py-1 text-5xl text-white/80 hover:text-white transition cursor-pointer"
                            >
                                &#8249;
                            </button>
                            <button
                                type="button"
                                aria-label="Next uplift event"
                                onClick={goToNextSlide}
                                suppressHydrationWarning
                                className="absolute right-2 sm:right-2 md:right-[-20px] top-1/2 z-10 -translate-y-1/2 rounded-full px-3 py-1 text-5xl text-white/80 hover:text-white transition cursor-pointer"
                            >
                                &#8250;
                            </button>
                        </div>

                    </div>
                </div>
            </section>

            {/* Events and Festivals Section */}
            <section className="w-full bg-[#BECECA42] px-4 py-10 sm:px-8 md:px-10 overflow-x-hidden">
                <div className="mx-auto max-w-[980px]">
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-6 ">
                        <div className="flex flex-col items-center justify-between gap-10 ">
                            <div
                                ref={leftCardRef}
                                className={`w-full max-w-[400px] overflow-hidden border border-[#9fa5a6] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-2000 ease-out will-change-transform ${leftCardInView
                                        ? "translate-x-0 opacity-100"
                                        : "-translate-x-24 opacity-0"
                                    }`}
                            >
                                <div className="relative h-[250px] w-full">
                                    <Image src="/footballImg.png" alt="Events and festivals" fill className="object-cover" />
                                </div>
                                <div className="border-t-[16px] border-[#D08348] px-8 py-8 pb-10">
                                    <h4 className="text-center text-[28px] font-semibold text-[#222]">{eventsFestivalCards[0].title}</h4>
                                    <ul className="mt-3 list-disc space-y-1 pl-5 text-[24px] leading-tight text-[#222]">
                                        {eventsFestivalCards[0].items.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="relative h-[210px] w-[210px] overflow-hidden animate-gentle-float-left sm:h-[426px] sm:w-[388px]">
                                <Image src="/GrouplImage.png" alt="Meeting illustration" fill className="object-cover p-4" />
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-between  gap-10 pt-0 ">
                            <div className="relative h-[220px] w-[220px] overflow-hidden animate-gentle-float-right sm:h-[456px] sm:w-[410px]">
                                <Image src="/GrouprImage.png" alt="Sports illustration" fill className="object-cover p-4" />
                            </div>

                            <div
                                ref={rightCardRef}
                                className={`w-full max-w-[400px] overflow-hidden border border-[#9fa5a6] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-700 ease-out will-change-transform ${rightCardInView
                                        ? "translate-x-0 opacity-100"
                                        : "translate-x-20 opacity-0"
                                    }`}
                            >
                                <div className="relative h-[250px] w-full">
                                    <Image src="/image8.png" alt="Corporate events and festivals" fill className="object-cover" />
                                </div>
                                <div className="border-t-[16px] border-[#4d99d8] px-8 py-8 pb-10">
                                    <h4 className="text-center text-[28px] font-semibold text-[#222]">{eventsFestivalCards[1].title}</h4>
                                    <ul className="mt-3 list-disc space-y-1 pl-5 text-[24px] leading-tight text-[#222]">
                                        {eventsFestivalCards[1].items.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex justify-center">
                        <Link
                            href="/contact-us"
                            className="w-full max-w-[380px] rounded-lg bg-[#c48d5d] px-6 py-3 text-center text-[40px] font-semibold text-white transition hover:bg-[#b47d4d]"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>

{/* Events Booking Form  */}
            <section className="w-full border-y-2 border-[#2ea0ff] bg-gradient-to-b from-[#7d9ab2] to-[#66696d] px-4 py-10 sm:px-8 md:px-10 md:py-14">
                <div className="mx-auto w-full max-w-[1250px] rounded-md bg-white px-4 py-6 sm:px-6 md:px-8 md:py-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                            <div className="space-y-2">
                                <label htmlFor="firstName" className="text-sm font-medium text-[#222]">First Name*</label>
                                <input suppressHydrationWarning id="firstName" type="text" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} required className="h-11 w-full rounded-md border-2 border-[#d5d5d5]  px-4 text-sm text-[#333] outline-none placeholder:text-[#b8b8b8]" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="lastName" className="text-sm font-medium text-[#222]">Last Name*</label>
                                <input suppressHydrationWarning id="lastName" type="text" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} required className="h-11 w-full rounded-md border-2 border-[#d5d5d5]  px-4 text-sm text-[#333] outline-none placeholder:text-[#b8b8b8]" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-[#222]">Email*</label>
                                <input suppressHydrationWarning id="email" type="email" placeholder="Type here" value={formData.email} onChange={handleInputChange} required className="h-11 w-full rounded-md border-2 border-[#d5d5d5] px-4 text-sm text-[#333] outline-none placeholder:text-[#b8b8b8]" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="phoneNumber" className="text-sm font-medium text-[#222]">Phone Number*</label>
                                <input suppressHydrationWarning id="phoneNumber" type="text" placeholder="Type here" value={formData.phoneNumber} onChange={handleInputChange} required className="h-11 w-full rounded-md border-2 border-[#d5d5d5] px-4 text-sm text-[#333] outline-none placeholder:text-[#b8b8b8]" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                            <div className="space-y-2">
                                <label htmlFor="eventType" className="text-sm font-medium text-[#222]">Events Type*</label>
                                <select suppressHydrationWarning id="eventType" value={formData.eventType} onChange={handleInputChange} required className="h-11 w-full rounded-md border-2 border-[#d5d5d5]  px-4 text-sm text-[#333] outline-none">
                                    <option value="" disabled>Select</option>
                                    <option>Sports Tournament</option>
                                    <option>Festival Event</option>
                                    <option>Corporate Event</option>
                                    <option>Training Session</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="cateringService" className="text-sm font-medium text-[#222]">Catering Service *</label>
                                <select suppressHydrationWarning id="cateringService" value={formData.cateringService} onChange={handleInputChange} required className="h-11 w-full rounded-md border-2 border-[#d5d5d5]  px-4 text-sm text-[#333] outline-none">
                                    <option value="" disabled>Select</option>
                                    <option>Basic</option>
                                    <option>Standard</option>
                                    <option>Premium</option>
                                </select>
                            </div>
                        </div>


                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                            <div className="space-y-2">
                                <label htmlFor="audioVisual" className="text-sm font-medium text-[#222]">Audio/ Visual Equipment *  </label>
                                <select suppressHydrationWarning id="audioVisual" value={formData.audioVisual} onChange={handleInputChange} required className="h-11 w-full rounded-md border-2 border-[#d5d5d5]  px-4 text-sm text-[#333] outline-none">
                                    <option value="" disabled>Select</option>
                                    <option>Required</option>
                                    <option>Not Required</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="decorations" className="text-sm font-medium text-[#222]">Decorations *</label>
                                <select suppressHydrationWarning id="decorations" value={formData.decorations} onChange={handleInputChange} required className="h-11 w-full rounded-md border-2 border-[#d5d5d5]  px-4 text-sm text-[#333] outline-none">
                                    <option value="" disabled>Select</option>
                                    <option>Basic Setup</option>
                                    <option>Theme Based</option>
                                    <option>Custom</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="eventDateTime" className="text-sm font-medium text-[#222]">Enter Event Date & Timing *</label>
                            <input suppressHydrationWarning id="eventDateTime" type="text" placeholder="Type here" value={formData.eventDateTime} onChange={handleInputChange} required className="h-11 w-full rounded-md border-2 border-[#d5d5d5]  px-4 text-sm text-[#333] outline-none placeholder:text-[#b8b8b8]" />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="paymentMethod" className="text-sm font-medium text-[#222]">How Would You Like To Pay *</label>
                            <select suppressHydrationWarning id="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} required className="h-11 w-full rounded-md border-2 border-[#d5d5d5]  px-4 text-sm text-[#333] outline-none">
                                <option value="" disabled>Select</option>
                                <option>Cash</option>
                                <option>Bank Transfer</option>
                                <option>EasyPaisa / JazzCash</option>
                                <option>Cheque</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-[#222]">Your Message</label>
                            <textarea suppressHydrationWarning id="message" rows={4} placeholder="Type here" value={formData.message} onChange={handleInputChange} className="w-full rounded-md border-2 border-[#d5d5d5]  px-4 py-3 text-sm text-[#333] outline-none placeholder:text-[#b8b8b8]" />
                        </div>

                        <div className="pt-3 text-center">
                            <button suppressHydrationWarning type="submit" disabled={loading} className="h-11 w-full max-w-[760px] rounded-md bg-[#4f76a7] text-base cursor-pointer font-medium text-white transition hover:bg-[#3f6797] disabled:opacity-60 disabled:cursor-not-allowed">{loading ? "Submitting..." : "Submit Form"}
                            </button>
                        </div>
                    </form>
                    {/* Success Modal */}
                    {showSuccessModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl animate-bounce">
                                <div className="flex justify-center mb-4">
                                    <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-center text-[#222] mb-2">Success!</h3>
                                <p className="text-center text-[#666]">
                                    Your message has been submitted successfully!
                                </p>
                                <p className="text-center text-sm text-[#999] mt-4">
                                    We will contact you soon.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* <div className="w-full flex flex-col py-6 sm:py-8 md:py-10 items-center px-8">
                <h3 className='w-full max-w-[1200px] text-xl sm:text-2xl md:text-[28px] lg:text-[30px] font-semibold'>Why Choose J.K.D. for Event Management?</h3>
                <ul className="w-full max-w-[1200px] ml-8 sm:ml-9 md:ml-10 list-disc text-sm sm:text-base pt-2 sm:pt-3">
                    <li>Experienced team for planning and execution</li>
                    <li>End-to-end management (venue, logistics, publicity & coordination)</li>
                    <li>Customized event planning as per client or community needs</li>
                    <li>Focus on impact, engagement, and excellence</li>
                    <li>A proven record of successful tournaments and community programs</li>
                </ul>
                <p className={`w-full max-w-[1200px] pt-3 sm:pt-4 text-sm sm:text-base`}>At J.K.D., we don&apos;t just organize events we create moments that motivate, connect, and inspire.Our Uplift Events are all about celebrating talent, promoting unity, and making a meaningful difference in people&apos;s lives.</p>
            </div> */}
            <Footer />
        </div>
    );
}



