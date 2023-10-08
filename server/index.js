import { sequelize } from "./src/database/database.js";
import dotenv from 'dotenv';
import express from "express";
import productsRoutes from "./src/routes/products.routes.js";
import usersRoutes from "./src/routes/users.routes.js"
import purchaseRoutes from "./src/routes/purchase.routes.js"
import cors from "cors";
import cookieParser from 'cookie-parser'
import { associateModels } from "./src/models/Associate.js";
dotenv.config();

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


const port = process.env.PORT || 5000

async function main() {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully!');

        await sequelize.sync();
        app.listen(process.env.PORT);
        console.log(`server is listening on port ${port}`);
    } catch (error) {
        console.log(error)
    }
}
main();