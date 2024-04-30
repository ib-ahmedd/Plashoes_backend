import { Op } from "sequelize";
import shoesTable from "../../Models/shoesTable.model.js";

const sortFilter = async (req, res) => {
  try {
    let column;
    let order;
    const { page, priceRange, sort, category, offset } = req.body;
    let where;

    if (category && category !== "Default") {
      if (page === "Men" || page === "Women") {
        where = {
          gender: page,
          price: {
            [Op.lt]: Math.ceil(priceRange),
          },
          categories: category,
        };
      } else if (page === "Sale") {
        where = {
          sale: true,
          price: {
            [Op.lt]: Math.ceil(priceRange),
          },
          categories: category,
        };
      } else {
        where = {
          price: {
            [Op.lt]: Math.ceil(priceRange),
          },
          categories: category,
        };
      }
    } else {
      if (page === "Men" || page === "Women") {
        where = {
          gender: page,
          price: {
            [Op.lt]: Math.ceil(priceRange),
          },
        };
      } else if (page === "Sale") {
        where = {
          sale: true,
          price: {
            [Op.lt]: Math.ceil(priceRange),
          },
        };
      } else {
        where = {
          price: {
            [Op.lt]: Math.ceil(priceRange),
          },
        };
      }
    }
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
      order: [[column, order]],
      offset: offset,
      limit: 12,
    });

    const count = await shoesTable.count({
      where,
    });
    const data = result.map((item) => item.toJSON());
    res.json({
      data,
      count,
    });
  } catch (err) {
    console.log(err);
  }
};
export default sortFilter;
