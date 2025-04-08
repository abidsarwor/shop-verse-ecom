
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    itemCount: 124,
    link: "/products?category=electronics",
  },
  {
    id: 2,
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    itemCount: 254,
    link: "/products?category=fashion",
  },
  {
    id: 3,
    name: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    itemCount: 176,
    link: "/products?category=home",
  },
  {
    id: 4,
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    itemCount: 142,
    link: "/products?category=beauty",
  },
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={category.link}
              className="group overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${category.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-shop-blue/80 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                  <p className="text-white/80">{category.itemCount} Products</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
