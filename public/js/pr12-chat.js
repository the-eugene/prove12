const socket = io('/') // This means your client will always be connected to your server, locally or on Heroku.

const chatBox = document.getElementById('chatBox')
const messageEl = document.getElementById('message')
const user = document.getElementById('user')
// const date = new Date() // Date implementation

socket.on('message_out', message => {
   chatBox.appendChild(buildMessage(message));
})

socket.on('fail', () => {window.location="/";});

const postMessage = () => {
socket.emit("message_in", {user: user.value, message: messageEl.value})
messageEl.value='';
};

function buildMessage(message){
    let elmt=document.createElement("li");
    if(message.user==user.value)
        elmt.classList.add("own");
    elmt.classList.add(message.user=="admin"?"admin":"normal");
    dt=new Date(message.time);
    elmt.innerHTML=` <span class="time">
    ${dt.getHours().toString().padStart(2, '0')}:${ dt.getMinutes().toString().padStart(2, '0')}
    </span><span class="user">${message.user}:</span>
    ${message.message}`;
    
    return elmt;
}

