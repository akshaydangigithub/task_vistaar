import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorResponse, successResponse } from "../middlewares/responses.js";

export const userRegister = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    switch (true) {
      case !userName:
        return errorResponse(res, "UserName is required", 400);
      case !email:
        return errorResponse(res, "Email is required", 400);
      case !password:
        return errorResponse(res, "Password is required", 400);
    }

    const existUser = await User.findOne({ email });

    if (existUser) {
      return errorResponse(res, "Email already exists", 400);
    }

    const exitUsername = await User.findOne({ userName });

    if (exitUsername) {
      return errorResponse(res, "Username already exists", 400);
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    if (!newUser) {
      return errorResponse(res, "User not created", 500);
    }

    return successResponse(res, "User created successfully !", newUser, 201);
  } catch (error) {
    return errorResponse(res, "Internal server error", 500, error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    switch (true) {
      case !email:
        return errorResponse(res, "Email is required", 400);
      case !password:
        return errorResponse(res, "Password is required", 400);
    }

    const user = await User.findOne({ email });

    if (!user) {
      return errorResponse(res, "Password or Email is incorrect", 400);
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return errorResponse(res, "Password or Email is incorrect", 400);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getUserByToken = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return errorResponse(res, "Invalid token", 400);
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return errorResponse(res, "User not found", 404);
    }

    return successResponse(res, "User found", user, 200);
  } catch (error) {
    return errorResponse(res, "Internal server error", 500, error);
  }
};
