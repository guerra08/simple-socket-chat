const PORT = 33333;
const HOST = '127.0.0.1';

const prompt = require('prompt')

const dgram = require('dgram');
const greeting = "I'm alive!" ;

const client = dgram.createSocket('udp4');

client.send(greeting, 0, greeting.length, PORT, HOST, function (err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST + ':' + PORT);
});

prompt.start()

prompt.get(['message'], (err, result) => {
    client.send(result.message, 0, result.message.length, PORT, HOST, function (err, bytes) {
        if (err) throw err;
        console.log('UDP message sent to ' + HOST + ':' + PORT);
    });
})