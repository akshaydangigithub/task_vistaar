import express from "express";
import {
  userRegister,
  loginUser,
  getUserByToken,
} from "../controller/userController.js";
import { isUser } from "../middlewares/isUser.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("User Route");
});

router.post("/signup", userRegister);

router.post("/login", loginUser);

router.get("/getUserInfo", getUserByToken);

export default router;
