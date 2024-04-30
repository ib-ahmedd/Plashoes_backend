import { Op } from "sequelize";
import otpsTable from "../../Models/otpsTable.model.js";
import generateToken from "../../Helpers/generateToken.helper.js";
import "dotenv/config";

const verifyOtp = async (req, res) => {
  try {
    const { email, code } = req.body;
    const response = await otpsTable.findOne({
      where: {
        [Op.and]: [{ email: email }, { code: code }],
      },
    });
    if (response) {
      const authToken = generateToken(
        { email: email },
        process.env.AUTH_TOKEN_SECRET
      );
      otpsTable.destroy({ where: { email: email } });
      res.json(authToken);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
  }
};
export default verifyOtp;
