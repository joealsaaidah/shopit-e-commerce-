import User from "../models/user.js";
import errorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

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
  res.status(201).json({
    success: true,
    user,
  });
});
