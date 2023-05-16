import { Router } from "express";
import { createProducts, deleteProducts, getProduct, getProducts } from "../controllers/products.controller.js";
import {uploadImage} from "../controllers/googleDrive.js"
import multer from "multer";
import { checkAuth } from "../middleware/auth.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.get("/api/products", checkAuth, getProducts);
router.post("/api/products", checkAuth, createProducts);
router.post("/", checkAuth, upload.single("image"), createProducts);
router.delete("/api/products/:id", checkAuth, deleteProducts)
router.get("/api/products/:id", checkAuth, getProduct);
router.post("/api/upload", checkAuth, upload.single("image"), uploadImage);


export default router;
