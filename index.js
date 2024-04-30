import sequelize from "./src/Config/DatabaseConfig.js";
import app from "./src/app.js";

const port = 5000;

async function main() {
  try {
    await sequelize.sync();
    console.log("sync success");
    app.listen(port, () => {
      console.log(`server running on port:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
