import sendMail from "../../Helpers/sendMail.helper.js";
import otpsTable from "../../Models/otpsTable.model.js";
import usersTable from "../../Models/usersTable.model.js";

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const response = await usersTable.findOne({ where: { email: email } });
    if (response) {
      const otp = Math.floor(Math.random() * 10000);
      await otpsTable.destroy({ where: { email: email } });
      await otpsTable.create({ code: otp, email: email });
      const subject = "Password reset";
      const message = `Use the code ${otp} to continue password reset`;
      await sendMail(email, subject, message);
      res.sendStatus(201);
    }
  } catch (err) {
    console.log(err);
  }
};
export default forgotPassword;
