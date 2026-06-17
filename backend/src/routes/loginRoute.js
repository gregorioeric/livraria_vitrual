import express from "express";
import authLoginContoller from "../controllers/authLoginContoller.js";

const loginRoute = express.Router();

loginRoute.post("/login", authLoginContoller.login);

export default loginRoute;
