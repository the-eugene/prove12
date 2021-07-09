const socket = io('/') // This means your client will always be connected to your server, locally or on Heroku.

const errorContainer = document.getElementById('errMsg')
const usernameInput = document.getElementById('username')
const date = new Date()

const login = () => {
    let usr=usernameInput.value.trim();
    console.log('button press');
    if (usr.length<3)
        showError("Your username is too short");
    else 
        socket.emit("login", usr);
}

socket.on("fail",showError);
socket.on("success",()=>{
    console.log("success");
    window.location='/chat';});

function showError(msg){
    console.log(msg);
    errorContainer.innerText=msg;
}