import { Router } from "express";
import{ 
    getAllQuestions,
    createQuestion }
 from "../controllers/questionController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAuthorized } from "../middlewares/isAuthorized";

const router = Router();

router.get("/",getAllQuestions);
router.post("/new",createQuestion);
/* router.post("/new",isAuthenticated,
isAuthorized({ roles: ["admin"], allowSameUser: true }),createQuestion); */

export default router;
