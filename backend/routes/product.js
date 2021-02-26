import express from "express";
import {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);

router.route("/admin/product/new").post(isAuthenticated, newProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticated, updateProduct)
  .delete(isAuthenticated, deleteProduct);

export default router;
