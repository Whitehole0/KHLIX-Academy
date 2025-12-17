import User from "../model/User.model.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

// ---------------- REGISTER ----------------

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing information" });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ name, email, password });

  const { accessToken, refreshToken } = generateToken(user._id);

  // Save refresh token in DB
  user.refreshToken = refreshToken;
  await user.save();

  // Cookies
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    message: "Account created successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

// ---------------- LOGIN ----------------       

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Missing credentials" });

  const user = await User.findOne({ email }).select("+password");
  if (!user) return res.status(401).json({ message: "User not found" });

  const match = await user.matchPassword(password);
  if (!match) return res.status(401).json({ message: "Invalid password" });

  const { accessToken, refreshToken } = generateToken(user._id);

  // Save refresh token
  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    user: {
      id: user._id,
      email: user.email,
    },
  });
});

// ---------------- LOGOUT ----------------

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.json({
    success: true,
    message: "Logged out successfully",
  });
});

// ---------------- GET ME ----------------

export const getMe = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

// ---------------- REFRESH TOKEN ----------------

export const refreshTokenController = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token" });

  // Find user with this refresh token
  const user = await User.findOne({ refreshToken });

  if (!user) return res.status(403).json({ message: "Invalid refresh token" });

  // Verify token
  const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

  const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.json({ success: true, message: "Access token refreshed" });
});
