import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const isUser = async (req, res, next) => {
  try {
    var authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(400).json({
        success: false,
        message: "Authorization required !",
      });
    }

    var token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(400).json({
        success: false,
        message: "Authorization failed !",
      });
    } else {
      const user = await User.findById(decode.id);

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Authorization failed !",
        });
      } else {
        (req.user = user), (req.token = token);

        next();
      }
    }
  } catch (error) {
    if (error === "JsonWebTokenError") {
      return res.status(400).json({
        success: false,
        message: "invalid token",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Your token is expired or invalid",
        error,
      });
    }
  }
};
