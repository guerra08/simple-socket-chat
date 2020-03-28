"use strict";
exports.__esModule = true;
var express = require("express");
var HTTP = require("http");
var path = require("path");
var IO = require("socket.io");
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
io.on('connection', function (socket) {
    console.log("User " + socket.handshake.query.name + " connected");
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function () {
        console.log('User disconnected');
    });
});
http.listen(3000, function () {
    console.log('Server is listening on port 3000.');
});
