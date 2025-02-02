import mongoose from "mongoose";

const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGOOSE_URI);
        console.log(`Database connection successful`);

    } catch (err) {

        console.log(`Error while connect DB: ${err}`);
    }
}

export default connectDB;