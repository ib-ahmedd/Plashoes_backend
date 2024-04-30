import shoesTable from "../../Models/shoesTable.model.js";

const sale = async (req, res) => {
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
      where: {
        sale: "true",
      },
      limit: 6,
    });
    const data = result.map((item) => item.toJSON());
    res.json({ data });
  } catch (err) {
    console.log(err);
  }
};
export default sale;
