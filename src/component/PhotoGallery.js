import React from 'react'
import data from '@/data/tourism.json'


const PhotoGallery = ({params}) => {
    const heroData  = data?.heroData;
    const tourismMainPageData = ["/makkah.png" , "/sport2.jpg"  , "/adventure3.jpg" , "/corporate4.jpg" , "/tourism3.jpg" ,"/educational1.jpg" ]
    const heroContent = params?.category ? heroData.find((item) => item.path === params?.category) : tourismMainPageData ? { gallery: tourismMainPageData } : null;
  return (
   <>
    {/* Photo Gallery Section */}
            <section className="w-full bg-white px-6 md:px-12 lg:px-16 py-14 md:py-14">
                <div className="max-w-[1220px] mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-4xl font-bold text-black mb-3">Photo Gallery</h2>
                        <p className="text-gray-600 text-lg md:text-xl">Memories from our tourism programs</p>
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {heroContent?.gallery.map((photo , index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-2xl h-44  md:h-55 cursor-pointer"
                            >
                                <img
                                    src={photo}
                                    alt={photo}
                                    className="w-[400px] h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                                    <p className="text-white font-semibold text-lg">{photo.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
   </>
  )
}

export default PhotoGallery