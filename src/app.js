import express from "express";
import cors from "cors";
import authRouter from "./Routes/auth.routes.js";
import cartsRouter from "./Routes/cart.routes.js";
import contactsRouter from "./Routes/contact.routes.js";
import ordersRouter from "./Routes/order.routes.js";
import productsRouter from "./Routes/products.routes.js";
import reviewsRouter from "./Routes/reviews.routes.js";
import searchRouter from "./Routes/search.routes.js";

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

//Routes
app.use("/api/auth", authRouter);
app.use("/api", cartsRouter);
app.use("/api", contactsRouter);
app.use("/api", ordersRouter);
app.use("/api", productsRouter);
app.use("/api", reviewsRouter);
app.use("/api", searchRouter);

export default app;
