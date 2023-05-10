import { Router } from "express";
import { createProducts, deleteProducts, getProduct, getProducts, updateProducts } from "../controllers/products.controller.js";

const router = Router();

router.get("/api/products", getProducts);
router.post("/api/products", createProducts);
router.delete("/api/products/:id", deleteProducts)
router.get("/api/products/:id", getProduct);
router.put("/api/products/:id", updateProducts);

export default router;
