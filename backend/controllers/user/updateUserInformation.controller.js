import { z } from "zod";
import bcrypt from "bcryptjs";
import userModel from "../../models/user.model.js";

const updateBody = z.object({
    firstName: z.string().min(3).max(30).optional(),
    lastName: z.string().min(3).max(30).optional(),
    password: z.string().min(6).max(18).optional()
});

const updateUserInformation = async (req, res) => {
    const validationResult = updateBody.safeParse(req.body);

    if (!validationResult.success) {
        return res.status(411).json({
            message: "Validation error",
            error: validationResult.error.errors
        });
    }

    try {


        const userExists = await userModel.findById(req.userId);

        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        if (req.body.password) {

            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);

        }

        await userModel.updateOne(
            { _id: req.userId },
            { $set: req.body }
        );

        res.status(200).json({
            message: "Updated successfully",

        });

    } catch (err) {
        res.status(500).json({
            message: "Internal server error while updating",
            error: err.message
        });
    }
};

export default updateUserInformation;
