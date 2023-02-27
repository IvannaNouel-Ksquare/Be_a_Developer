import { Router } from "express";
import { 
     createCategory,
     getAllCategories, 
     getCategoryById } 
from "../controllers/categoryController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAuthorized } from "../middlewares/isAuthorized";

const router = Router();

router.post("/new",
isAuthenticated,
isAuthorized({ roles: ["admin"], allowSameUser: true }) ,createCategory);
router.get("/", getAllCategories);
router.get("/:categoryId", getCategoryById);

export default router;
