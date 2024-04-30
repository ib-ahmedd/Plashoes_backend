import cartsTable from "../../Models/cartsTable.model.js";

const cartEmpty = async (req, res) => {
  try {
    const { id } = req.params;
    await cartsTable.destroy({
      where: {
        user_id: id,
      },
    });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};
export default cartEmpty;
