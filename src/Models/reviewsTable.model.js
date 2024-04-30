import sequelize from "../Config/DatabaseConfig.js";
import { STRING, INTEGER } from "sequelize";

const reviewsTable = sequelize.define(
  "reviews",
  {
    reviewer_name: {
      type: String(50),
      allowNull: false,
    },
    rating: {
      type: INTEGER,
      allowNull: false,
    },
    review_title: {
      type: STRING(30),
    },
    review_detail: {
      type: STRING(200),
    },
  },
  { timestamps: false }
);

export default reviewsTable;
