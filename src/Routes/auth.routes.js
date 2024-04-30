import { Router } from "express";
import login from "../Controllers/auth-controller/login.controller.js";
import register from "../Controllers/auth-controller/register.controller.js";
import verifyOtp from "../Controllers/auth-controller/verifyOtp.controller.js";
import verifyEmail from "../Controllers/auth-controller/verifyEmail.controller.js";
import forgotPassword from "../Controllers/auth-controller/forgotPassword.controller.js";
import resetPassword from "../Controllers/auth-controller/resetPassword.controller.js";
import authenticateAuth from "../Middlewares/autheticateAuth.middleware.js";

const router = Router();
router.post("/login", login);
router.post("/verify-email", verifyEmail);
router.post("/verify-otp", verifyOtp);
router.post("/register", authenticateAuth, register);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password", authenticateAuth, resetPassword);

export default router;
