import { User } from "./Users.js";
import { Product } from "./Products.js";

export const associateModels = () => {
    User.belongsToMany(Product, {
      through: "Cart",
      foreignKey: "userId",
      otherKey: "productId",
    });
    Product.belongsToMany(User, {
      through: "Cart",
      foreignKey: "productId",
      otherKey: "userId",
    });
  };
