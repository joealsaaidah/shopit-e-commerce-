import User from "../models/user.js";
import errorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import sendToken from "../utils/jwtToken.js";

// Register a user    =>    /api/v1/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "shopit/avatars/avatar_bcrbxg.jpg",
      url:
        "https://res.cloudinary.com/mimicucu/image/upload/v1614337914/shopit/avatars/avatar_bcrbxg.jpg",
    },
  });

  sendToken(user, 200, res);
});

// Login user   =>  /api/v1/login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and pass has been given
  if (!email || !password) {
    return next(new errorHandler("Please. enter E-mail & Password", 400));
  }

  // finding user in Database
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new errorHandler("Invaled E-mail or Password", 401));
  }

  // check if password is correct or not
  const isPasswordsCorrect = await user.comparePassword(password);
  if (!isPasswordsCorrect) {
    return next(new errorHandler("Invaled E-mail or Password", 401));
  }
  sendToken(user, 200, res);
});

// Logout user    =>    /api/v1/logout
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    sucess: true,
    message: "Logged out",
  });
});
