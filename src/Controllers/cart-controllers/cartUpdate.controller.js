import cartsTable from "../../Models/cartsTable.model.js";

const cartUpdate = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { id } = req.params;
    await cartsTable.update({ quantity: quantity }, { where: { id: id } });
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
  }
};
export default cartUpdate;
