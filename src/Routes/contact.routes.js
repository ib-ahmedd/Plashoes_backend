import { Router } from "express";
import contactMessage from "../Controllers/contact-message/contactMessage.controller.js";

const router = Router();

router.post("/contact-message", contactMessage);

export default router;
