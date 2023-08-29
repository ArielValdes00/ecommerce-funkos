import { Router } from "express";
import { getUserPurchaseHistory, handlePurchase } from "../controllers/associate.controller.js";

const router = Router();

router.post("/api/purchase", handlePurchase);
router.post("/api/getUserPurchaseHistory", getUserPurchaseHistory);


export default router;