import asyncHandler from "express-async-handler";
import { verifyAccessToken } from "../utils/verifyTokens.js";
import Session from "../models/Session.model.js";
import User from "../models/User.model.js";

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: "No access token" });

  let decoded;
  try {
    decoded = verifyAccessToken(token);
  } catch (err) {
    return res.status(401).json({ message: "Access token expired or invalid" });
  }

  const user = await User.findById(decoded.id).select("-password");
  if (!user) return res.status(401).json({ message: "User not found" });

  // Attach user to request
  req.user = user;
  next();
});

export const role = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ message: "Not authenticated" });

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};

export const validateSession = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token" });

  const session = await Session.findOne({ refreshToken });
  if (!session) return res.status(401).json({ message: "Session invalid" });

  if (session.expiresAt < new Date()) {
    await session.deleteOne();
    return res.status(401).json({ message: "Session expired" });
  }

  next();
});
