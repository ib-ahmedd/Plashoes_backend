import sequelize from "../Config/DatabaseConfig.js";
import { NUMBER, BOOLEAN, INTEGER, DATEONLY, NOW, TEXT } from "sequelize";

const ordersTable = sequelize.define(
  "orders",
  {
    date_ordered: {
      type: DATEONLY,
      defaultValue: NOW,
      allowNull: false,
    },
    quantity: {
      type: INTEGER,
      allowNull: false,
    },
    totalprice: {
      type: NUMBER,
      allowNull: false,
    },
    order_status: {
      type: TEXT,
      allowNull: false,
    },
    reviewed: {
      type: BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false }
);

export default ordersTable;
