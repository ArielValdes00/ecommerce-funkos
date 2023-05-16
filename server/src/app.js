import express from "express";
import productsRoutes from "./routes/products.routes.js";
import cors from "cors";
import session from 'express-session';
import cookieParser from 'cookie-parser'


const app = express();

// Usar cookie-parser como middleware
app.use(cookieParser());



app.use(cors());
app.use(express.json());

app.use(session({
    secret: 'bTKqxNj#NzaXU~zCQx3W8b_7%kxJ-t4u',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Si está utilizando HTTPS, debe cambiar esto a true
}));

app.use(productsRoutes);

export default app;
