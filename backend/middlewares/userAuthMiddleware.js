import jwt from "jsonwebtoken";

const userAuthToken = async (req, res, next) => {

    const header = req.headers['authorization'] || req.headers['Authorization'];
    try {

        if (!header || !header.startsWith("Bearer ")) {
            res.status(403).json({
                message: "Invalid accesstoken given",
            });
            return;
        }

        const token = header.split(" ")[1]


        const decoded = jwt.verify(token, process.env.USER_JWT_SECRET);

        if (!decoded.userId) {

            res.status(403).json({
                message: "cannot find userId"
            });
            return;
        }

        req.userId = decoded.userId;
        next();


    } catch (err) {

        res.status(500).json({
            message: "Internal server error during token verification",
            error: err.message
        });

        return;
    }

}

export default userAuthToken;