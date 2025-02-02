import { Router } from "express";
import userSignup from "../controllers/userSignup.controller.js";
import userSignin from "../controllers/userSignin.controller.js";

const router = new Router();

router.post("/signup", userSignup);
router.post("/signin", userSignin);

export default router