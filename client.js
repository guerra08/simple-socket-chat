const PORT = 33333;
const HOST = '127.0.0.1';
const prompt = require('prompts')
const dgram = require('dgram');

const greeting = "I'm alive!" ;

const client = dgram.createSocket('udp4');

sendMessage = async (msg) => {

    if(!msg) return

    client.send(msg, 0, msg.length, PORT, HOST, function (err, bytes) {
        if (err) throw err;
    })
} 

chatLoop = async () => {
    const response = await prompt({
        type: 'text',
        name: 'message',
        message: 'Digita aí fera: '
    })

    if(!response.message) return

    await sendMessage(response.message)

    chatLoop()
}

(async() => {
    try{
        await sendMessage(greeting)
        await chatLoop()
    }catch(e){
        //Logs the error
    }
})()