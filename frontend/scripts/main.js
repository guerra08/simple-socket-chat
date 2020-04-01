var socket;
const messageField = document.getElementById('message-in')
const nameField = document.getElementById('username-in')
const area = document.getElementById('messages-area')

function sendText() {

    const user = nameField.value

    socket.emit('chat message', { username: user, message: messageField.value })

    messageField.value = ''

}

function lockName() {

    nameField.disabled = true

    document.getElementById('name-btn').style = "display: none"

    document.getElementById('username-label').innerHTML = "You are:"

    enableMessages()
}

function enableMessages() {
    document.getElementsByClassName('message-input-section')[0].style = 'display: block'

    socket = io({
        query: {
            name: nameField.value
        }
    });

    socket.on('chat message', (msgText) => {
        area.value = `${(area.value === null) ? '' : area.value} ${msgText}`
    })

    socket.on('conn', (connText) => {
        area.value = `${(area.value === null) ? '' : area.value} ${connText}`
    })

    socket.on('current log', (log) => {
        area.value = `${(area.value === null) ? '' : area.value} ${log}`
    })
}

nameField.addEventListener("keyup", (e) => {
    e.keyCode === 13 ? lockName() : {}
})

messageField.addEventListener("keyup", (e) => {
    e.keyCode === 13 ? sendText() : {}
})