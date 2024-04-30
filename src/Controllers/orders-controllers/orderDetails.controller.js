import sequelize from "../../Config/DatabaseConfig.js";

const orderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sequelize.query(
      `SELECT orders.id, orders.quantity, orders.product_id, orders.date_ordered, orders.totalprice, orders.order_status, shoes.shoe_name, shoes.image, shoes.price, users.address, users.postal_code, users.country_code, users.mobile_no FROM orders JOIN shoes ON shoes.id = orders.product_id JOIN users ON users.id = orders.user_id WHERE orders.id = ${id}`
    );
    const data = result[0];
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};
export default orderDetails;
