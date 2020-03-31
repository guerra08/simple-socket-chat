import fs = require('fs');

export function readLog(){
    fs.readFile(`${__dirname}/chatLog.txt`, {encoding: 'utf-8'}, (err,data) => {
        if (!err) {
            console.log(data)
            return data
        } else {
            console.log("Unable to read log.")
        }
    });
}

export function appendToFile(text){
    fs.appendFile(`${__dirname}/chatLog.txt`, text, (err) => {
        if(err){
            console.log("Error while appending log.")
        }
        return true
    })
}

export function clearLog(){
    fs.writeFile(`${__dirname}/chatLog.txt`, "", (err) => {
        if(err) {
            console.log("Error cleaning log.")
        }
        return true
    })
}