const Product = require("../models/Product");

//  Add product (admin)
const createProduct = async (req, res) => {
  const { name, description, price, image, category, stock } = req.body;

  const product = await Product.create({
    name,
    description,
    price,
    image,
    category,
    stock,
  });

  res.json(product);
};

//  Get all products
const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

//  Get single product
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

//  Update product
const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    Object.assign(product, req.body);
    const updated = await product.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

//  Delete product
const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};