import sequelize from "../../Config/DatabaseConfig.js";

const pendingReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sequelize.query(
      `SELECT orders.id, orders.product_id, orders.date_ordered, orders.date_delivered, shoes.shoe_name, shoes.image FROM orders JOIN shoes ON shoes.id = orders.product_id WHERE orders.user_id = ${id} AND orders.order_status = 'Delivered' AND reviewed = false ORDER BY orders.id DESC`
    );
    const data = result[0];
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};
export default pendingReviews;
