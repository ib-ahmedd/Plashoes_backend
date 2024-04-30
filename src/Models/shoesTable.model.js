import sequelize from "../Config/DatabaseConfig.js";
import { NUMBER, STRING, BOOLEAN, INTEGER, DATEONLY, NOW } from "sequelize";
const shoesTable = sequelize.define(
  "shoes",
  {
    shoe_name: {
      type: STRING(30),
      allowNull: false,
    },
    price: {
      type: NUMBER,
      allowNull: false,
    },
    product_detail: {
      type: STRING(100),
    },
    description: {
      type: STRING(300),
    },
    image: {
      type: STRING(50),
      allowNull: false,
    },
    free_shipping: {
      type: BOOLEAN,
      allowNull: false,
    },
    categories: {
      type: STRING(50),
      allowNull: false,
    },
    sold: {
      type: INTEGER,
    },
    sale: {
      type: BOOLEAN,
      allowNull: false,
    },
    date_arrived: {
      type: DATEONLY,
      defaultValue: NOW,
      allowNull: false,
    },
    rating: {
      type: INTEGER,
      defaultValue: 0,
    },
    color: {
      type: STRING(10),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default shoesTable;
