import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import validateUserSignup from "../validators/userValidator.js";
import jwt from "jsonwebtoken";


const userSignup = async (req, res) => {
    const validateResult = validateUserSignup(req.body);

    if (!validateResult) {
        res.status(422).json({
            message: "user validation failed",
            error: validateResult.errors
        });
        return;
    }

    const { username, firstName, lastName, password } = req.body;

    try {

        const isUsername = await userModel.findOne({ username });

        if (isUsername) {
            res.json({
                message: "Username already exists",
            });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await userModel.create({
            username,
            password: hashedPassword,
            firstName,
            lastName
        });

        const token = jwt.sign({
            userId: userModel._id
        }, process.env.USER_JWT_SECRET);


        return res.status(200).json({
            message: "User created successfully",
            token
        });

    } catch (err) {

        res.status({
            message: "unexpected error occured while signiup",
            error: err
        });
        return;
    }
};

export default userSignup;