import "dotenv/config";
import "./db";
import "./models/Video";
import app from "./server";

const PORT = 4000;

const handleServer = () => console.log(`✅ server listen http://localhost:${PORT}!`);
app.listen(PORT, handleServer);