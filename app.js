const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const session=require('express-session')({
    // Simple and not very secure session
    secret: 'random_text',
    cookie: {
        httpOnly: false // Permit access to client session
    }
})

const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000

const app = express()

const liveChat = require('./routes/liveChat')

let users=[];

app.set('view engine', 'ejs')
    .set('views', 'views')
    .use(express.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(express.static(path.join(__dirname, 'public')))
    .use(session)
    .use('/', liveChat)

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`))

const io = require('socket.io')(server)
io.use((socket, next) => {session(socket.request, {}, next);});
io.on('connection', socket => {
    const session = socket.request.session;
    console.log('Client connected!')

    socket
        .on('disconnect', () => {
            console.log('A client disconnected!')
        })
        .on('login',(username)=>{
            if(users.includes(username))
                socket.emit("fail", "Username Already Exists");
            else{
                users.push(username);
                session.username=username;
                session.save();
                socket.emit('success');
                socket.broadcast.emit("message_out",{user:"admin", message:`${username} has joined!`, time: Date.now()})
            }
        })

        .on('message_in', (message)=>{
            if(
                   !session.username
                || !message.user
                || session.username!=message.user
                || message.message.trim().length==0
            ){socket.emit("fail");}
            else{
                io.emit("message_out", {user:message.user, message: message.message.trim(), time: Date.now()})
             }
        })
})