// Importaciones
import net from "node:net";
import dotenv from "dotenv";
import { writeHistory } from "../utils/handleHistory.js";
import { randomUUID } from "node:crypto";
import { createConnectionMongo } from "../database/mongodb.js";
import { processParams } from "../utils/handleParams.js";
dotenv.config();

//Crear un servidor -> Servicio que queda en escucha para "servir" data
const port = process.env.PORT || 2323;

const serverTCP = net.createServer();

serverTCP.on("connection", async (socket) => {
    const id = randomUUID()

    
    socket.on("data", async (bufferData) => {
        const data = JSON.parse(bufferData.toString());
        const response = await processParams(data);
        socket.write(JSON.stringify(response));
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

serverTCP.listen(port, async () => {
    console.log(`Server is up on port ${port} - ${ new Date().toLocaleString()}`);
    await createConnectionMongo();
});