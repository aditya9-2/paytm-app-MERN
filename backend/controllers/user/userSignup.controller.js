import userModel from "../../models/user.model.js";
import bcrypt from "bcryptjs";
import { validateUserSignup } from "../../validators/userValidator.js";
import accountModel from "../../models/account.model.js";

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

        const newUser = await userModel.create({
            username,
            password: hashedPassword,
            firstName,
            lastName
        });

        // give random balance to the user after signup
        const userId = newUser._id;

        const totalBalance = await accountModel.create({
            userId,
            balance: 1 + Math.random() * 10000
        });

        return res.status(200).json({
            message: "User created successfully",
            totalBalance: totalBalance.balance
        });

    } catch (err) {

        res.status({
            message: "unexpected error occured while signiup",
            error: err.message
        });
        return;
    }
};

export default userSignup;