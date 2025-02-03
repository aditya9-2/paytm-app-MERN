import { Router } from "express";
import userSignup from "../controllers/userSignup.controller.js";
import userSignin from "../controllers/userSignin.controller.js";
import updateUserInformation from "../controllers/updateUserInformation.controller.js";
import userAuthToken from "../middlewares/userAuth.Middleware.js";

const router = new Router();

router.post("/signup", userSignup);
router.post("/signin", userSignin);

router.put("/update", userAuthToken, updateUserInformation)

export default router