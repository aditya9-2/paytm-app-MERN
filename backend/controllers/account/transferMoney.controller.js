import mongoose from "mongoose"
import accountModel from "../../models/account.model.js"
import bcrypt from "bcryptjs";

const transferMoney = async (req, res) => {

    try {
        // starts the session (means either all or none for concurrency)
        const session = await mongoose.startSession();
        session.startTransaction();

        const { amount, to, pin } = (req.body);

        // fetch account within the transaction
        const account = await accountModel.findOne({ userId: req.userId }).session(session);

        if (!account) {
            await session.abortTransaction();
            return res.status(404).json({
                message: "Sender account not found"
            });
        }

        const isPinValid = await bcrypt.compare(pin, account.pin);

        if (!isPinValid) {
            await session.abortTransaction();
            return res.status(403).json({
                message: "Invalid PIN. Transaction denied."
            });
        }

        if (!account || account.balance < amount) {

            await session.abortTransaction();

            return res.status(400).json({
                message: "Insufficient Balance",

            });
        }

        const toAccount = await accountModel.findOne({ userId: to }).session(session);

        if (!toAccount) {

            await session.abortTransaction();

            return res.status(400).json({
                message: "Invalid account"
            });

        }

        await accountModel.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await accountModel.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();

        res.status(200).json({
            message: "Transaction successful"
        });

    } catch (err) {

        res.status(500).json({
            message: "Internal server error during transaction",
            error: err.message
        });
        return;
    }


}

export default transferMoney;