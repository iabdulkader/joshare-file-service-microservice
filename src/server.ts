import { Server, Socket } from "socket.io";
import express, { Express, Request, Response } from 'express';
import * as http from "http";
import dotenv from 'dotenv';
import dbConnect from "./db";
import auth from "./middleware/auth";
import uploadController from "./controllers/upload";
import downloadController from "./controllers/download";
import deleteController from "./controllers/delete";
import cors from "cors";

dotenv.config();

dbConnect();
const app: Express = express();

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,x-authorizarion");
    next();
    });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const server = http.createServer(app);

export const io = new Server(server, {
    path: "/socket/",
    cors: {
        origin: "*",
        credentials: true
    }});


app.get("/", async (req: Request, res: Response) => {
    
        res.json({
            status: "success",
            message: "server is running",
        });
    });

app.post("/api/upload", auth, uploadController);
app.get("/api/download/:id", downloadController);
app.post("/api/delete", auth, deleteController);

io.on("connection", (socket: Socket) => {

    socket.on("join", (data) => {
        socket.join(data.pin);
        console.log("joined", data.pin);
    })

    socket.on("upload-progress", (data) => {
        console.log(socket.to(data.pin).emit("upload-progress", data));
    })

    socket.on("upload-complete", (data) => {
        socket.to(data.pin).emit("upload-complete", data);
    })

    socket.on("delete-file", (data) => {
        socket.to(data.pin).emit("delete-file", data);
    })


    });

    



const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`listening on *:${port}`);
    });
