import express from "express";
import userController from "../controllers/userController.js";
import validateUser from "../middlewares/validateUser.js";

const userRouter = express.Router();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/user_id/:user_id", userController.getUserById);
userRouter.get("/email/:user_email", userController.getUserByEmail);
userRouter.post("/", validateUser, userController.createUser);
userRouter.put("/:user_id", validateUser, userController.updateUser);
userRouter.delete("/:user_id", userController.deleteUser);

export default userRouter;
