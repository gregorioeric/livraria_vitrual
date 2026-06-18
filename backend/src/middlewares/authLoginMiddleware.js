import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticationToken = (req, res, next) => {
  const getToken = req.headers.authorization;
  console.log(getToken);

  const bearerToken = getToken.split(" ")[1];

  if (!bearerToken) {
    return res.status(401).json({
      error: "Token não fornecido!",
    });
  }

  jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({
        error: "Token inválio!",
      });
    }

    req.user = user;
    next();
  });
};
