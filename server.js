const PORT = 33333;
const HOST = '127.0.0.1';

const argv = require('yargs').argv
const dgram = require('dgram');
const net = require('net');

if (!argv) {
    return;
}
switch (argv.type) {
    case 'tcp': {
        createTcp() 
        break
    }
    case 'udp': {
        createUdp()
        break
    }
}

function createTcp() {
    const server = net.createServer(function (socket) {
        socket.write('Echo server\r\n');
        socket.pipe(socket);
    });

    server.listen(PORT, HOST);

    server.on('listening', function(){
        const address = server.address();
        console.log('TCP Server listening on ' + address.address + ':' + address.port);
    })
    
}

function createUdp() {
    const server = dgram.createSocket('udp4');

    server.on('listening', function () {
        const address = server.address();
        console.log('UDP Server listening on ' + address.address + ':' + address.port);
    });

    server.on('message', function (message, remote) {
        console.log(remote.address + ':' + remote.port + ' - ' + message);
    });

    server.bind(PORT, HOST);
}