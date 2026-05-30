import dotenv from "dotenv"
dotenv.config();
import http from "http"
import app from "./app.js";

const server = http.createServer(app);
const Port = process.env.PORT || 5000;

server.listen(Port, () => {
    console.log(`Server is connected to http://localhost:${Port}`);
})