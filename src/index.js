// morgan은 node.js용 request logger middleware 이다.
import express from "express";
import morgan from "morgan";
import globalRouter from './routers/globalRouter';
import videoRouter from './routers/videoRouter';
import userRouter from './routers/userRouter';

const app = express();
const PORT = 4000;
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

const handleServer = (req, res) => console.log(`server listen http://localhost:${PORT}! ✅`);
app.listen(PORT, handleServer);