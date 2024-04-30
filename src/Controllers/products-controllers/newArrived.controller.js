import shoesTable from "../../Models/shoesTable.model.js";

const newArrived = async (req, res) => {
  try {
    const result = await shoesTable.findAll({
      attributes: [
        "id",
        ["shoe_name", "shoename"],
        "image",
        "price",
        "sale",
        "rating",
      ],
      order: [["date_arrived", "desc"]],
      limit: 9,
    });
    const data = result.map((item) => item.toJSON());
    res.json({ data });
  } catch (err) {
    console.log(err);
  }
};
export default newArrived;
