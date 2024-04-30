import { Sequelize } from "sequelize";
import reviewsTable from "../../Models/reviewsTable.model.js";
import ordersTable from "../../Models/ordersTable.model.js";
import shoesTable from "../../Models/shoesTable.model.js";

const submitReview = async (req, res) => {
  try {
    const {
      product_id,
      user_id,
      reviewer_name,
      stars,
      review_title,
      review_detail,
      order_id,
    } = req.body;

    const response = await reviewsTable.create({
      product_id: product_id,
      user_id: user_id,
      reviewer_name: reviewer_name,
      rating: stars,
      review_title: review_title,
      review_detail: review_detail,
    });
    if (response) {
      const update = await ordersTable.update(
        { reviewed: "true" },
        {
          where: {
            id: order_id,
          },
        }
      );
      if (update[0] > 0) {
        res.sendStatus(201);
        const average = await reviewsTable.findOne({
          attributes: [
            [Sequelize.fn("avg", Sequelize.col("rating")), "rating"],
          ],
          where: {
            product_id: product_id,
          },
        });

        const { rating } = average.toJSON();
        const roundNo = Math.ceil(rating);
        await shoesTable.update(
          { rating: roundNo },
          {
            where: {
              id: product_id,
            },
          }
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
};
export default submitReview;
