const PORT = 33333;
const HOST = '127.0.0.1';

const prompt = require('prompts')

const dgram = require('dgram');
const greeting = "I'm alive!" ;

const client = dgram.createSocket('udp4');

client.send(greeting, 0, greeting.length, PORT, HOST, function (err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST + ':' + PORT);
});

(async () => {
    const response = await prompt({
        type: 'text',
        name: 'message',
        message: 'Digita aí fera: '
    });

    client.send(response.message, 0, response.message.length, PORT, HOST, function (err, bytes) {
        if (err) throw err;
        console.log('UDP message sent to ' + HOST + ':' + PORT);
    });
})()