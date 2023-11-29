import net from "node:net";
import dotenv from "dotenv";
import { writeHistory } from "../utils/handleHistory.js";
import { randomUUID } from "node:crypto";
dotenv.config();

const port = process.env.PORT ?? 2323;

const serverTCP = net.createServer();

serverTCP.on("connection", (socket) => {
    const id = randomUUID()

    
    socket.on("data", (bufferData) => {
        const data = JSON.parse(bufferData.toString());
        console.log(data);

    });

    socket.on("close", () => {
        console.log("Client disconnected");
        writeHistory("disconnected", id);
    });

    socket.on("error", () => {
        console.log("Client error");
    });

    console.log("Client connected", new Date().toLocaleString());
   
    writeHistory("connected", id);
});

serverTCP.listen(port, () => {
    console.log(`server is up on port ${port} - ${ new Date().toLocaleString()}`);
});