import { Router } from "express";
import { 
    getMatchHistoryForUser, 
    saveMatchHistory 
} from "../controllers/matchController";
import { getUserByUid, getAdminByUid } from "../controllers/userController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAuthorized } from "../middlewares/isAuthorized";

const router = Router();

router.get("/userId/:uid", getUserByUid);
router.get("/adminId/:uid",
isAuthenticated,
isAuthorized({ roles: ["admin"], allowSameUser: true }),getAdminByUid);

router.post('/match-history', saveMatchHistory);
router.get('/match-history/:uid', getMatchHistoryForUser);

export default router;



