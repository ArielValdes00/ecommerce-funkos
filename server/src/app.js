import express from "express";
import productsRoutes from "./routes/products.routes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use(productsRoutes);

export default app;