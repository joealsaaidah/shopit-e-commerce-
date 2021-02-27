import express from "express";
import {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
} from "../controllers/productController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

router.route("/products").get(isAuthenticatedUser, getProducts);
router.route("/product/:id").get(getSingleProduct);

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/review").put(isAuthenticatedUser, createProductReview);
export default router;

router.route("/reviews").get(isAuthenticatedUser, getProductReviews);
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);
