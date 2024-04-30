import { Router } from "express";
import bestsellers from "../Controllers/products-controllers/bestseller.controller.js";
import sale from "../Controllers/products-controllers/sale.controller.js";
import productPage from "../Controllers/products-controllers/productPage.controller.js";
import sortFilter from "../Controllers/products-controllers/sortFilter.controllers.js";
import product from "../Controllers/products-controllers/product.controller.js";
import newArrived from "../Controllers/products-controllers/newArrived.controller.js";

const router = Router();

router.get("/bestsellers", bestsellers);
router.get("/new-arrived", newArrived);
router.get("/sale", sale);
router.get("/product-page/:page", productPage);
router.post("/filter-sort", sortFilter);
router.get("/product/:id", product);

export default router;
