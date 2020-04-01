"use strict";
exports.__esModule = true;
var express = require("express");
var HTTP = require("http");
var path = require("path");
var IO = require("socket.io");
var chatLog = require("./Helpers/chatLog");
var app = express();
var http = HTTP.createServer(app);
var io = IO(http);
var frontend = path.join(__dirname, '../../frontend');
app.use("/frontend", express.static(__dirname + '/../../frontend'));
app.use("/style", express.static(__dirname + '/../../frontend/style'));
app.use("/scripts", express.static(__dirname + '/../../frontend/scripts'));
app.get('/', function (req, res) {
    res.sendFile(frontend + '/index.html');
});
var clients = 0;
io.on('connection', function (socket) {
    var user = socket.handshake.query.name;
    if (clients !== 0) {
        var log = chatLog.readLog();
        console.log(log);
        socket.emit('current log', log);
    }
    clients++;
    console.log("User " + user + " connected");
    console.log("Clients: " + clients);
    var connText = "[" + new Date().toLocaleTimeString() + "]: User " + user + " has been connected\n";
    chatLog.appendToFile(connText);
    io.sockets.emit('conn', connText);
    socket.on('chat message', function (msg) {
        var msgText = "[" + new Date().toLocaleTimeString() + "]: " + msg.username + ": " + msg.message + "\n";
        io.emit('chat message', msgText);
        chatLog.appendToFile(msgText);
    });
    socket.on('disconnect', function () {
        clients--;
        if (clients === 0) {
            chatLog.clearLog();
        }
        console.log('User disconnected');
        console.log("Clients: " + clients);
    });
});
http.listen(3000, function () {
    console.log('Server is listening on port 3000.');
});
