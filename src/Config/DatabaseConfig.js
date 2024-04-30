import { Sequelize } from "sequelize";

const sequelize = new Sequelize("plashoes", "postgres", "2819999551", {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

export default sequelize;
