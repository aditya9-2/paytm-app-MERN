import userModel from "../../models/user.model.js";
import { validateUserSignin } from "../../validators/userValidator.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const userSignin = async (req, res) => {

    const validateResult = validateUserSignin(req.body);


    if (!validateResult) {
        res.status(422).json({
            message: "user validation failed",
            error: validateResult.errors
        });
        return;
    }

    const { username, password } = req.body;

    try {

        const isExistingUser = await userModel.findOne({ username });

        if (!isExistingUser) {
            res.status(404).json({
                message: "Username not exists",
            });
            return;
        }

        const iseMatchedPassword = await bcrypt.compare(password, isExistingUser.password);

        if (!iseMatchedPassword) {
            res.status(401).json({
                mesage: "passwod does not matched"
            });
            return;
        }

        const token = jwt.sign({
            userId: isExistingUser._id,
        }, process.env.USER_JWT_SECRET);

        res.status(200).json({
            message: "signin successful",
            user: {
                firstName: isExistingUser.firstName,
                _id: isExistingUser._id,
            },
            token,
        });


    } catch (err) {

        res.status(500).json({
            message: "unexpected error occured while signin",
            error: err
        });
        return;
    }








};

export default userSignin;