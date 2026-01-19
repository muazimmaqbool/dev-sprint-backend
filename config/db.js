import mongoose from "mongoose";

const mongoDbURL = process.env.ONLINE_DB_URL;

export const connecDB = async () => {
  await mongoose.connect(mongoDbURL).then(() => console.log("DB is connected"));
};
