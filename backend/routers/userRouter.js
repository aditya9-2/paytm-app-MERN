import { Router } from "express";
import userSignup from "../controllers/user/userSignup.controller.js";
import userSignin from "../controllers/user/userSignin.controller.js";
import updateUserInformation from "../controllers/user/updateUserInformation.controller.js";
import userAuthToken from "../middlewares/userAuthMiddleware.js";
import filerUser from "../controllers/user/filerUser.controller.js";

const router = new Router();

router.post("/signup", userSignup);
router.post("/signin", userSignin);

router.put("/update", userAuthToken, updateUserInformation);
router.get("/bulk", filerUser);

export default router