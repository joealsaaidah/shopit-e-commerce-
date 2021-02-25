import express from "express";
import { getProducts, newProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getProducts);
router.post("/product/new", newProduct);

export default router;
