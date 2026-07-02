import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticationToken = (req, res, next) => {
  const getToken = req.headers.authorization;

  // Verificar se o token foi fornecido
  if (!getToken) {
    return res.status(401).json({
      error: "Token não fornecido!",
    });
  }

  // Extrair o token (remover o "Bearer ")
  const bearerToken = getToken.split(" ")[1];

  // Verificar se o token foi realmente extraído
  if (!bearerToken) {
    return res.status(401).json({
      error: "Token mal formatado!",
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

export const adminRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: "Usuário não autenticado!",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Você não tem permissão para realizar esta ação!",
      });
    }
    next();
  };
};
