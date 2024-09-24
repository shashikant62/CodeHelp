const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const ACTIONS = require("./Actions");
const server = http.createServer(app);
const io = new Server(server);
const userSocketMap = {};
//new added
// const {ExpressPeerServer} = require("peer");
// const peerServer = ExpressPeerServer(server,{
//     debug: true
// });
// app.use("/peerjs",peerServer);

const getAllConnectedClients = (roomid) => {
  return Array.from(io.sockets.adapter.rooms.get(roomid) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
};

io.on("connection", (socket) => {
  socket.on(ACTIONS.JOIN, ({ roomid, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomid);
    //new added
    // setTimeout(()=>{
    //  io.to(roomid).broadcast.emit("user-connected",username);
    // }, 1000)
    //above added
    const clients = getAllConnectedClients(roomid);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });
  socket.on(ACTIONS.CODE_CHANGE, ({ roomid, code }) => {
    socket.in(roomid).emit(ACTIONS.CODE_CHANGE, { code });
  });
  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
  });
  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomid) => {
      socket.in(roomid).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });

    socket.on('join-room', (roomid) => {
      socket.join(roomid)
      socket.to(roomid).broadcast.emit('user-connected',roomid)
  
      // socket.on('disconnect', () => {
      //   socket.to(roomId).broadcast.emit('user-disconnected', userId)
      // })
    })
    delete userSocketMap[socket.id];
    socket.leave();
  });
});
const PORT =5000;
server.listen(PORT, () => console.log(`Server is runnint on port ${PORT}`));
