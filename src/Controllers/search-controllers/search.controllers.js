import { Op } from "sequelize";
import shoesTable from "../../Models/shoesTable.model.js";
import capitalize from "../../Helpers/captalize.helper.js";

const search = async (req, res) => {
  try {
    const { key } = req.params;
    const searchKeys = capitalize(key);
    const [firstKey, secondKey] = searchKeys;
    const result = await shoesTable.findAll({
      attributes: ["id", "shoe_name", "image"],
      where: {
        shoe_name: {
          [Op.or]: [
            { [Op.like]: `%${firstKey}%` },
            { [Op.like]: `%${secondKey ? secondKey : "null"}%` },
          ],
        },
      },
      limit: 5,
    });
    const data = result.map((item) => item.toJSON());
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};
export default search;
