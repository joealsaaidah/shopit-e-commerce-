/* const app = require("./app");
const dotenv = require("dotenv"); */
import app from "./app.js";
import dotenv from "dotenv";
import connecttoDatabase from "./config/database.js";
import cloudinary from "cloudinary";

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught Exception`);
  process.exit(1);
});

// setting up config file
dotenv.config({ path: "backend/config/config.env" });

// connect to Database
connecttoDatabase();

// Setup Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `App is listening to port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// Handle unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandle promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
