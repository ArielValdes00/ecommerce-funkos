import express from "express";
import productsRoutes from "./routes/products.routes.js";
import cors from "cors";
import cookieParser from 'cookie-parser'


const app = express();

// Usar cookie-parser como middleware
app.use(cookieParser());



app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());


app.use(productsRoutes);

export default app;
