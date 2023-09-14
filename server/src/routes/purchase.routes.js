import { Router } from "express";
import { getAllSales, getMostSoldProducts, getUserPurchaseHistory, handlePurchase } from "../controllers/associate.controller.js";

const router = Router();

router.post("/api/purchase", handlePurchase);
router.post("/api/getUserPurchaseHistory", getUserPurchaseHistory);
router.get("/api/getMostSoldProducts", getMostSoldProducts);
router.get("/api/getAllSales", getAllSales);


export default router;