import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube")
// mongosh에서 얻은 url  / database이름
// mongoose는 wetube라는 mongodb database로 연결해 준다.

const db = mongoose.connection;

db.on("error", (error) => console.log("DB Error", error));
// on은 여러번 계속 발생시킬 수 있다.(클릭같은 이벤트)
db.once("open", () => console.log("Conneted to DB✅"));
// once는 한번만 밣생된다는 뜻이다.
