import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// If you need Slick Carousel for specific features, import these
// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carouselData, setCarouselData] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const fetchCarousel = async () => {
      try {
        const response = await fetch("https://api.lavogos.com/api/get-carousel");
        const data = await response.json();
        if (data.status === 200 && data.data.status === "active") {
          setCarouselData(data.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarousel();
  }, []);

  useEffect(() => {
    if (!carouselData) return;

    const timer = setInterval(() => {
      changeSlide((prev) => (prev + 1) % carouselData.hero_images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [carouselData]);

  const changeSlide = (newSlideIndex) => {
    setTransitioning(true);
    setTimeout(() => {
      if (typeof newSlideIndex === 'function') {
        setCurrentSlide(newSlideIndex);
      } else {
        setCurrentSlide(newSlideIndex);
      }
      setTimeout(() => {
        setTransitioning(false);
      }, 50);
    }, 300);
  };

  const goToPrevious = () => {
    changeSlide((prev) => 
      (prev - 1 + (carouselData?.hero_images.length || 1)) % (carouselData?.hero_images.length || 1)
    );
  };

  const goToNext = () => {
    changeSlide((prev) => 
      (prev + 1) % (carouselData?.hero_images.length || 1)
    );
  };

  // Loading state with proper responsive heights
  if (isLoading) return (
    <div className="flex justify-center items-center min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] xl:min-h-[600px]">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading carousel...</p>
      </div>
    </div>
  );

  // Error state with proper responsive heights
  if (error) return (
    <div className="flex justify-center items-center min-h-[250px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] xl:min-h-[600px]">
      <div className="text-center text-red-500 p-4">
        <p className="text-xl font-semibold mb-2">Unable to load carousel</p>
        <p>Error: {error}</p>
      </div>
    </div>
  );

  if (!carouselData) return null;

  return (
    <div className="my-14">
      <div className="relative overflow-hidden">
        {carouselData.hero_images.map((slide, index) => (
          <div
            key={slide.id}
            className={`relative ${
              index === currentSlide 
                ? 'block opacity-100 z-10' 
                : 'hidden opacity-0 z-0'
            } ${transitioning ? 'transform scale-[1.02]' : 'transform scale-100'} transition-transform duration-500 ease-in-out`}
          >
            <div className="relative">
              <picture>
                {/* Mobile-specific image if available */}
                {slide.mobile_file_name && (
                  <source 
                    media="(max-width: 639px)" 
                    srcSet={`https://api.lavogos.com/${slide.base_path}${slide.mobile_file_name}`} 
                  />
                )}
                {/* Default image */}
                <img
                  src={`https://api.lavogos.com/${slide.base_path}${slide.file_name}`}
                  alt={slide.slide_title}
                  className="w-full h-auto"
                  loading={index === 0 ? "eager" : "lazy"}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/800x400?text=Image+Not+Available";
                  }}
                />
              </picture>
              
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full">
                {/* Title and subtitle with text shadow for better visibility */}
                {slide.slide_title && (
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 sm:mb-2 md:mb-3 lg:mb-4 
                    transition-transform duration-500 ease-in-out transform translate-y-0 drop-shadow-lg">
                    {slide.slide_title}
                  </h2>
                )}
                
                {slide.slide_sub_title && (
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 
                    mb-2 sm:mb-3 md:mb-4 transition-transform duration-500 ease-in-out transform translate-y-0 drop-shadow-lg">
                    {slide.slide_sub_title}
                  </p>
                )}
                
                {/* Shop Now button styled like in first example */}
                <div className="flex justify-center items-center gap-x-4 mt-4">
                  <Link to={slide.cta_link || "/"}>
                    <button className="relative inline-flex items-center justify-center px-6 py-3 md:py-2 md:text-[15px] text-lg font-medium 
                      mt-[340px] lg:mt-[320px] md:mt-[172px] sm:mt-16 text-black bg-white transition-all duration-300 rounded-full">
                      <span className="absolute inset-0 bg-white bg-opacity-10 rounded-full transition-opacity duration-300 hover:bg-opacity-20"></span>
                      {slide.cta_text || "Shop Now"}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="ml-2"
                      >
                        <path
                          d="M3.5 12H20M20 12L13 5M20 12L13 19"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 sm:left-3 md:left-4 lg:left-6 top-1/2 -translate-y-1/2 
            bg-white/70 hover:bg-white/90 p-1.5 sm:p-2 md:p-2.5 rounded-full 
            transition-all duration-300 z-20 focus:outline-none focus:ring-2 focus:ring-white
            shadow-md"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-gray-800" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 sm:right-3 md:right-4 lg:right-6 top-1/2 -translate-y-1/2 
            bg-white/70 hover:bg-white/90 p-1.5 sm:p-2 md:p-2.5 rounded-full 
            transition-all duration-300 z-20 focus:outline-none focus:ring-2 focus:ring-white
            shadow-md"
          aria-label="Next slide"
        >
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-gray-800" />
        </button>

        {/* Dots Navigation - Styled more like original Slick dots */}
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-20">
          {carouselData.hero_images.map((_, index) => (
            <button
              key={index}
              onClick={() => changeSlide(index)}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 
                ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;