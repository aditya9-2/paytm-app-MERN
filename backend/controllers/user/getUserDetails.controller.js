import userModel from "../../models/user.model.js";

const getUserDetails = async (req, res) => {

    try {
        const user = await userModel.findById(req.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "user not found"
            });
        }

        return res.status(200).json({
            user
        });

    } catch (err) {
        res.status(500).json({
            message: "Internal server error while find your details",
            error: err.message
        });

    }

}
export default getUserDetails;