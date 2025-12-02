import User from "../model/User.model";
import asyncHandler from "express-async-handler";
import generateToken, {
  accessToken,
  refreshToken,
} from "../utils/generateToken";

export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(401).send("You have missed some information");
  }

  const exists = await User.findOne({ email });

  if (exists) {
    res.send(401).send("The user is already here");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    const { accessToken, refreshToken } = generateToken(user._id);
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
  }

  res.status(201).json({
    Success: true,
    Message: "You have succesfully created You account",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email & !password) {
    res.status(401).send("You don't enter Email and Password");
  }

  if (!email || !password) {
    res.status(401).send("You have missed some information");
  }

  const user = User.findOne({ email });

  if (!user) {
    res.status(401).send(`we dont find user with the give emial : ${email}`);
  }

  const Match = matchPassword(password);

  if (!Match) {
    res.status(401).send("Invalid password, Please try again");
  }

  generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "Production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    Success: true,
    Message: "You have sucessfully login to you page",
    user: {
      id: user._id,
      email: user.email,
    },
  });
});

export const logout = asyncHandler(async (req, res) => {
  res.cookie("token", " ", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "strict",
  });

  res.json({ Success: true, Message: "You have succesfully logout" });
});

export const getMe = asyncHandler(async (req, res) => {
  res.json({
    Success: true,
    user: req.user,
  });
});

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.json({ message: "Token refreshed successfully" });
  } catch (error) {
    res.json({ errorMessage: error });
    console.log(error);
  }
};

// import asyncHandler from "express-async-handler";
// import User from "../model/User.model.js";
// // import generateToken from "../utils/generateToken.js";

// // register
// export const registerUser = asyncHandler(async (req, res) => {
//   const { firstname, lastname, username, email, password } = req.body;
//   const exists = await User.findOne({ email });
//   if (exists) {
//     res.status(400);
//     throw new Error("User already exists");
//   }
//   const user = await User.create({
//     firstname,
//     lastname,
//     username,
//     email,
//     password,
//   });

//   if (!firstname || !lastname || !username || !email || !password) {
//     res.status(400);
//     throw new Error("you have a missing information");
//   }
//   res.status(201).json({
//     _id: user._id,
//     name: user.username,
//     email: user.email,
//     password: user.password,
//     // token: generateToken(user._id),
//   });
// });

// // login
// export const authUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (!user) {
//     res.status(400).json({ Error: "User is no found" });
//   }

//   const Match = await user.matchPassword(password);

//   if (!Match) {
//     res.status(400).json({ Error: "You enetered the wrog password" });
//   }

//   res.json({
//     _id: user._id,
//     name: user.name,
//     email: user.email,
//     role: user.role,
//     // token: generateToken(user._id),
//   });
// });

// // get profile
// export const getMe = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id).select("-password");
//   res.json(user);
