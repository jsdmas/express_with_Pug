import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";


const PORT = 4000;

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
// view engine을 pug를 사용한다 선언
// express가 view 디렉토리에서 pug 파일을 찾도록 설정되어 있어서 따로 설정하지 않아도 된다.
app.set("views", process.cwd() + "/src/views")
// package.json파일을 기준으로 실행경로를 잡아서 위의 코드로 src안에있는 pug파일의 경로를 잡아준다.
// default값은 "현재 작업 디렉토리 + /views" 이다.
app.use(express.urlencoded({ extended: true }));
//HTML form을 이해하고 그 form을 우리가 사용할 수 있는 JS object 형식으로 통역해준다.
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

const handleListening = () =>
    console.log(`Server listenting on port http://localhost:${PORT}`);

app.listen(PORT, handleListening); 
