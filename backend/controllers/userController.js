import User from "../models/user.js";
import errorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import sendToken from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

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

// Forgot Password    =>    /api/v1/password/forgot
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new errorHandler("User not found with this email", 404));
  }
  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset password url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: "ShopIT Password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `E-mail has been sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new errorHandler(error.message, 500));
  }
});

// Reset Password   =>    /api/v1/password/reset/:token
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  //Hash URL token
  const resetPasswordtoken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordtoken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new errorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new errorHandler("Password does not match", 400));
  }
  // Setup new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

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
