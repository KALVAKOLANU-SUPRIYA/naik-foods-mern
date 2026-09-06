const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

const products = [
  {
    name: "Jowar Palak Khakhra",
    category: "Snacks",
    price: 120,
    rating: 4.5,
    description: "Crispy jowar and spinach khakhra.",
    tags: ["Healthy", "Snack", "Traditional"],
    image: "https://via.placeholder.com/300",
    stock: 25
  },
  {
    name: "Bajra Methi Khakhra",
    category: "Snacks",
    price: 130,
    rating: 4.6,
    description: "Crispy pearl millet and fenugreek khakhra.",
    tags: ["Healthy", "Snack"],
    image: "https://via.placeholder.com/300",
    stock: 30
  },
  {
    name: "Beetroot Chips",
    category: "Snacks",
    price: 70,
    rating: 4.4,
    description: "Crunchy beetroot chips.",
    tags: ["Healthy", "Crispy"],
    image: "https://via.placeholder.com/300",
    stock: 40
  },
  {
    name: "Mango Pickle",
    category: "Pickles",
    price: 150,
    rating: 4.7,
    description: "Traditional spicy mango pickle.",
    tags: ["Spicy", "Traditional"],
    image: "https://via.placeholder.com/300",
    stock: 20
  },
  {
    name: "Lemon Pickle",
    category: "Pickles",
    price: 140,
    rating: 4.5,
    description: "Traditional lemon pickle.",
    tags: ["Spicy", "Pickle"],
    image: "https://via.placeholder.com/300",
    stock: 18
  },
  {
    name: "Besan Ladoo",
    category: "Sweets",
    price: 220,
    rating: 4.8,
    description: "Traditional besan ladoos.",
    tags: ["Sweet", "Traditional"],
    image: "https://via.placeholder.com/300",
    stock: 15
  },
  {
    name: "Kaju Katli",
    category: "Sweets",
    price: 350,
    rating: 4.9,
    description: "Rich cashew-based Indian sweet.",
    tags: ["Sweet", "Premium"],
    image: "https://via.placeholder.com/300",
    stock: 12
  },
  {
    name: "Maharashtrian Masala",
    category: "Spices",
    price: 100,
    rating: 4.6,
    description: "Aromatic traditional Maharashtrian spice blend.",
    tags: ["Spicy", "Masala"],
    image: "https://via.placeholder.com/300",
    stock: 35
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log(`${products.length} products added successfully`);

    await mongoose.connection.close();

    console.log("Database connection closed");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();