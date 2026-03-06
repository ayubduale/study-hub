import { createServer } from "node:http";
import { Server } from "socket.io";
import next from "next";
import { parse } from "url";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const httpServer = createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url!, true);
        await handler(req, res, parsedUrl);
      } catch (err) {
        console.error("Error handling request:", err);
        res.statusCode = 500;
        res.end("Internal server error");
      }
    });

    const io = new Server(httpServer, {
      cors: {
        origin: dev ? "http://localhost:3000" : "*",
        methods: ["GET", "POST"],
        credentials: true,
      },
      transports: ["websocket", "polling"],
    });

    io.on("connection", (socket) => {
      console.log("Socket connected:", socket.id);

      socket.on("join-group", (groupId: number) => {
        socket.join(`group-${groupId}`);
        console.log(`Socket ${socket.id} joined group ${groupId}`);
      });

      socket.on("send-chat", (data: any) => {
        console.log("Chat message:", data);
        socket.to(`group-${data.groupId}`).emit("receive-chat", data);
      });

      socket.on("send-question", (data: any) => {
        console.log("Question:", data);
        socket.to(`group-${data.groupId}`).emit("receive-question", data);
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);
      });
    });

    httpServer.listen(port, () => {
      console.log(`> Server ready on http://${hostname}:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });
