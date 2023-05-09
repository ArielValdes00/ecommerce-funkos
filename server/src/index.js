import app from "./app.js";
import { sequelize } from "./database/database.js";

async function main() {
    try {
        await sequelize.sync()
        console.log("database conected");
        app.listen(3000);
        console.log("server is listening on port 3000");
    } catch (error) {
        console.log("error")
    }
}
main();