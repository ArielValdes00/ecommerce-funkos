import { Router } from "express";
import { getCart, handlePurchase } from "../controllers/associate.controller.js";

const router = Router();

router.post("/api/purchase", handlePurchase);
router.get("/api/cart", getCart)

export default router;