import cartsTable from "../../Models/cartsTable.model.js";

const cartDelete = async (req, res) => {
  try {
    const { id } = req.params;
    cartsTable.destroy({
      where: {
        id: id,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
  }
};
export default cartDelete;
