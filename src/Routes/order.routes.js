import { Router } from "express";
import userOrders from "../Controllers/orders-controllers/userOrders.js";
import order from "../Controllers/orders-controllers/order.controller.js";
import orderDetails from "../Controllers/orders-controllers/orderDetails.controller.js";
import authenticateAccess from "../Middlewares/authenticateAccess.middleware.js";

const router = Router();
router.post("/order", authenticateAccess, order);
router.get("/orders/:id", authenticateAccess, userOrders);
router.get("/order-details/:id", authenticateAccess, orderDetails);

export default router;
