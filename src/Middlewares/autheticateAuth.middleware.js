import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";

const authenticateAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  jsonwebtoken.verify(token, process.env.AUTH_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};
export default authenticateAuth;
