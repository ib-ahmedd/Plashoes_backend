import { Op } from "sequelize";
import shoesTable from "../../Models/shoesTable.model.js";
import reviewsTable from "../../Models/reviewsTable.model.js";
import sequelize from "../../Config/DatabaseConfig.js";

const product = async (req, res) => {
  try {
    const shoeId = req.params["id"];
    const singleResult = await shoesTable.findOne({
      attributes: [
        "id",
        ["shoe_name", "shoename"],
        "price",
        "image",
        "free_shipping",
        "categories",
        "sale",
        "rating",
        "gender",
        "product_detail",
        "description",
      ],
      where: {
        id: shoeId,
      },
    });

    const singleShoe = singleResult.toJSON();
    if (!singleShoe.product_detail) {
      singleShoe.product_detail =
        "Auctor eros suspendisse tellus venenatis sodales purus non pellentesque amet, nunc sit eu, enim fringilla egestas pulvinar odio feugiat consectetur egestas magna pharetra cursus risus, lectus enim eget eu et lobortis faucibus.";
      singleShoe.description =
        "Auctor eros suspendisse tellus venenatis sodales purus non pellentesque amet, nunc sit eu, enim fringilla egestas pulvinar odio feugiat consectetur egestas magna pharetra cursus risus, lectus enim eget eu et lobortis faucibus. + Eget odio justo ut scelerisque purus non aliquam adipiscing amet condimentum ligula diam erat sodales pharetra accumsan pellentesque at sem at eget ac hendrerit odio enim felis sit augue lorem egestas dictum vestibulum a etiam nisi, elit augue volutpat porta scelerisque nullam at leo faucibus cursus metus. + Viverra nunc iaculis id sed diam nam quam id sapien pellentesque quam sed eu augue id ac tempus aliquam facilisis vivamus eget nisi id.";
    }

    const manyResult = await shoesTable.findAll({
      attributes: [
        "id",
        ["shoe_name", "shoename"],
        "price",
        "image",
        "sale",
        "rating",
      ],
      where: {
        categories: singleShoe.categories,
        id: { [Op.ne]: shoeId },
        gender: singleShoe.gender,
      },
      limit: 6,
    });

    const manyShoes = manyResult.map((item) => item.toJSON());

    const reviews = await reviewsTable.findAll({
      attributes: [
        "id",
        "user_id",
        "rating",
        "reviewer_name",
        "review_title",
        "review_detail",
        "review_date",
      ],
      where: {
        [Op.and]: [
          { product_id: shoeId },
          { review_title: { [Op.not]: "" } },
          { review_detail: { [Op.not]: "" } },
        ],
      },
      order: sequelize.random(),
      limit: 5,
    });

    const comments = reviews.map((item) => item.toJSON());

    res.json({ data: [singleShoe, manyShoes, comments] });
  } catch (err) {
    console.log(err);
  }
};
export default product;
