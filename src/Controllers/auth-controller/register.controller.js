import generateToken from "../../Helpers/generateToken.helper.js";
import usersTable from "../../Models/usersTable.model.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  try {
    const {
      fname,
      lname,
      email,
      password,
      code,
      phone,
      gender,
      country,
      postalcode,
      address,
      DOB,
    } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const response = await usersTable.create({
      user_name: fname + " " + lname,
      email: email,
      user_password: hashedPassword,
      mobile_no: phone,
      date_of_birth: DOB,
      gender: gender,
      country: country,
      postal_code: postalcode,
      address: address,
      country_code: code,
    });
    if (response) {
      const data = response.toJSON();
      const accessToken = generateToken(
        { user: email },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({ userInfo: data, accessToken });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
};
export default register;
