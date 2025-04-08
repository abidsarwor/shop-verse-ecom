
// Sample product data
export const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    description: "Experience high-quality sound with these comfortable, noise-cancelling wireless headphones. Perfect for music lovers and professionals alike.",
    category: "Electronics",
    brand: "AudioTech",
    rating: 4.8,
    reviews: 125,
    stock: 50,
    discount: 15,
    tags: ["headphones", "wireless", "audio"],
    features: [
      "40-hour battery life",
      "Active noise cancellation",
      "Bluetooth 5.0 connectivity",
      "Built-in microphone",
      "Foldable design"
    ]
  },
  {
    id: 2,
    name: "Smartphone XS Pro",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab",
    description: "The latest flagship smartphone with cutting-edge camera technology, fast processor, and stunning display. Redefine your mobile experience.",
    category: "Electronics",
    brand: "TechGiant",
    rating: 4.7,
    reviews: 310,
    stock: 75,
    tags: ["smartphone", "mobile", "tech"],
    features: [
      "6.5\" AMOLED display",
      "Triple camera system (48MP + 16MP + 12MP)",
      "256GB storage",
      "All-day battery life",
      "Water resistant (IP68)"
    ]
  },
  {
    id: 3,
    name: "Designer Laptop Backpack",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7",
    description: "A stylish yet functional backpack with dedicated laptop compartment, multiple pockets, and water-resistant material. Perfect for professionals and students.",
    category: "Fashion",
    brand: "UrbanGear",
    rating: 4.5,
    reviews: 67,
    stock: 120,
    discount: 10,
    tags: ["backpack", "laptop", "fashion", "accessories"],
    features: [
      "Fits up to 15\" laptops",
      "Water-resistant exterior",
      "Padded shoulder straps",
      "Multiple compartments",
      "Anti-theft pocket"
    ]
  },
  {
    id: 4,
    name: "Stainless Steel Water Bottle",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
    description: "Keep your drinks cold for 24 hours or hot for 12 hours with this vacuum insulated stainless steel water bottle. Eco-friendly and durable.",
    category: "Lifestyle",
    brand: "EcoLife",
    rating: 4.9,
    reviews: 214,
    stock: 200,
    tags: ["bottle", "eco-friendly", "accessories"],
    features: [
      "750ml capacity",
      "Double-wall vacuum insulation",
      "BPA-free",
      "Leak-proof lid",
      "Sweat-free exterior"
    ]
  },
  {
    id: 5,
    name: "Smart Fitness Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e494fd6",
    description: "Track your health and fitness goals with this advanced smart watch. Features heart rate monitoring, sleep tracking, and workout detection.",
    category: "Electronics",
    brand: "FitTech",
    rating: 4.6,
    reviews: 98,
    stock: 45,
    discount: 20,
    tags: ["watch", "fitness", "smart", "wearable"],
    features: [
      "Heart rate monitoring",
      "Sleep tracking",
      "GPS tracking",
      "Water resistant",
      "7-day battery life"
    ]
  },
  {
    id: 6,
    name: "Minimalist Desk Lamp",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2",
    description: "Add a touch of modern elegance to your workspace with this adjustable LED desk lamp. Features multiple brightness levels and color temperatures.",
    category: "Home",
    brand: "ModernHome",
    rating: 4.4,
    reviews: 53,
    stock: 30,
    tags: ["lamp", "desk", "home", "lighting"],
    features: [
      "Adjustable arm",
      "Touch controls",
      "Multiple brightness levels",
      "Color temperature settings",
      "Energy-efficient LEDs"
    ]
  },
  {
    id: 7,
    name: "Classic Leather Wallet",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93",
    description: "Crafted from premium genuine leather, this classic wallet features multiple card slots, bill compartments, and RFID protection.",
    category: "Fashion",
    brand: "LeatherCraft",
    rating: 4.7,
    reviews: 89,
    stock: 60,
    tags: ["wallet", "leather", "accessories"],
    features: [
      "Genuine leather",
      "RFID blocking",
      "8 card slots",
      "2 bill compartments",
      "ID window"
    ]
  },
  {
    id: 8,
    name: "Ceramic Plant Pot Set",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411",
    description: "Enhance your indoor garden with this set of 3 ceramic plant pots in different sizes. Modern design with drainage holes and bamboo trays.",
    category: "Home",
    brand: "GreenSpace",
    rating: 4.5,
    reviews: 42,
    stock: 25,
    tags: ["plant", "pot", "home", "garden"],
    features: [
      "Set of 3 sizes",
      "Drainage holes",
      "Bamboo trays included",
      "Modern matte finish",
      "Lightweight design"
    ]
  },
  {
    id: 9,
    name: "Premium Coffee Maker",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6",
    description: "Brew the perfect cup of coffee with this programmable coffee maker. Features adjustable brew strength, timer, and thermal carafe to keep coffee hot for hours.",
    category: "Home",
    brand: "BrewMaster",
    rating: 4.8,
    reviews: 76,
    stock: 40,
    discount: 15,
    tags: ["coffee", "kitchen", "appliance"],
    features: [
      "12-cup capacity",
      "Programmable timer",
      "Adjustable brew strength",
      "Auto shut-off",
      "Thermal carafe"
    ]
  },
  {
    id: 10,
    name: "Wireless Gaming Mouse",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1613141411244-0e4ac259d217",
    description: "Gain a competitive edge with this high-precision wireless gaming mouse. Features RGB lighting, customizable buttons, and long battery life.",
    category: "Electronics",
    brand: "GameTech",
    rating: 4.6,
    reviews: 112,
    stock: 55,
    tags: ["mouse", "gaming", "computer"],
    features: [
      "16000 DPI sensor",
      "8 programmable buttons",
      "RGB lighting",
      "70-hour battery life",
      "Lightweight design"
    ]
  },
  {
    id: 11,
    name: "Portable Bluetooth Speaker",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    description: "Take your music anywhere with this waterproof, portable Bluetooth speaker. Delivers rich, clear sound with deep bass and 360° audio.",
    category: "Electronics",
    brand: "SoundWave",
    rating: 4.7,
    reviews: 143,
    stock: 80,
    discount: 10,
    tags: ["speaker", "bluetooth", "audio"],
    features: [
      "12-hour battery life",
      "Waterproof (IPX7)",
      "Bluetooth 5.0",
      "360° sound",
      "Built-in microphone"
    ]
  },
  {
    id: 12,
    name: "Bamboo Cutting Board Set",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1631984564919-1f6b2313f85c",
    description: "Upgrade your kitchen with this set of 3 bamboo cutting boards. Eco-friendly, antibacterial, and perfect for all your food prep needs.",
    category: "Home",
    brand: "KitchenEco",
    rating: 4.5,
    reviews: 58,
    stock: 35,
    tags: ["kitchen", "cutting board", "bamboo"],
    features: [
      "Set of 3 sizes",
      "Sustainable bamboo",
      "Juice groove",
      "Non-slip edges",
      "Antibacterial surface"
    ]
  }
];

// Sample categories
export const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661",
    description: "The latest gadgets and tech accessories"
  },
  {
    id: 2,
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    description: "Clothing, shoes, and accessories for all styles"
  },
  {
    id: 3,
    name: "Home",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
    description: "Furniture, decor, and essentials for every home"
  },
  {
    id: 4,
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
    description: "Skincare, makeup, and personal care products"
  },
  {
    id: 5,
    name: "Sports",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    description: "Equipment and apparel for all sports and activities"
  },
  {
    id: 6,
    name: "Books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    description: "Fiction, non-fiction, and educational material"
  }
];

// Sample featured collection
export const featuredCollection = {
  id: 1,
  title: "Summer Essentials",
  description: "Everything you need for the perfect summer",
  image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  productIds: [1, 3, 4, 8, 11]
};
