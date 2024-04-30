import { Op, Sequelize } from "sequelize";
import shoesTable from "../../Models/shoesTable.model.js";
import capitalize from "../../Helpers/captalize.helper.js";

const advancedSearch = async (req, res) => {
  try {
    let gender;
    let category;
    let color;
    let column;
    let order;
    let where;
    const { keywords, sort, offset, filterCategory, priceRange } = req.body;
    const fullKey = keywords.toLowerCase();
    const [firstKey, secondKey] = capitalize(fullKey);

    switch (sort) {
      case "popularity":
        column = "sold";
        order = "DESC";
        break;
      case "average rating":
        column = "rating";
        order = "DESC";
        break;
      case "latest":
        column = "date_arrived";
        order = "DESC";
        break;
      case "price: low to high":
        column = "price";
        order = "ASC";
        break;
      case "price: high to low":
        column = "price";
        order = "DESC";
        break;
      case "Default sorting":
        column = "id";
        order = "ASC";
    }

    const categoryQuery = await shoesTable.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("categories")), "categories"],
      ],
    });
    const categoriesArray = categoryQuery.map((item) => item.toJSON());

    categoriesArray.forEach((item) => {
      const cat = item.categories;
      if (fullKey.includes(cat.toLowerCase())) {
        category = item.categories;
      }
    });

    const colorsQuery = await shoesTable.findAll({
      attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("color")), "color"]],
    });
    const colorsArray = colorsQuery.map((item) => item.toJSON());

    colorsArray.forEach((item) => {
      if (fullKey.includes(item.color)) {
        color = item.color;
      }
    });

    if (fullKey.includes("men") && !fullKey.includes("women")) {
      gender = "Men";
    } else if (fullKey.includes("women")) {
      gender = "Women";
    }

    if (gender && category && color) {
      where = {
        [Op.and]: [
          { gender: gender },
          { categories: category },
          { color: color },
        ],
      };
    } else if (gender && category && !color) {
      where = {
        [Op.and]: [{ gender: gender }, { categories: category }],
      };
    } else if (gender && color && !category) {
      where = {
        [Op.and]: [{ gender: gender }, { color: color }],
      };
    } else if (category && color && !gender) {
      where = {
        [Op.and]: [{ categories: category }, { color: color }],
      };
    } else if (gender && !category && !color) {
      where = { gender: gender };
    } else if (category && !gender && !color) {
      where = {
        categories: category,
      };
    } else if (color && !gender && !category) {
      where = {
        color: color,
      };
    } else {
      where = {
        shoe_name: {
          [Op.like]: secondKey ? `%${firstKey} ${secondKey}%` : `%${firstKey}%`,
        },
      };
    }

    if (where) {
      console.log(offset);
      const resultQuery = await shoesTable.findAll({
        attributes: [
          "id",
          ["shoe_name", "shoename"],
          "image",
          "price",
          "sale",
          "rating",
        ],
        where: where,
        order: [[column, order]],
        offset: offset,
        limit: 12,
      });
      const count = await shoesTable.count({
        where,
      });

      const data = resultQuery.map((item) => item.toJSON());
      res.json({ data, count });
    } else {
      res.json({ productsArray: [], count: 0 });
    }
  } catch (err) {
    console.log(err);
  }
};
export default advancedSearch;
