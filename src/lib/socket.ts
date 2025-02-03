import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { NextApiResponseServerIO } from "@/types/socket";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function ioHandler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (!res.socket.server.io) {
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });

    io.on("connection", (socket) => {
      console.log("Socket connected:", socket.id);

      socket.on("document:update", ({ documentId, content }) => {
        socket.broadcast.emit("document:change", { documentId, content });
      });

      socket.on("task:update", ({ taskId, changes }) => {
        socket.broadcast.emit("task:change", { taskId, changes });
      });

      socket.on("chat:message", ({ projectId, message }) => {
        io.emit("chat:new", { projectId, message });
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
