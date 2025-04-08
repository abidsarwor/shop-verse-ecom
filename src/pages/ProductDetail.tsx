
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { products } from "@/data/products";
import { Star, Heart, Share2, ShoppingCart, Check, ChevronRight, Minus, Plus, Truck, RefreshCw, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  // Find the product based on the ID
  const product = products.find(p => p.id === parseInt(id || "0"));
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="bg-shop-blue hover:bg-shop-teal">
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Sample product images (including the main one)
  const productImages = [product.image, ...Array(4).fill(product.image)];

  // Calculate discounted price if discount exists
  const discountedPrice = product.discount 
    ? product.price - (product.price * (product.discount / 100)) 
    : null;

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const addToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  const addToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-shop-teal">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link to="/products" className="hover:text-shop-teal">Products</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link to={`/products?category=${product.category}`} className="hover:text-shop-teal">{product.category}</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-700">{product.name}</span>
        </div>

        {/* Product Detail Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="bg-white rounded-lg overflow-hidden mb-4 border border-gray-200">
              <img 
                src={productImages[activeImage]} 
                alt={product.name} 
                className="w-full h-96 object-contain"
              />
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`border rounded-md overflow-hidden h-20 ${
                    activeImage === index ? 'ring-2 ring-shop-teal' : 'border-gray-200'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} thumbnail ${index}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${
                      i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
            
            {/* Price */}
            <div className="mb-6">
              {discountedPrice ? (
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-shop-blue">${discountedPrice.toFixed(2)}</span>
                  <span className="text-lg text-gray-500 line-through ml-2">${product.price.toFixed(2)}</span>
                  <span className="ml-2 bg-shop-coral text-white text-sm font-medium py-1 px-2 rounded">
                    {product.discount}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-shop-blue">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            {/* Description */}
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            {/* Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
              <ul className="space-y-1">
                {product.features?.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-shop-teal mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <span className="text-gray-700 mr-4">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button 
                  onClick={decrementQuantity}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                <button 
                  onClick={incrementQuantity}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="ml-4 text-gray-500">
                {product.stock} in stock
              </span>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button 
                onClick={addToCart}
                className="flex-1 bg-shop-blue hover:bg-shop-teal text-white"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button 
                onClick={addToWishlist}
                variant="outline" 
                className="flex-1 border-shop-coral text-shop-coral hover:bg-shop-coral hover:text-white"
              >
                <Heart className="h-5 w-5 mr-2" />
                Add to Wishlist
              </Button>
            </div>
            
            {/* Additional Info */}
            <div className="space-y-4 border-t border-gray-200 pt-6">
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-shop-teal mr-3" />
                <span className="text-gray-700">Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center">
                <RefreshCw className="h-5 w-5 text-shop-teal mr-3" />
                <span className="text-gray-700">30-day easy returns</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-shop-teal mr-3" />
                <span className="text-gray-700">2-year warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                <p className="mb-4">{product.description}</p>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget
                  ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                  Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam
                  nisl nisl sit amet nisl.
                </p>
                <p>
                  Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam
                  nisl nisl sit amet nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl
                  aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="mt-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium">Brand</span>
                    <span className="text-gray-600">{product.brand}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium">Category</span>
                    <span className="text-gray-600">{product.category}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium">Weight</span>
                    <span className="text-gray-600">0.5 kg</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium">Dimensions</span>
                    <span className="text-gray-600">10 × 20 × 5 cm</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium">Material</span>
                    <span className="text-gray-600">Premium</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium">Color</span>
                    <span className="text-gray-600">Black</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Customer Reviews</h3>
                  <Button className="bg-shop-blue hover:bg-shop-teal">Write a Review</Button>
                </div>
                
                {/* Review Summary */}
                <div className="flex flex-col md:flex-row md:items-center mb-8 p-6 bg-gray-50 rounded-lg">
                  <div className="text-center mb-4 md:mb-0 md:mr-8">
                    <div className="text-5xl font-bold text-shop-blue mb-2">{product.rating}</div>
                    <div className="flex justify-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${
                            i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">Based on {product.reviews} reviews</div>
                  </div>
                  
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const percentage = star === Math.round(product.rating) ? 70 : 
                                        star === Math.round(product.rating) - 1 ? 20 : 
                                        star === Math.round(product.rating) + 1 ? 10 : 0;
                      return (
                        <div key={star} className="flex items-center mb-1">
                          <div className="text-sm text-gray-600 w-6">{star}</div>
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-2" />
                          <div className="flex-1 h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-2 bg-yellow-400 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 ml-2 w-8">{percentage}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Sample Reviews */}
                <div className="space-y-6">
                  {[
                    {
                      name: "Sarah Johnson",
                      date: "May 15, 2024",
                      rating: 5,
                      comment: "This product exceeded my expectations! The quality is outstanding and it works perfectly for my needs. Highly recommend to anyone considering this purchase.",
                    },
                    {
                      name: "Michael Chen",
                      date: "April 23, 2024",
                      rating: 4,
                      comment: "Great product overall. The only reason I'm giving 4 stars instead of 5 is because of the slightly longer than expected delivery time. The product itself is perfect though.",
                    },
                    {
                      name: "Emma Rodriguez",
                      date: "March 10, 2024",
                      rating: 5,
                      comment: "Amazing quality and the customer service was excellent. I had a question about the product and they responded very quickly. Will definitely shop here again!",
                    },
                  ].map((review, idx) => (
                    <div key={idx} className="border-b border-gray-200 pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{review.name}</h4>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map(relatedProduct => (
                <div key={relatedProduct.id} className="product-card">
                  {/* Product image */}
                  <div className="relative h-64 overflow-hidden">
                    <Link to={`/products/${relatedProduct.id}`}>
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name} 
                        className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                      />
                    </Link>
                    
                    {/* Discount badge */}
                    {relatedProduct.discount && (
                      <div className="absolute top-2 left-2 bg-shop-coral text-white text-sm font-medium py-1 px-2 rounded">
                        {relatedProduct.discount}% OFF
                      </div>
                    )}
                  </div>
                  
                  {/* Product info */}
                  <div className="p-4">
                    <Link to={`/products/${relatedProduct.id}`}>
                      <h3 className="font-medium text-gray-900 hover:text-shop-teal transition-colors">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < relatedProduct.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    
                    <div className="mt-2">
                      {relatedProduct.discount ? (
                        <div className="flex items-center">
                          <span className="text-shop-blue font-bold">
                            ${(relatedProduct.price * (1 - relatedProduct.discount / 100)).toFixed(2)}
                          </span>
                          <span className="text-gray-500 line-through ml-2 text-sm">
                            ${relatedProduct.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-shop-blue font-bold">${relatedProduct.price.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProductDetail;
