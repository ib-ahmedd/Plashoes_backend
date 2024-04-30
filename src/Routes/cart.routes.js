import { Router } from "express";
import cart from "../Controllers/cart-controllers/cart.controller.js";
import cartAdd from "../Controllers/cart-controllers/cartAdd.controller.js";
import cartDelete from "../Controllers/cart-controllers/cartDelete.controller.js";
import cartUpdate from "../Controllers/cart-controllers/cartUpdate.controller.js";
import cartEmpty from "../Controllers/cart-controllers/cartEmpty.controller.js";
import authenticateAccess from "../Middlewares/authenticateAccess.middleware.js";

const router = Router();

router.get("/cart/:id", authenticateAccess, cart);
router.post("/add-cart", authenticateAccess, cartAdd);
router.patch("/cart-update/:id", authenticateAccess, cartUpdate);
router.delete("/cart-delete/:id", authenticateAccess, cartDelete);
router.delete("/empty-cart/:id", authenticateAccess, cartEmpty);

export default router;
