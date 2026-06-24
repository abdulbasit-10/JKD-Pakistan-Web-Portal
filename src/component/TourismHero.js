import React from 'react'
import Link from 'next/link'
import data from '@/data/tourism.json'

const TourismHero = ({params}) => {
  
  let tourismCards = data?.tourismCards;
  const heroData  = data?.heroData;
  const cards = data?.heroCards;
  
  const heroContent = heroData.find((item) => item.path === params?.category);
  const backgroundImage = heroContent?.image || "/tourismHero.png";
  console.log(backgroundImage);
  tourismCards = heroContent?.tourismsIds? heroContent.tourismsIds.map((id) => {
    return cards.find((card) => card.id === id);
  }) : tourismCards;

  console.log("TourismHero params:", params?.category);
  console.log("TourismHero tourismCards:", tourismCards);

  return (
    <>
      {/* Hero Section */}
      <div className={`w-full relative min-h-[540px] md:min-h-[500px] ${heroContent?.title.length > 17 ? 'lg:h-[530px]':'lg:h-[500px]'} `}>

        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.4) 100%), url("' + backgroundImage + '")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'scroll'
          }}
        />

        {/* Content */}
        <div className="relative h-full flex flex-col gap-6 md:gap-8 items-start justify-center px-5 sm:px-8 md:px-16 lg:px-24 max-w-6xl py-14 md:py-0">

          <h1 className="text-4xl sm:text-5xl md:text-[70px] md:w-[900px] font-bold text-white mb-3 md:mb-4 leading-tight">
            {heroContent?.title || "Explore JKD Tourism"}
            <br />
          </h1>

          <p className="text-base sm:text-lg md:text-2xl text-gray-100 mb-6 md:w-[510px] md:mb-8 font-light tracking-wide">
            {heroContent?.description || "Discover world-class religious, international, and adventure travel experiences."}
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
            <Link href="#browseAll">
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-[#D08348] hover:bg-[#b86f3a] text-white font-medium rounded-2xl cursor-pointer transition-all duration-300 flex items-center gap-3 sm:gap-4">
                {heroContent?.button || "Explore Tourism Programs"}
                <span className="text-lg">→</span>
              </button>
            </Link>
          </div>

        </div>
      </div>

      {/* Cards Section */}
      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-24 mt-8 md:mt-10 lg:-mt-5 relative z-10">

        <div className="max-w-[1400px] mx-auto">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8 pb-5   place-items-center">

            {
             tourismCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-[#F9FAFB] w-full max-w-[250px] rounded-lg p-6 md:p-6 h-[200px] transition-all duration-300 flex flex-col items-center text-center gap-4 group cursor-pointer hover:scale-105"
                >

                  <img
                    src={card.icon}
                    alt={card.title}
                    className="w-14 h-14 md:w-16 md:h-16 mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-300 object-contain"
                  />

                  <h3 className="text-base md:text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {card.title}
                  </h3>

                </div>
              ))
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default TourismHero