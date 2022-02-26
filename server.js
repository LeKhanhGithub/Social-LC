import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import helmet from "helmet";

const app = express();

// midleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("common"));
app.use(cookieParser());

//socket
import { createServer } from "http";
import { Server } from "socket.io";
import { socketServer } from "./SocketServer.js";
const http = createServer(app);
const io = new Server(http);

io.on("connection", (socket) => {
  socketServer(socket);
});
// router
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import postRouter from "./routes/postRouter.js";
import conversationRouter from "./routes/conversationRouter.js";
import commentRouter from "./routes/commentRouter.js";

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", postRouter);
app.use("/api", conversationRouter);
app.use("/api", commentRouter);

// connect mongodb
const URL = process.env.MONGODB_URL;
mongoose.connect(
  `${URL}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("connected MONGODB !");
  }
);

// post
const POST = 5000 || process.env.POST;
http.listen(POST, (req, res) => {
  console.log("run post ", POST);
});