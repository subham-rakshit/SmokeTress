import express from "express";
import { saveUserDetails } from "../controller/user.js";

export const userRouter = express.Router();

userRouter.route("/submitDetails").post(saveUserDetails);
