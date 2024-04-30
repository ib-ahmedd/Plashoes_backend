import sequelize from "../../Config/DatabaseConfig.js";

const userOrders = async (req, res) => {
  try {
    const { id } = req.params;
    if (id !== "undefined") {
      const result = await sequelize.query(
        `SELECT orders.id, orders.product_id, orders.date_ordered, orders.totalprice, orders.order_status, shoe_name, image, quantity FROM shoes JOIN orders ON shoes.id = orders.product_id WHERE orders.user_id = ${id} ORDER BY orders.id DESC`
      );
      const data = result[0];
      res.json(data);
    }
  } catch (err) {
    console.log(err);
  }
};
export default userOrders;
