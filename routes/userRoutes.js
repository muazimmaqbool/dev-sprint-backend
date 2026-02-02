import express from "express";
import { login, register } from "../controllers/userController.js";

const userRouter = express.Router();

//used to add new user
userRouter.post("/register", register);

//route used for login
userRouter.post("/login", login);

export default userRouter;
