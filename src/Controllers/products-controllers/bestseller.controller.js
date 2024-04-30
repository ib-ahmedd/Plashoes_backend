import shoesTable from "../../Models/shoesTable.model.js";

const bestsellers = async (req, res) => {
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
      order: [["sold", "desc"]],
      limit: 6,
    });
    const data = result.map((item) => item.toJSON());
    res.json({ data });
  } catch (err) {
    console.log(err);
  }
};
export default bestsellers;
