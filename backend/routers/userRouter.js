import { Router } from "express";
import userSignup from "../controllers/userSignup.controller.js";
import userSignin from "../controllers/userSignin.controller.js";

const router = new Router();

router.use("/signup", userSignup);
router.use("/signin", userSignin);

export default router