import mongoose from "mongoose";

export async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("listening on port 3000");
  } catch (error) {
    console.log("there is some error", error);
  }
}
