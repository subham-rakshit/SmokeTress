import express from "express";
import { PORT, ORIGIN_URL } from "./config/envConfig.js";
import { connectionDB } from "./utils/mongodb.js";
import { userRouter } from "./routes/user.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middelware/errorMiddleware.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ORIGIN_URL,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRouter);

app.use(errorMiddleware);

connectionDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
  });
});
