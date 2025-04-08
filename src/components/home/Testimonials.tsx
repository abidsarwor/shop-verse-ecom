
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Regular Customer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    content: "I've been shopping with ShopVerse for over two years now and I'm consistently impressed by their product quality and customer service. The delivery is always on time and the packaging is excellent.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Tech Enthusiast",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    content: "As someone who's particular about tech products, I appreciate the detailed specifications and honest reviews on ShopVerse. Their electronics selection is top-notch and prices are competitive.",
    rating: 4,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    title: "Fashion Blogger",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    content: "ShopVerse has become my go-to for fashion finds. Their curated collections are always on trend and the quality exceeds expectations. Fast shipping and easy returns make shopping stress-free.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Thompson",
    title: "Home Decorator",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    content: "I renovated my entire apartment using products from ShopVerse's home collection. The quality is excellent, and their customer support helped me with all my questions about the products.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsPerView = 1;
  const maxIndex = Math.ceil(testimonials.length / itemsPerView) - 1;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="py-16 bg-gradient-to-b from-shop-blue to-shop-teal text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">What Our Customers Say</h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Carousel */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                    {/* Rating */}
                    <div className="flex mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${
                            i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
                          }`} 
                        />
                      ))}
                    </div>
                    
                    {/* Content */}
                    <blockquote className="text-lg italic mb-8">
                      "{testimonial.content}"
                    </blockquote>
                    
                    {/* Author */}
                    <div className="flex items-center">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-white/80 text-sm">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 shadow-lg"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 shadow-lg"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(maxIndex + 1)].map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === index ? "w-8 bg-white" : "w-2 bg-white/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
