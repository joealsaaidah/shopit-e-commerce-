import express from "express";
import products from "./routes/product.js";
import errorMeddleware from "./middlewares/errors.js";
import users from "./routes/user.js";

const app = express();

app.use(express.json());
app.use("/api/v1", products);
app.use("/api/v1", users);

//middleware to handle Errors
app.use(errorMeddleware);

export default app;
