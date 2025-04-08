
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Summer Collection 2025",
    description: "Discover the latest trends in summer fashion with our exclusive collection.",
    cta: "Shop Now",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    link: "/products?category=summer",
  },
  {
    id: 2,
    title: "Tech Essentials",
    description: "Upgrade your tech game with our premium selection of electronics.",
    cta: "Explore Tech",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    link: "/products?category=electronics",
  },
  {
    id: 3,
    title: "Home & Living",
    description: "Transform your space with our stylish home decor collection.",
    cta: "Shop Collection",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    link: "/products?category=home",
  },
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="hero-section relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {/* Slides Container */}
      <div 
        className="h-full w-full flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="h-full w-full flex-shrink-0 relative">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-shop-blue/70 to-shop-teal/30"></div>
            </div>
            <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
              <div className="max-w-2xl animate-fade-in">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-md">
                  {slide.description}
                </p>
                <Button asChild size="lg" className="bg-shop-coral hover:bg-shop-coral/90 text-white">
                  <Link to={slide.link}>{slide.cta}</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-sm z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-sm z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              currentSlide === index ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
