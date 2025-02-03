import userModel from "../../models/user.model.js";

const filterUser = async (req, res) => {
    const filteredUser = req.query.filteredUser;


    if (!filteredUser || typeof filteredUser !== 'string') {
        return res.status(400).json({ message: "Invalid filteredUser parameter" });
    }


    try {
        const getUser = await userModel.find({
            $or: [
                { firstName: { $regex: filteredUser, $options: "i" } },
                { lastName: { $regex: filteredUser, $options: "i" } }
            ]
        });

        if (!getUser || getUser.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json({
            users: getUser.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });

    } catch (err) {
        res.status(500).json({
            message: "Internal server error while getting users in bulk",
            error: err.message
        });
    }
};

export default filterUser;
