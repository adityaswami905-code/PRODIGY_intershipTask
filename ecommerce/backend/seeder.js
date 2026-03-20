const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const products = [
  {
    name: "iPhone 14 Pro",
    price: 129999,
    image: "https://images.unsplash.com/photo-1661961112956-1a0a5a64b7a1",
    description: "Apple flagship smartphone with A16 chip",
    category: "Electronics",
    stock: 10,
  },
  {
    name: "Nike Air Max",
    price: 8999,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
    description: "Comfortable running shoes",
    category: "Footwear",
    stock: 25,
  },
  {
    name: "MacBook Pro M2",
    price: 199999,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    description: "Powerful laptop for developers",
    category: "Electronics",
    stock: 5,
  },
  {
    name: "Samsung Smart TV",
    price: 54999,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1",
    description: "4K UHD Smart Television",
    category: "Electronics",
    stock: 8,
  },
  {
    name: "Adidas Sneakers",
    price: 4999,
    image: "https://images.unsplash.com/photo-1582582429416-0c06d68a0e6c",
    description: "Stylish casual shoes",
    category: "Footwear",
    stock: 20,
  },
  {
    name: "Leather Jacket",
    price: 6999,
    image: "https://images.unsplash.com/photo-1520975922203-bb2a8f6c58c0",
    description: "Premium quality leather jacket",
    category: "Fashion",
    stock: 12,
  },
  {
    name: "Gaming Mouse",
    price: 1999,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7",
    description: "RGB gaming mouse",
    category: "Electronics",
    stock: 30,
  },
  {
    name: "Bluetooth Headphones",
    price: 2999,
    image: "https://images.unsplash.com/photo-1585386959984-a4155223f3be",
    description: "Wireless headphones with bass",
    category: "Electronics",
    stock: 18,
  },
  {
    name: "Denim Jeans",
    price: 2499,
    image: "https://images.unsplash.com/photo-1583005516414-2a1f2f16c1b3",
    description: "Slim fit denim jeans",
    category: "Fashion",
    stock: 15,
  },
  {
    name: "Smart Watch",
    price: 5999,
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
    description: "Fitness tracking smartwatch",
    category: "Electronics",
    stock: 22,
  }
];

//  Import Data
const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);

    console.log(" Data Imported Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

//  Delete Data
const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log(" Data Deleted");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Run command
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}