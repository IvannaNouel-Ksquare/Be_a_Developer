import { Router } from "express";
import{ 
    getAllQuestions,
    createQuestion }
 from "../controllers/questionController";

const router = Router();

router.get("/",getAllQuestions);
router.post("/new",createQuestion);

export default router;
