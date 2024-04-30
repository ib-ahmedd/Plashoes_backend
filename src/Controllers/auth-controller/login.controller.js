import generateToken from "../../Helpers/generateToken.helper.js";
import usersTable from "../../Models/usersTable.model.js";
import bcrypt from "bcrypt";
import "dotenv/config.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = { email: email, password: password };

    const result = await usersTable.findOne({
      where: { email: email },
    });
    if (result) {
      const userInfo = result.toJSON();
      bcrypt.compare(password, userInfo.user_password, (err, result) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        }
        if (result) {
          const accessToken = generateToken(
            { user: user.email },
            process.env.ACCESS_TOKEN_SECRET
          );
          res.json({ userInfo, accessToken });
        } else {
          res.sendStatus(403);
        }
      });
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    console.log(err);
  }
};
export default login;
