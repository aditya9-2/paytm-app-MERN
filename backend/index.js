import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(cors({ origin: '*' }))

app.use(express.json());

app.use('/api/v1/user', userRouter);

app.listen(port, async () => {
    await connectDB();
    console.log(`server listens on port: ${port}`);

});