import { Router } from "express";
import { 
     createCategory,
     getAllCategories, 
     getCategoryById } 
from "../controllers/categoryController";

const router = Router();

router.post("/new", createCategory);
router.get("/", getAllCategories);
router.get("/:categoryId", getCategoryById);

export default router;
