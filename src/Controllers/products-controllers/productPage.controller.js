import { Sequelize } from "sequelize";
import shoesTable from "../../Models/shoesTable.model.js";
import sequelize from "../../Config/DatabaseConfig.js";

const productPage = async (req, res) => {
  try {
    let where = {};
    const page = req.params["page"];
    if (page === "Men" || page === "Women") {
      where = {
        gender: page,
      };
    } else if (page === "Sale") {
      where = {
        sale: true,
      };
    }
    const result = await shoesTable.findAll({
      attributes: [
        "id",
        ["shoe_name", "shoename"],
        "image",
        "price",
        "sale",
        "rating",
      ],
      where,
      limit: 12,
      order: sequelize.random(),
    });

    const count = await shoesTable.count({
      where,
    });
    const data = result.map((item) => item.toJSON());

    const categories = await shoesTable.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("categories")), "categories"],
      ],
      where,
    });
    const categoriesData = categories.map((item) => item.toJSON());

    const maxPrice = await shoesTable.max("price", { where: where });
    const minPrice = await shoesTable.min("price", { where: where });

    res.json({
      data,
      categoriesData,
      count,
      range: { maxPrice: maxPrice, minPrice: minPrice },
    });
  } catch (err) {
    console.log(err);
  }
};
export default productPage;
