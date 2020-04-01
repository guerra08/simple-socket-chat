import fs = require('fs');

const file = `${__dirname}/../../logs/chatLog.txt`;

export function readLog(){
    return fs.readFileSync(file, {encoding: 'utf-8'})
}

export function appendToFile(text){
    return fs.appendFileSync(file, text)
}

export function clearLog(){
    return fs.writeFileSync(file, "")
}