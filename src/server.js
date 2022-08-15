import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalrouter";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

const handleListening = () =>
    console(`Server listenting on port http://localhost:${PORT}`);

app.listen(PORT, handleListening); 
