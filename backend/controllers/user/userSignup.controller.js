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

    const { username, firstName, lastName, password, pin } = req.body;

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

        const pinSalt = await bcrypt.genSalt(5);
        const hashedPin = await bcrypt.hash(pin, pinSalt);

        const newUser = await userModel.create({
            username,
            firstName,
            lastName,
            password: hashedPassword,
            pin: hashedPin
        });


        const userId = newUser._id;

        const totalBalance = await accountModel.create({
            userId,
            balance: 1 + Math.random() * 10000,
            pin: hashedPin
        });

        return res.status(200).json({
            message: "User created successfully",
            totalBalance: totalBalance.balance
        });

    } catch (err) {

        res.status(500).json({
            message: "Unexpected error occurred while signup",
            error: err.message
        });

        return;
    }
};

export default userSignup;