import jsonwebtoken from "jsonwebtoken";

const generateToken = (user, key) => {
  return jsonwebtoken.sign(user, key);
};

export default generateToken;
