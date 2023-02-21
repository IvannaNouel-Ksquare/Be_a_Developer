import { Router } from "express";
import { createAnswerForQuestion } from "../controllers/answerController";

const router = Router();

router.post("/addAnswer/:questionId", createAnswerForQuestion);
export default router;
