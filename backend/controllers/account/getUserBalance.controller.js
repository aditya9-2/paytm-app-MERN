import accountModel from "../../models/account.model.js";

const getUserBalance = async (req, res) => {

    try {

        const account = await accountModel.findOne({ userId: req.userId });

        if (!account) {
            res.statu(403).json({
                message: "Incorrect ID",

            });
            return;
        }

        res.status(201).json({
            balance: account.balance
        })

    } catch (err) {

        res.status(500).json({
            message: "Internal server error",
            error: err.message
        })

    }



}
export default getUserBalance;