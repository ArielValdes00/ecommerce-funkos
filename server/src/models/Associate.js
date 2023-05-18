import { User } from "./user.js";
import { Product } from "./product.js";

User.belongsToMany(Product, { through: "Cart", foreignKey: "userId" });
Product.belongsToMany(User, { through: "Cart", foreignKey: "productId" });
