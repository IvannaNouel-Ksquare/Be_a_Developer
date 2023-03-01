import { Router } from "express";
import {
    getAllQuestions,
    createQuestion,
    updateQuestionById,
    deleteQuestionById,
    getQuestionsByCategoryId,
    getQuestionById
}
    from "../controllers/questionController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAuthorized } from "../middlewares/isAuthorized";

const router = Router();

const middleware = () => [
    isAuthenticated,
    isAuthorized({ roles: ["admin"], allowSameUser: true })
];

router.get("/", getAllQuestions);
router.get("/question-id/:questionId", getQuestionById);
router.get("/:categoryId", getQuestionsByCategoryId);
router.post("/new", createQuestion);
router.put("/update/:questionId",updateQuestionById);
router.delete("/delete/:questionId", deleteQuestionById);

export default router;
