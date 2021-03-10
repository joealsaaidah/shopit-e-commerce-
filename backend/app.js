import express from "express";
import products from "./routes/product.js";
import errorMeddleware from "./middlewares/errors.js";
import users from "./routes/user.js";
import cookieParser from "cookie-parser";
import orders from "./routes/order.js";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import payment from "./routes/payment.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use("/api/v1", products);
app.use("/api/v1", users);
app.use("/api/v1", orders);
app.use("/api/v1", payment);

//middleware to handle Errors
app.use(errorMeddleware);

export default app;
