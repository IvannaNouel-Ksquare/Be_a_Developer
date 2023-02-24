import { Router } from "express";
import {
    getAllQuestions,
    createQuestion,
    updateQuestionById,
    deleteQuestionById,
    getQuestionsByCategoryId
}
    from "../controllers/questionController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAuthorized } from "../middlewares/isAuthorized";

const router = Router();

const middleware = () => [
    isAuthenticated,
    isAuthorized({ roles: ["admin"], allowSameUser: true })
];

router.get("/", isAuthenticated, middleware(), getAllQuestions);
router.get("/:categoryId", getQuestionsByCategoryId);
router.post("/new", middleware(), createQuestion);
router.put("/update/:questionId", middleware(), updateQuestionById);
router.delete("/delete/:questionId", middleware(), deleteQuestionById);

export default router;
