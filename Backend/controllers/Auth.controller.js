import asyncHandler from "express-async-handler";
import Session from "../models/Session.model.js";
import User from "../models/User.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
import { verifyRefreshToken } from "../utils/verifyTokens.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password });

  // Create session
  const session = await Session.create({
    user: user._id,
    refreshToken: "temp",
    userAgent: req.headers["user-agent"],
    ip: req.ip,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  const refreshToken = generateRefreshToken(session._id);
  session.refreshToken = refreshToken;
  await session.save();

  const accessToken = generateAccessToken(user);

  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    message: "Account created",
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) return res.status(404).json({ message: "User not found" });

  const match = await user.matchPassword(password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  // Create session
  const session = await Session.create({
    user: user._id,
    refreshToken: "temp",
    userAgent: req.headers["user-agent"],
    ip: req.ip,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  const refreshToken = generateRefreshToken(session._id);
  session.refreshToken = refreshToken;
  await session.save();

  const accessToken = generateAccessToken(user);

  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    message: "Logged in",
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

export const refresh = asyncHandler(async (req, res) => {
  const oldRefresh = req.cookies.refreshToken;
  if (!oldRefresh) return res.status(401).json({ message: "No refresh token" });

  const decoded = verifyRefreshToken(oldRefresh);

  const session = await Session.findById(decoded.sessionId);
  if (!session) return res.status(401).json({ message: "Session not found" });

  if (session.expiresAt < new Date()) {
    await session.deleteOne();
    return res.status(401).json({ message: "Session expired" });
  }

  // ROTATE REFRESH TOKEN
  const newRefresh = generateRefreshToken(session._id);
  session.refreshToken = newRefresh;
  session.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  await session.save();

  const user = await User.findById(session.user);
  const accessToken = generateAccessToken(user);

  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", newRefresh, {
    ...cookieOptions,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.json({ success: true });
});

export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    const decoded = verifyRefreshToken(refreshToken);
    await Session.findByIdAndDelete(decoded.sessionId);
  }

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.json({ success: true, message: "Logged out" });
});

export const logoutAll = asyncHandler(async (req, res) => {
  await Session.deleteMany({ user: req.user._id });
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ success: true, message: "Logged out from all devices" });
});
