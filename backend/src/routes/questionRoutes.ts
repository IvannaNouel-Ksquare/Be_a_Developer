import { Router } from "express";
import{ 
    getAllQuestions,
    createQuestion,
    updateQuestionById,
    deleteQuestionById }
 from "../controllers/questionController";

const router = Router();

router.post("/new",createQuestion);
router.get("/",getAllQuestions);
router.put("/update/:questionId",updateQuestionById);
router.delete("/delete/:questionId",deleteQuestionById);

export default router;
