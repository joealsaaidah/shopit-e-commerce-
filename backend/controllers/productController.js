import Product from "../models/product.js";

// Create a new Product => /api/v1/produc/new
export const newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

// fetch all products live in the database => api/v1/products
export const getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
};
