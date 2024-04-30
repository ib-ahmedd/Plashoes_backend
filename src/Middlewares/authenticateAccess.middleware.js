import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";

const authenticateAccess = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null) return res.sendStatus(401);

    jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } catch (err) {
    console.log(err);
  }
};
export default authenticateAccess;
