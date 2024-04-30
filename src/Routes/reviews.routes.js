import { Router } from "express";
import review from "../Controllers/reviews-controllers/review.controller.js";
import submitReview from "../Controllers/reviews-controllers/submitReview.js";
import pendingReviews from "../Controllers/reviews-controllers/pendingReviews.controller.js";
import authenticateAccess from "../Middlewares/authenticateAccess.middleware.js";

const router = Router();
router.get("/pending-reviews/:id", authenticateAccess, pendingReviews);
router.get("/review/:id", authenticateAccess, review);
router.post("/submit-review", authenticateAccess, submitReview);

export default router;
