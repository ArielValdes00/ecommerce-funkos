import { Router } from "express";
import { createProducts, deleteProducts, getProduct, getProducts, updateProducts } from "../controllers/products.controller.js";
import upload from '../utils/multer.js';

const router = Router();

router.get("/api/products", getProducts);
router.post("/api/products", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'boxImage', maxCount: 1 }]), createProducts);
router.delete("/api/products/:id", deleteProducts)
router.put("/api/products/:id", updateProducts);
router.get("/api/products/:name", getProduct)

export default router;
