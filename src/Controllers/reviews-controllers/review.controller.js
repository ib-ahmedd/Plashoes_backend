import shoesTable from "../../Models/shoesTable.model.js";

const review = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await shoesTable.findOne({
      attributes: ["shoe_name", "image"],
      where: {
        id: id,
      },
    });
    const data = response.toJSON();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};
export default review;
