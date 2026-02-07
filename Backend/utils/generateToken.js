// import jwt from "jsonwebtoken";
// const generateToken = (id) => {
//   const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "15m",
//   });

//   const refreshToken = jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
//   return { accessToken, refreshToken };
// };

// export default generateToken;

import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" },
  );
};

export const generateRefreshToken = (sessionId) => {
  return jwt.sign(
    {
      sessionId,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "30d" },
  );
};
