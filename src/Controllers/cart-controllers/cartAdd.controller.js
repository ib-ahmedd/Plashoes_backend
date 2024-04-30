import { Op } from "sequelize";
import cartsTable from "../../Models/cartsTable.model.js";

const cartAdd = async (req, res) => {
  try {
    const { productId, userId, quantity } = req.body;
    const foundProduct = await cartsTable.findOne({
      where: {
        [Op.and]: { user_id: userId, product_id: productId },
      },
    });
    if (foundProduct) {
      const { quantity: foundQuantity } = foundProduct.toJSON();
      await cartsTable.update(
        { quantity: quantity + foundQuantity },
        { where: { [Op.and]: { user_id: userId, product_id: productId } } }
      );
      res.sendStatus(201);
    } else {
      await cartsTable.create({
        quantity: quantity,
        user_id: userId,
        product_id: productId,
      });
      res.sendStatus(201);
    }
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
};
export default cartAdd;
