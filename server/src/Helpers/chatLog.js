"use strict";
exports.__esModule = true;
var fs = require("fs");
var file = __dirname + "/../../logs/chatLog.txt";
function readLog() {
    return fs.readFileSync(file, { encoding: 'utf-8' });
}
exports.readLog = readLog;
function appendToFile(text) {
    return fs.appendFileSync(file, text);
}
exports.appendToFile = appendToFile;
function clearLog() {
    return fs.writeFileSync(file, "");
}
exports.clearLog = clearLog;
