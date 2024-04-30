import sequelize from "../Config/DatabaseConfig.js";
import { NUMBER, STRING, INTEGER, TEXT, DATEONLY } from "sequelize";
import shoesTable from "./shoesTable.model.js";
import reviewsTable from "./reviewsTable.model.js";
import ordersTable from "./ordersTable.model.js";
import cartsTable from "./cartsTable.model.js";

const usersTable = sequelize.define(
  "users",
  {
    user_name: {
      type: STRING(50),
      allowNull: false,
    },
    email: {
      type: STRING(30),
      allowNull: false,
    },
    user_password: {
      type: TEXT,
      allowNull: false,
    },
    mobile_no: {
      type: NUMBER,
      allowNull: false,
    },
    date_of_birth: {
      type: DATEONLY,
      allowNull: false,
    },
    gender: {
      type: STRING(6),
      allowNull: false,
    },
    country: {
      type: TEXT,
      allowNull: false,
    },
    postal_code: {
      type: INTEGER,
      allowNull: false,
    },
    address: {
      type: STRING(100),
      allowNull: false,
    },
    country_code: {
      type: STRING(10),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

usersTable.belongsToMany(shoesTable, {
  through: reviewsTable,
  foreignKey: "user_id",
});

shoesTable.belongsToMany(usersTable, {
  through: reviewsTable,
  foreignKey: "product_id",
});

shoesTable.belongsToMany(usersTable, {
  through: ordersTable,
  foreignKey: "product_id",
});
usersTable.belongsToMany(shoesTable, {
  through: ordersTable,
  foreignKey: "user_id",
});

shoesTable.belongsToMany(usersTable, {
  through: cartsTable,
  foreignKey: "product_id",
});
usersTable.belongsToMany(shoesTable, {
  through: cartsTable,
  foreignKey: "user_id",
});

export default usersTable;
