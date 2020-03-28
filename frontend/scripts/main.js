var socket;
const messageField = document.getElementById('message-in')
const nameField = document.getElementById('username-in')

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

    socket.on('chat message', (msg) => {

        const area = document.getElementById('messages-area')
        area.value = area.value + msg.username + ': ' + msg.message + '\n'
    
    })  
}

nameField.addEventListener("keyup", (e) => {
    e.keyCode === 13 ? lockName() : {}
})

messageField.addEventListener("keyup", (e) => {
    e.keyCode === 13 ? sendText() : {}
})