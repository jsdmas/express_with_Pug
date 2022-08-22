// 필요한 모든 것들을 import 시키는 역할
import "./db";
import "./models/Video";
import app from "./server";

const PORT = 4000;

const handleListening = () =>
    console.log(`Server listenting on port http://localhost:${PORT}`);

app.listen(PORT, handleListening); 