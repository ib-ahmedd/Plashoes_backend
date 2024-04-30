import { Router } from "express";
import search from "../Controllers/search-controllers/search.controllers.js";
import advancedSearch from "../Controllers/search-controllers/advancedSearch.controller.js";

const router = Router();
router.get("/search/:key", search);
router.post("/search", advancedSearch);

export default router;
