var socket = io();

socket.on('chat message', (msg) => {

    const area = document.getElementById('messages-area')
    area.value = area.value + msg.username + ': ' + msg.message + '\n'

})

function sendText() {

    const text = document.getElementById('message-in')

    const user = document.getElementById('username-in').value

    socket.emit('chat message', { username: user, message: text.value })

    text.value = ''

}

function lockName() {

    const user = document.getElementById('username-in');

    user.disabled = true

    document.getElementById('name-btn').style = "display: none"

    document.getElementById('username-label').innerHTML = "You are:"

    enableMessages()
}

function enableMessages() {
    document.getElementsByClassName('message-input-section')[0].style = 'display: block'
}