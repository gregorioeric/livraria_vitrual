import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import uploadController from "../controllers/uploadController.js";

const uploadRoute = express.Router();

uploadRoute.post("/", upload.single("image"), uploadController.uploadImage);

export default uploadRoute;
