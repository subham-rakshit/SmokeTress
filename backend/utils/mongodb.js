import mongoose from "mongoose";
import { MONGODB_URI } from "../config/envConfig.js";

export const connectionDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Database connection successfully.");
  } catch (error) {
    console.log(`Database ERROR: ${error}`);
    process.exit(1);
  }
};
