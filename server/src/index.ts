import express = require('express')
import HTTP = require('http')
import path = require('path')
import IO = require('socket.io')

const app = express()
const http = HTTP.createServer(app)
const io = IO(http)
const frontend = path.join(__dirname, '../../frontend');

app.use("/frontend", express.static(__dirname + '/../../frontend'));
app.use("/style", express.static(__dirname + '/../../frontend/style'));
app.use("/scripts", express.static(__dirname + '/../../frontend/scripts'));

app.get('/', (req, res) => {
    res.sendFile(frontend+'/index.html')
})

io.on('connection', (socket) => {
    console.log('User connected')

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

http.listen(3000, () => {
    console.log('Server is listening on port 3000.')
})