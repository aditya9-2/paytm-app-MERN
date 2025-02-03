import { Router } from "express";
import getUserBalance from "../controllers/account/getUserBalance.controller.js";
import userAuthToken from "../middlewares/userAuthMiddleware.js";
import transferMoney from "../controllers/account/transferMoney.controller.js";

const router = new Router;

router.get('/balance', userAuthToken, getUserBalance);
router.post('/transfer', userAuthToken, transferMoney);


export default router;