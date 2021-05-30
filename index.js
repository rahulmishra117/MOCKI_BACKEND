const express = require('express');
const http = require('http')
const app = express();
const socketIo = require('socket.io');

const port = process.env.PORT
const db = require('./config/mongoose');

app.use(express.urlencoded());

// using passport for authentication
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const { findOneAndUpdate } = require('./models/interviewer');



// Using SocketIo file in the

const server = http.createServer(app);
const io = socketIo(server, { path: '/sockets' })

var room = []
var deleteroom = []

function deletingroom() {
    console.log("ROOM :" + room);
    if (deleteroom.length != 0) {
        for (let i = 0; i < deleteroom.length; i++) {
            if (io.sockets.adapter.room[deleteroom[i]] === undefined) {
                room = room.filter(function (item) {
                    return item !== deleteroom[i]
                })
            }
        }
    }
    deleteroom.splice(0, deleteroom.length);

    setTimeout(deletingroom, 60 * 60 * 1000);
}
// Triggering the websocket

io.on("connection", (socket) => {
    const { id } = socket.client
    console.log(`user connected ${id}`)

    // Checking room exiting
    socket.on('room-id', msg => {
        let exists = room.includes(msg)
        socket.emit('room-check', exists)
    })

    // If code changes ,broadcast to sockets
    socket.on('code-change', msg => {
        socket.broadcast.to(socket.room).emit('code-update', msg)
    })

    // Send intial data to last person who joined]
    socket.on('user-join', msg => {
        let room = io.socket.adapter.room[socket.room]
        let lastPerson = Object.keys(room.sockets)[room.length - 1]
        io.to(lastPerson).emit('accept-info', msg);
    })

    // Add room to socket
    socket.on('join-room', msg => {
        console.log("JOINING" + msg)
        socket.room = msg
        socket.join(msg)
        let room = io.sockets.adapter.room[socket.room]
        if (room.length > 1) {
            let user = Object.keys(room.sockets)[0]
            io.to(user).emit('request-info', "");

        }
        io.sockets.in(socket.room).emit('joined-users', room.length)

    })

    socket.on('created-room', msg => {
        console.log("CREATED-ROOM" + msg)
        room.push(msg)
    })

    // If language changes , broadcast to sockets

    socket.on('language-change', msg => {
        io.sockets.in(socket.room).emit('language-update', msg)
    })
    // If title change ,broadcast to socets
    socket.on('title-change', msg => {
        io.sockets.in(socket.room).emit('title-update', msg)
    })

    // If Connection is Lost
    socket.on('disconnect', () => {
        console.log(`User ${id} disconnected`)
    })

    // Check if their is no one in the room ,remove the room if true
    socket.on('disconnecting', () => {
        try {
            let room = io.sockets.adapter.room[socket.room]
            io.sockets.in(socket.room).emit('joined-users', room.length - 1)
            if (room.length === 1) {
                console.log("Leveing Room " + socket.room)
                socket.leave(socket.room)
                deleteroom.push(socket.room)
            }
        } catch (error) {
            console.log("Disconnect error")
        }
    })

});

deletingroom()

server.listen(5000, () => console.log(`Listening on port ${5000}`))



app.use(passport.initialize());


app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log('Error in the Running Port!!', err);
    }
    console.log('Port is working fine', port);
})