
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { toast } from "@/hooks/use-toast";

// Sample cart items for demonstration
const initialCartItems = [
  {
    id: 1,
    productId: 1,
    quantity: 1,
    product: products.find(p => p.id === 1)!,
  },
  {
    id: 2,
    productId: 3,
    quantity: 2,
    product: products.find(p => p.id === 3)!,
  },
  {
    id: 3,
    productId: 5,
    quantity: 1,
    product: products.find(p => p.id === 5)!,
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  
  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => {
    const price = item.product.discount 
      ? item.product.price * (1 - item.product.discount / 100) 
      : item.product.price;
    return total + price * item.quantity;
  }, 0);
  
  // Sample values for demonstration
  const shippingCost = subtotal > 100 ? 0 : 10;
  const discountAmount = couponApplied ? subtotal * 0.1 : 0; // 10% discount when coupon applied
  const taxRate = 0.07; // 7% tax
  const taxAmount = (subtotal - discountAmount) * taxRate;
  const totalAmount = subtotal + shippingCost + taxAmount - discountAmount;

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "discount10") {
      setCouponApplied(true);
      toast({
        title: "Coupon applied",
        description: "10% discount has been applied to your order.",
      });
    } else {
      toast({
        title: "Invalid coupon",
        description: "The coupon code you entered is invalid or expired.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-shop-blue">Your Shopping Cart</h1>
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <Link to="/" className="hover:text-shop-teal">Home</Link>
            <span className="mx-2">/</span>
            <span>Cart</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b">
                  <div className="col-span-6">
                    <span className="font-medium">Product</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="font-medium">Price</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="font-medium">Quantity</span>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="font-medium">Subtotal</span>
                  </div>
                </div>

                {cartItems.map((item) => {
                  const price = item.product.discount 
                    ? item.product.price * (1 - item.product.discount / 100) 
                    : item.product.price;
                  const itemTotal = price * item.quantity;

                  return (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b items-center">
                      {/* Product */}
                      <div className="col-span-1 md:col-span-6 flex items-center">
                        <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <Link to={`/products/${item.product.id}`} className="font-medium hover:text-shop-teal">
                            {item.product.name}
                          </Link>
                          <div className="text-sm text-gray-500 mt-1">{item.product.category}</div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-1 md:col-span-2 text-center">
                        {item.product.discount ? (
                          <div className="flex flex-col md:items-center">
                            <span className="font-medium">${price.toFixed(2)}</span>
                            <span className="text-sm text-gray-500 line-through">${item.product.price.toFixed(2)}</span>
                          </div>
                        ) : (
                          <span className="font-medium">${price.toFixed(2)}</span>
                        )}
                      </div>

                      {/* Quantity */}
                      <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center justify-center">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-gray-500 hover:text-gray-700 p-1"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-500 hover:text-gray-700 p-1"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal & Remove */}
                      <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end">
                        <span className="font-medium">${itemTotal.toFixed(2)}</span>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 ml-4"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Continue Shopping & Update Cart */}
              <div className="flex flex-col sm:flex-row justify-between mt-6">
                <Button asChild variant="outline" className="mb-3 sm:mb-0">
                  <Link to="/products">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    {shippingCost === 0 ? (
                      <span className="text-green-500">Free</span>
                    ) : (
                      <span className="font-medium">${shippingCost.toFixed(2)}</span>
                    )}
                  </div>
                  
                  {couponApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (7%)</span>
                    <span className="font-medium">${taxAmount.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-shop-blue">${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="mb-6">
                  <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
                    Apply Coupon Code
                  </label>
                  <div className="flex">
                    <Input 
                      id="coupon"
                      type="text" 
                      placeholder="Enter coupon code" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={couponApplied}
                      className="rounded-r-none"
                    />
                    <Button 
                      onClick={applyCoupon}
                      disabled={!couponCode || couponApplied}
                      className="rounded-l-none bg-shop-blue hover:bg-shop-teal"
                    >
                      Apply
                    </Button>
                  </div>
                  {couponApplied && (
                    <p className="text-sm text-green-600 mt-1">Coupon applied successfully!</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Try code "DISCOUNT10" for 10% off your order.
                  </p>
                </div>

                {/* Checkout Button */}
                <Button asChild className="w-full bg-shop-coral hover:bg-shop-coral/90">
                  <Link to="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                {/* Secure Checkout Message */}
                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>Secure Checkout. 100% Protected & Safe</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-block p-6 rounded-full bg-gray-100 mb-6">
              <ShoppingBag className="h-16 w-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button asChild className="bg-shop-blue hover:bg-shop-teal">
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
