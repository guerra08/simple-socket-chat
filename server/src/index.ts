import express = require('express')
import HTTP = require('http')
import path = require('path')
import IO = require('socket.io')
import * as chatLog from  './Helpers/chatLog'

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

let clients = 0

io.on('connection', (socket) => {
    const user = socket.handshake.query.name
    clients++
    console.log(`User ${user} connected`)
    console.log(`Clients: ${clients}`)
    
    if(clients !== 0){
        const log = chatLog.readLog()
        console.log(log)
        socket.emit('current log', log)
    }

    const connText = `[${new Date().toLocaleTimeString()}]: User ${user} has been connected\n`

    chatLog.appendToFile(connText)

    io.sockets.emit('conn', connText)

    socket.on('chat message', (msg) => {
        const msgText = `[${new Date().toLocaleTimeString()}]: ${msg.username}: ${msg.message}\n`
        io.emit('chat message', msgText)
        chatLog.appendToFile(msgText)
    })

    socket.on('disconnect', () => {
        clients--
        if(clients === 0){
            chatLog.clearLog()
        }
        console.log('User disconnected')
        console.log(`Clients: ${clients}`)
    })
})

http.listen(3000, () => {
    console.log('Server is listening on port 3000.')
})