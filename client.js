const PORT = 33333
const HOST = '127.0.0.1'
const fs = require('fs')
const prompt = require('prompts')
const dgram = require('dgram')
const argv = require('yargs').argv
const net = require('net')

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

async function createUdp(){

    const client = dgram.createSocket('udp4');

    const data = getFile(await askFile())

    client.send(data, 0, data.length, PORT, HOST, (err, bytes) => {
        if(err) throw err
        console.log("File sent.")
    })

}

async function createTcp(){

    const client = net.Socket();

    const data = getFile(await askFile())

    client.connect(PORT, HOST, function() {
        client.write(data);
        console.log("File sent.")
    });

}

async function chatLoop() {
    const response = await prompt({
        type: 'text',
        name: 'message',
        message: 'Digita aí fera: '
    })

    if(!response.message) return

    await sendMessage(response.message)

    chatLoop()
}

function getFile(size){
    const data = fs.readFileSync(`./${size}.txt`)
    return data
}

async function askFile() {
    const response = await prompt({
        type: 'text',
        name: 'message',
        message: 'Escolha o arquivo (1500 ou 10000): '
    })

    if(!response.message) return

    return response.message
}