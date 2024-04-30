import sequelize from "../Config/DatabaseConfig.js";
import { INTEGER } from "sequelize";

const cartsTable = sequelize.define(
  "carts",
  {
    quantity: {
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default cartsTable;
