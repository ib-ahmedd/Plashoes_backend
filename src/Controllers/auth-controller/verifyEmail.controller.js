import sendMail from "../../Helpers/sendMail.helper.js";
import otpsTable from "../../Models/otpsTable.model.js";
import usersTable from "../../Models/usersTable.model.js";

const verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await usersTable.findOne({
      attributes: ["email"],
      where: { email: email },
    });
    if (result) {
      res.sendStatus(409);
    } else {
      const otp = Math.floor(Math.random() * 10000);
      await otpsTable.create({
        code: otp,
        email: email,
      });
      const message = `use the code ${otp} to continue your registration`;
      const subject = "Plashoes verify Email";
      await sendMail(email, subject, message);
      res.sendStatus(201);
    }
  } catch (err) {
    console.log(err);
  }
};
export default verifyEmail;
