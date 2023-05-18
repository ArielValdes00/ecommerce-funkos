import { Router } from "express";
import { createProducts, deleteProducts, generateUrl, getProduct, getProducts, redirect, updateProducts } from "../controllers/products.controller.js";
import upload from '../utils/multer.js';

const router = Router();

router.get("/api/products", getProducts);
router.post("/api/products", upload.single('image'), createProducts);
router.delete("/api/products/:id", deleteProducts)
router.put("/api/products/:id", updateProducts);
router.get("/api/products/:name", getProduct)
router.get("/auth/google", generateUrl);
router.get("/google/redirect", redirect);

export default router;
