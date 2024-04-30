import sendMail from "../../Helpers/sendMail.helper.js";

const contactMessage = async (req, res) => {
  try {
    const { contactName, contactEmail, contactMessage } = req.body;
    const recievingEmail = "ahmedibrahim28199@gmail.com";
    const messageSubject = "Customer feedback";

    const message = `name: ${contactName}, email: ${contactEmail}, message: ${contactMessage}`;
    await sendMail(recievingEmail, messageSubject, message);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};
export default contactMessage;
