import express from "express";
import EnderecoController from "../controllers/enderecoContoller.js";

const enderecoRouter = express.Router();

enderecoRouter.post("/", EnderecoController.createEndereco);

export default enderecoRouter;
