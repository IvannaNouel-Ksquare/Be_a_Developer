import { Router } from "express";
import { getUserByUid } from "../controllers/userController";

const router = Router();

router.get("/userId/:uid", getUserByUid);

export default router;



