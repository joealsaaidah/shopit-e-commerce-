import express from "express";
import {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

/* router.get("/products", getProducts);
router.get("/product/:id", getSingleProduct);

router.post("/admin/product/new", newProduct);
router.put("/admin/product/:id", updateProduct); */
router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);

router.route("/admin/product/new").post(newProduct);
router.route("/admin/product/:id").put(updateProduct).delete(deleteProduct);

export default router;
