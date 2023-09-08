import app from "./app.js";
import { sequelize } from "./database/database.js";
import dotenv from 'dotenv';
dotenv.config()

async function main() {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully!');

        await sequelize.sync();
        app.listen(process.env.PORT);
        console.log(`server is listening on port ${process.env.PORT}`);
    } catch (error) {
        console.log(error)
    }
}
main();