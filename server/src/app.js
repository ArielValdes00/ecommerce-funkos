import express from "express";
import productsRoutes from "./routes/products.routes.js";
import usersRoutes from "./routes/users.routes.js"
import cors from "cors";
import cookieParser from 'cookie-parser'

const app = express();

app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());


app.use(productsRoutes);
app.use(usersRoutes)

export default app;
