import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { products, categories } from "@/data/products";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Filter, 
  ChevronDown, 
  X,
  SlidersHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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

const FilterSidebar = ({ 
  isOpen, 
  setIsOpen, 
  priceRange, 
  setPriceRange, 
  selectedCategories, 
  setSelectedCategories, 
  ratings,
  setRatings,
  onApplyFilters
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  ratings: number[];
  setRatings: (ratings: number[]) => void;
  onApplyFilters: () => void;
}) => {
  const uniqueCategories = Array.from(new Set(categories.map(category => category.name)));

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleRatingChange = (rating: number) => {
    if (ratings.includes(rating)) {
      setRatings(ratings.filter(r => r !== rating));
    } else {
      setRatings([...ratings, rating]);
    }
  };

  const handleClearFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    setRatings([]);
  };

  return (
    <div className={`lg:block ${isOpen ? 'block' : 'hidden'}`}>
      <div className="lg:hidden mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsOpen(false)}
          className="text-gray-500"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Price Range</h3>
          <div className="px-2">
            <Slider
              value={priceRange}
              min={0}
              max={1000}
              step={10}
              onValueChange={setPriceRange}
              className="mb-4"
            />
            <div className="flex justify-between text-sm">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Categories</h3>
          <div className="space-y-2">
            {uniqueCategories.map((category) => (
              <div key={category} className="flex items-center">
                <Checkbox 
                  id={`category-${category}`} 
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <Label 
                  htmlFor={`category-${category}`}
                  className="ml-2 text-sm font-medium leading-none cursor-pointer"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Ratings */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Ratings</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <Checkbox 
                  id={`rating-${rating}`} 
                  checked={ratings.includes(rating)}
                  onCheckedChange={() => handleRatingChange(rating)}
                />
                <Label 
                  htmlFor={`rating-${rating}`}
                  className="ml-2 text-sm font-medium leading-none cursor-pointer flex items-center"
                >
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                  {[...Array(5-rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-gray-300" />
                  ))}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-2">
          <Button 
            onClick={onApplyFilters}
            className="w-full bg-shop-blue hover:bg-shop-teal"
          >
            Apply Filters
          </Button>
          <Button 
            variant="outline" 
            onClick={handleClearFilters}
            className="w-full border-gray-300 text-gray-700"
          >
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
};

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [ratings, setRatings] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState("featured");

  // Get category filter from URL if present
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
    
    const discountParam = searchParams.get('discount');
    if (discountParam === 'true') {
      // Filter to only show products with discounts
      filterProducts();
    }
  }, [searchParams]);

  const filterProducts = () => {
    let result = [...products];
    
    // Filter by price
    result = result.filter(product => {
      const finalPrice = product.discount 
        ? product.price - (product.price * (product.discount / 100)) 
        : product.price;
      return finalPrice >= priceRange[0] && finalPrice <= priceRange[1];
    });
    
    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter(product => 
        selectedCategories.includes(product.category)
      );
    }
    
    // Filter by rating
    if (ratings.length > 0) {
      result = result.filter(product => 
        ratings.includes(Math.floor(product.rating))
      );
    }
    
    // Filter by discount
    const discountParam = searchParams.get('discount');
    if (discountParam === 'true') {
      result = result.filter(product => product.discount !== undefined);
    }
    
    // Sort products
    switch (sortOrder) {
      case "price-low-high":
        result.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
          return priceA - priceB;
        });
        break;
      case "price-high-low":
        result.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
          return priceB - priceA;
        });
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured - keep original order
        break;
    }
    
    setFilteredProducts(result);
  };

  const handleApplyFilters = () => {
    filterProducts();
    setIsFilterOpen(false);
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
    setTimeout(() => {
      filterProducts();
    }, 0);
  };

  useEffect(() => {
    // Initial filtering
    filterProducts();
  }, []);

  return (
    <Layout>
      {/* Page Header */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-shop-blue">All Products</h1>
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <Link to="/" className="hover:text-shop-teal">Home</Link>
            <span className="mx-2">/</span>
            <span>Products</span>
          </div>
        </div>
      </div>

      {/* Product Listing Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Card>
              <CardContent className="p-6">
                <FilterSidebar 
                  isOpen={true}
                  setIsOpen={setIsFilterOpen}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  ratings={ratings}
                  setRatings={setRatings}
                  onApplyFilters={handleApplyFilters}
                />
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and Filter Controls */}
            <div className="flex flex-wrap justify-between items-center mb-6">
              <div className="mb-4 sm:mb-0">
                <p className="text-gray-500">
                  Showing <span className="font-medium">{filteredProducts.length}</span> products
                </p>
              </div>
              
              <div className="flex space-x-2 items-center">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="lg:hidden flex items-center"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>
                        Refine your product search with these filters.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-4">
                      <FilterSidebar 
                        isOpen={true}
                        setIsOpen={() => {}}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        ratings={ratings}
                        setRatings={setRatings}
                        onApplyFilters={handleApplyFilters}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
                
                {/* Sort Dropdown */}
                <div className="flex items-center space-x-2">
                  <SlidersHorizontal className="h-4 w-4 text-gray-500" />
                  <Select 
                    value={sortOrder} 
                    onValueChange={handleSortChange}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                      <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
                <Button 
                  onClick={() => {
                    setPriceRange([0, 1000]);
                    setSelectedCategories([]);
                    setRatings([]);
                    setTimeout(filterProducts, 0);
                  }}
                  className="bg-shop-blue hover:bg-shop-teal"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
