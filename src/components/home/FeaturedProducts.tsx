
import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";

const FeaturedProducts = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center">Featured Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" className="border-shop-teal text-shop-teal hover:bg-shop-teal hover:text-white">
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    rating: number;
    category: string;
    discount?: number;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate discounted price if discount exists
  const discountedPrice = product.discount 
    ? product.price - (product.price * (product.discount / 100)) 
    : null;

  return (
    <div 
      className="product-card relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product image */}
      <div className="relative h-64 overflow-hidden">
        <Link to={`/products/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        
        {/* Discount badge */}
        {product.discount && (
          <div className="absolute top-2 left-2 bg-shop-coral text-white text-sm font-medium py-1 px-2 rounded">
            {product.discount}% OFF
          </div>
        )}
        
        {/* Quick actions */}
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-black/70 flex justify-center space-x-2 p-3 transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-white hover:bg-shop-teal text-shop-blue hover:text-white rounded-full"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-white hover:bg-shop-coral text-shop-blue hover:text-white rounded-full"
            aria-label="Add to wishlist"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Product info */}
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-medium text-gray-900 hover:text-shop-teal transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center mt-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${
                i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              }`} 
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
        </div>
        
        <div className="mt-2 flex items-center">
          {discountedPrice ? (
            <>
              <span className="text-shop-blue font-bold">${discountedPrice.toFixed(2)}</span>
              <span className="text-gray-500 line-through ml-2 text-sm">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-shop-blue font-bold">${product.price.toFixed(2)}</span>
          )}
        </div>
        
        <div className="text-xs text-gray-500 mt-1">{product.category}</div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
