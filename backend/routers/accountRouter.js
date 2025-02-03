import { Router } from "express";
import getUserBalance from "../controllers/account/getUserBalance.controller.js";
import userAuthToken from "../middlewares/userAuthMiddleware.js";

const router = new Router;

router.get('/balance', userAuthToken, getUserBalance)


export default router;