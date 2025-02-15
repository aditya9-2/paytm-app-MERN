import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import accountRouter from "./routers/accountRouter.js";
import connectDB from "./config/db.js";


dotenv.config();

const app = express();

app.use(cors({
    origin: 'https://paytm-app-mern.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'],
    credentials: true
}));

const port = process.env.PORT || 3000;


app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/account', accountRouter);

app.listen(port, async () => {
    await connectDB();
    console.log(`server listens on port: ${port}`);

});