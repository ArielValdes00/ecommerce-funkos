import { Router } from "express";
import { createProducts, deleteProducts, getProduct, getProducts, updateProducts } from "../controllers/products.controller.js";

const router = Router();

router.get("/dashboard/products", getProducts);
router.post("/dashboard/products", createProducts);
router.delete("/dashboard/products/:id", deleteProducts)
router.get("/dashboard/products/:id", getProduct);
router.put("/dashboard/products/:id", updateProducts);

export default router;
