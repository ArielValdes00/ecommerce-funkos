import { Router } from "express";
import { getMostSoldProducts, getUserPurchaseHistory, handlePurchase } from "../controllers/associate.controller.js";

const router = Router();

router.post("/api/purchase", handlePurchase);
router.post("/api/getUserPurchaseHistory", getUserPurchaseHistory);
router.get("/api/getMostSoldProducts", getMostSoldProducts);


export default router;