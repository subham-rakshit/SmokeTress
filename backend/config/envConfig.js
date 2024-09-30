import dotenv from "dotenv";

dotenv.config();

export const { PORT, MONGODB_URI, ORIGIN_URL } = process.env;
