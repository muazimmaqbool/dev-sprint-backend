import mongoose from "mongoose";
import "dotenv/config"

const mongoDbURL = process.env.ONLINE_DB_URL;
// console.log("Mongo URL:", process.env.ONLINE_DB_URL);


export const connectDB = async () => {
  await mongoose
    .connect(mongoDbURL)
    .then(() => console.log("DB is connected"))
    .catch((error) => console.log("MongoDB server connection error:", error));
};