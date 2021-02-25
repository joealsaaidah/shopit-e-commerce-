/* const app = require("./app");
const dotenv = require("dotenv"); */
import app from "./app.js";
import dotenv from "dotenv";
import connecttoDatabase from "./config/database.js";

// setting up config file
dotenv.config({ path: "backend/config/config.env" });

// connect to Database
connecttoDatabase();

app.listen(process.env.PORT, () => {
  console.log(
    `App is listening to port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
