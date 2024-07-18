const http = require("http");

const express = require("express");
const app = express();
const path = require("path");

const Socketio = require("socket.io");
const server = http.createServer(app);
const io = Socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
  socket.on("send-location", function (data) {
    io.emit("recive-location", { id: socket.id, ...data });
  });
  socket.on("disconnect", () => {
    io.emit("user-disconnected", socket.id);
  });
});

app.get("/", (req, res) => {
  res.render("index");
});
server.listen(3000, (err) => console.log("server started"));
