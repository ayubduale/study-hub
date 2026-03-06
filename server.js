import { createServer } from "node:http";
import { Server } from "socket.io";
import next from "next";
import { parse } from "url";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = parseInt(process.env.PORT || "3000", 10);
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

await app.prepare();

const httpServer = createServer(async (req, res) => {
  try {
    const parsedUrl = parse(req.url, true);
    await handler(req, res, parsedUrl);
  } catch (err) {
    console.error("Error occurred handling", req.url, err);
    res.statusCode = 500;
    res.end("internal server error");
  }
});

const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
  socket.on("join-group", (groupId) => socket.join(String(groupId)));
  socket.on("send-chat", (data) =>
    socket.to(String(data.groupId)).emit("receive-chat", data),
  );
  socket.on("send-question", (data) =>
    socket.to(String(data.groupId)).emit("receive-question", data),
  );
  socket.on("answer-question", (data) =>
    socket.to(String(data.groupId)).emit("receive-answer", data),
  );
  socket.on("disconnect", () => console.log("socket disconnected", socket.id));
});

httpServer.listen(port, () => {
  console.log(`> Ready on http://${hostname}:${port}`);
});
