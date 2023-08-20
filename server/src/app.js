import express from "express";
import productsRoutes from "./routes/products.routes.js";
import usersRoutes from "./routes/users.routes.js"
import purchaseRoutes from "./routes/purchase.routes.js"
import cors from "cors";
import cookieParser from 'cookie-parser'
import { associateModels } from "./models/Associate.js";

const app = express();

app.use(cookieParser());

app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json());

associateModels(); 

app.use(purchaseRoutes)
app.use(productsRoutes);
app.use(usersRoutes)
app.get('/', function (req, res) {
    res.send('Hello World!')
  })

export default app;
