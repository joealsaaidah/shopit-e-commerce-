import catchAsyncErrors from "./catchAsyncErrors.js";
import errorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import user from "../models/user.js";

// Check if the user is authenticated or not.
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new errorHandler("Login first to access this resource", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await user.findById(decoded.id);
  next();
});

// Handling users roles
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new errorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
