import { Router } from "express";
import { getUserByUid, getAdminByUid } from "../controllers/userController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAuthorized } from "../middlewares/isAuthorized";

const router = Router();

router.get("/userId/:uid", getUserByUid);
router.get("/adminId/:uid",
isAuthenticated,
isAuthorized({ roles: ["admin"], allowSameUser: true }),getAdminByUid);


export default router;



