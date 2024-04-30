import { INTEGER, STRING } from "sequelize";
import sequelize from "../Config/DatabaseConfig.js";

const otpsTable = sequelize.define(
  "otps",
  {
    code: {
      type: INTEGER,
      allowNull: false,
    },
    email: {
      type: STRING(50),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default otpsTable;
