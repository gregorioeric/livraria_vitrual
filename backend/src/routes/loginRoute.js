import express from "express";
import AuthLoginController from "../controllers/authLoginController.js";

const loginRoute = express.Router();

loginRoute.post("/login", AuthLoginController.login);
loginRoute.post("/logout", AuthLoginController.logout);
loginRoute.post("/refresh", AuthLoginController.refreshToken);

export default loginRoute;
