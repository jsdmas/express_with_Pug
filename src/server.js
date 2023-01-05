import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from './routers/videoRouter';
import userRouter from './routers/userRouter';
import { localsMiddleware } from "./middlewares";

const app = express();

// morgan은 node.js용 request logger middleware 이다.
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
// req.body로 부터 데이터를 받기 위해 설정.
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,   // 다시 저장 -  아무런 변동사항이 없을때도 session을 다시 저장하는 옵션.
    saveUninitialized: false, // 초기화되지 않는 저장 - 세션을 수정할 때만 DB에 저장한다.
    cookie: {
        maxAge: 20000000, // 쿠키가 얼마나 오래 있을수 있는지 기간을 알려준다.
    },
    store: MongoStore.create({  //session middleware로 store를 제공한다. 이 안에서 mongodb와 연결해서 세션을 연결.
        mongoUrl: process.env.DB_URL,
    }),
}));

app.use(localsMiddleware);

app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;