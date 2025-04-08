
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  User, 
  Search, 
  Heart, 
  Menu, 
  X 
} from "lucide-react";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-shop-blue">
            ShopVerse
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-shop-teal font-medium">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-shop-teal font-medium">
              Products
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-shop-teal font-medium">
              Categories
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-shop-teal font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-shop-teal font-medium">
              Contact
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className={`${isSearchOpen ? "flex" : "hidden md:flex"} items-center relative`}>
              <Input
                type="text"
                placeholder="Search products..."
                className="rounded-full pl-10 pr-4 focus:ring-shop-teal"
              />
              <Search 
                className="absolute left-3 h-4 w-4 text-gray-400" 
                aria-hidden="true" 
              />
            </div>
            <button 
              onClick={toggleSearch}
              className="md:hidden text-gray-700 hover:text-shop-teal"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Wishlist */}
            <Link 
              to="/wishlist" 
              className="hidden sm:flex text-gray-700 hover:text-shop-teal"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
            </Link>

            {/* Account */}
            <Link 
              to="/account" 
              className="hidden sm:flex text-gray-700 hover:text-shop-teal"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Link>

            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative text-gray-700 hover:text-shop-teal"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-shop-coral text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={toggleMenu}
              className="md:hidden text-gray-700 hover:text-shop-teal"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-gray-100 animate-fade-in">
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  className="block text-gray-700 hover:text-shop-teal font-medium"
                  onClick={toggleMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="block text-gray-700 hover:text-shop-teal font-medium"
                  onClick={toggleMenu}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/categories" 
                  className="block text-gray-700 hover:text-shop-teal font-medium"
                  onClick={toggleMenu}
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="block text-gray-700 hover:text-shop-teal font-medium"
                  onClick={toggleMenu}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="block text-gray-700 hover:text-shop-teal font-medium"
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/wishlist" 
                  className="block text-gray-700 hover:text-shop-teal font-medium sm:hidden"
                  onClick={toggleMenu}
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link 
                  to="/account" 
                  className="block text-gray-700 hover:text-shop-teal font-medium sm:hidden"
                  onClick={toggleMenu}
                >
                  Account
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
