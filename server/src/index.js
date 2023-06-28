import app from "./app.js";
import { sequelize } from "./database/database.js";
import { PORT } from './config.js';

async function main() {
    try {
        await sequelize.sync()
        app.listen('https://ecommerce-funkos-9nrur4xy2-arielvaldes00.vercel.app/');
        console.log(`server is listening on port ${PORT}`);
    } catch (error) {
        console.log(error)
    }
}
main();