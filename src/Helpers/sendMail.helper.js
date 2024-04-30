import { createTransport } from "nodemailer";
import "dotenv/config";

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "ahmed1768476@gmail.com",
    pass: process.env.GOOGLE_PASS,
  },
});

const sendMail = async (recievingEmail, subject, message) => {
  try {
    const mailOptions = {
      from: "ahmed1768476@gmail.com",
      to: recievingEmail,
      subject: subject,
      text: message,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Message sent: %s", info.messageId);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
export default sendMail;
