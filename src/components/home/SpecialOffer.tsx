
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const SpecialOffer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set end date to 10 days from now for demo purposes
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 10);
    
    const calculateTimeLeft = () => {
      const difference = +endDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1481349518771-20055b2a7b24)' }}
      ></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="bg-gradient-to-r from-shop-blue to-shop-teal rounded-2xl shadow-2xl overflow-hidden">
          <div className="md:flex items-center">
            {/* Image */}
            <div className="md:w-1/2 h-64 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853" 
                alt="Special Offer" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="md:w-1/2 p-8 md:p-12 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Special Deal of the Week</h2>
              <h3 className="text-xl md:text-2xl font-semibold mb-4">
                Premium Laptop Bundle
              </h3>
              <p className="mb-6">
                Get 30% off on our premium laptop bundle, including a laptop bag, 
                wireless mouse, and noise-cancelling headphones.
              </p>
              
              {/* Countdown */}
              <div className="grid grid-cols-4 gap-2 max-w-md mb-6">
                <div className="bg-white/20 rounded-lg p-2 text-center">
                  <div className="text-2xl font-bold">{timeLeft.days}</div>
                  <div className="text-xs">Days</div>
                </div>
                <div className="bg-white/20 rounded-lg p-2 text-center">
                  <div className="text-2xl font-bold">{timeLeft.hours}</div>
                  <div className="text-xs">Hours</div>
                </div>
                <div className="bg-white/20 rounded-lg p-2 text-center">
                  <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                  <div className="text-xs">Minutes</div>
                </div>
                <div className="bg-white/20 rounded-lg p-2 text-center">
                  <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                  <div className="text-xs">Seconds</div>
                </div>
              </div>
              
              <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex">
                <Button asChild size="lg" className="w-full md:w-auto bg-shop-coral hover:bg-shop-coral/90">
                  <Link to="/products/special-offer">Shop Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full md:w-auto border-white text-white hover:bg-white/10">
                  <Link to="/products?discount=true">View All Deals</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;
