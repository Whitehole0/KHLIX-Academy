import jwt from "jsonwebtoken";
import User from "../model/User.model.js";

export const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User does not exist" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token", error });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }

  return res.status(403).json({ message: "Access denied: Admins only" });
};

// try {
// //     let token = null;
// //     if (
// //       req.headers.authorization &&
// //       req.headers.authorization.startsWith("Bearer ")
// //     ) {
// //       const parts = req.headers.authorization.split(" ")[1];
// //       if (parts.length === 2) {
// //         token = parts[1];
// //       }
// //     } else if (req.cookies.token) {
// //       token = req.cookies.token;
// //     }
// //     if (!token)
// //       return res.status(401).json({ message: "Not authorized, token missing" });
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     req.user = await User.findById(decoded.id).select("-password");
// //     return next();
// //   } catch (err) {
// //     res.status(401).json({ message: "Not authorized, token failed" });
// //   }
// // }
