import sequelizeDateFormat from "../../Helpers/SequelizeDateFormat.helper.js";
import ordersTable from "../../Models/ordersTable.model.js";

const order = async (req, res) => {
  try {
    const { userId, orderProducts } = req.body;
    let completedCreate = 0;
    orderProducts.forEach(async (item) => {
      const randomNo = Math.floor(Math.random() * 2);
      console.log(randomNo);
      if (randomNo === 0) {
        await ordersTable.create({
          user_id: userId,
          product_id: item.product_id,
          quantity: item.quantity,
          totalprice: item.totalPrice,
          order_status: "Processing",
        });
      } else {
        await ordersTable.create({
          user_id: userId,
          product_id: item.product_id,
          quantity: item.quantity,
          totalprice: item.totalPrice,
          order_status: "Delivered",
          date_ordered: sequelizeDateFormat(),
        });
      }
      completedCreate = completedCreate + 1;
      if (completedCreate === orderProducts.length) {
        res.sendStatus(201);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
export default order;
