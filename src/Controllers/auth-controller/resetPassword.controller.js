import usersTable from "../../Models/usersTable.model.js";
import bcrypt from "bcrypt";

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const response = await usersTable.update(
      { user_password: hashedPassword },
      { where: { email: email } }
    );
    if (response[0] > 0) {
      res.sendStatus(201);
    }
  } catch (err) {
    console.log(err);
  }
};
export default resetPassword;
