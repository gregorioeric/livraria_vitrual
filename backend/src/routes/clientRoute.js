import express from "express";
import clientController from "../controllers/clientController.js";
import validateClient from "../middlewares/validateClient.js";

const clientRoute = express.Router();

clientRoute.get("/", clientController.selectAllClients);
clientRoute.get("/id_cliente/:id", clientController.selectClientById);
clientRoute.get("/email/:email", clientController.selectClientByEmail);
clientRoute.post("/", validateClient, clientController.createClient);
clientRoute.put("/:id", validateClient, clientController.updateClient);
clientRoute.delete("/:id", clientController.deleteClient);

export default clientRoute;
