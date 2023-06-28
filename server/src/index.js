import app from "./app.js";
import { sequelize } from "./database/database.js";
import { PORT } from './config.js';

async function main() {
    try {
        await sequelize.sync()
        app.listen(PORT);
        console.log(`server is listening on port ${PORT}`);
    } catch (error) {
        console.log(error)
    }
}
main();