import sequelize from "../../Config/DatabaseConfig.js";

const cart = async (req, res) => {
  try {
    const { id } = req.params;

    if (id !== "undefined") {
      const result = await sequelize.query(
        `SELECT carts.id, carts.product_id, shoe_name, image, quantity, price FROM shoes JOIN carts ON shoes.id = carts.product_id WHERE carts.user_id = ${id}`
      );
      const data = result[0];
      res.json({ data });
    } else {
      res.end();
    }
  } catch (err) {
    console.log(err);
  }
};
export default cart;
