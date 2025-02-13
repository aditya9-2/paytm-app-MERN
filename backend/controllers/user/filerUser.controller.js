import userModel from "../../models/user.model.js";

const filterUser = async (req, res) => {
    const filteredUser = req.query.filteredUser;


    if (!filteredUser || typeof filteredUser !== 'string') {
        return res.status(400).json({ message: "Invalid filteredUser parameter" });
    }


    try {
        const searchTerms = filteredUser.trim().split(/\s+/);

        let query;

        if (searchTerms.length > 1) {

            const firstName = searchTerms[0];
            const lastName = searchTerms.slice(1).join(' ');

            query = {
                $or: [
                    // Match exact combination of first and last name
                    {
                        $and: [
                            { firstName: { $regex: `^${firstName}`, $options: "i" } },
                            { lastName: { $regex: `^${lastName}`, $options: "i" } }
                        ]
                    },
                    // Match either first name or last name containing the full search term
                    { firstName: { $regex: filteredUser, $options: "i" } },
                    { lastName: { $regex: filteredUser, $options: "i" } }
                ]
            };
        } else {

            query = {
                $or: [
                    { firstName: { $regex: `^${filteredUser}`, $options: "i" } },
                    { lastName: { $regex: `^${filteredUser}`, $options: "i" } }
                ]
            };
        }

        const getUser = await userModel.find(query);

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
