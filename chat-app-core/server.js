const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const { handleNewUser, handleExitUser, handleChat, handleDisconnect } = require("./socketHandlers");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 5000;

// Use middleware to serve static files from the 'public' folder  
app.use(express.static(path.join(__dirname+"/public")));

// When a WebSocket connection is established
io.on("connection", (socket) => {
    console.log("A user connected");

    // Listen to "newUser" events
    socket.on("newuser", handleNewUser(io, socket));

    // Listen to "exitUser" events
    socket.on("exituser", handleExitUser(io, socket));

    // Listen to "chat" events
    socket.on("chat", handleChat(io, socket));

    // Xử lý sự kiện "disconnect"
    socket.on("disconnect", handleDisconnect);
});

// Listen for connections to the specified port
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});