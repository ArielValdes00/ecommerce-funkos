import { Router } from "express";
import { handlePurchase } from "../controllers/associate.controller.js";

const router = Router();

router.post("/api/purchase", handlePurchase);

export default router;