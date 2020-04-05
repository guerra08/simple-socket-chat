const PORT = 33333;
const HOST = '127.0.0.1';
const prompt = require('prompts')
const dgram = require('dgram');
const argv = require('yargs').argv
const net = require('net');
const greeting = "I'm alive!" ;

if(!argv){
    console.log("Invalid args.")
    return
}
switch(argv.type){
    case 'tcp': {
        createTcp()
        break
    }
    case 'udp': {
        createUdp()
        break
    }
}

function createUdp(){

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
            
        }
    })()

}

function createTcp(){

    const client = net.Socket();

    client.connect(PORT, HOST, function() {
        console.log('Connected');
        client.write('Hello, server! Love, Client.');
    });

}