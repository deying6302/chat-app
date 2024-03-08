const handleNewUser = (io, socket) => (username) => {
    socket.broadcast.emit("update", `${username} joined the conversation`);
};

const handleExitUser = (io, socket) => (username) => {
    socket.broadcast.emit("update", `${username} left the conversation`);
}

const handleChat = (io, socket) => (message) => {
    socket.broadcast.emit("chat", message);
}

const handleDisconnect = () => {
    console.log("User disconnected");
};

module.exports = {
    handleNewUser,
    handleExitUser,
    handleChat,
    handleDisconnect
};