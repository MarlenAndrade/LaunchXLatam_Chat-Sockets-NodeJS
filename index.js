const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

app.get("/", (req, res) => {
    // res.send('<h1> Holi </h1>');
    res.sendFile(__dirname + '/templates/index.html');
})

io.on('connection', (socket) =>{
    console.log("Un usuario se ha conectado al chat");

    socket.on('chat message', (msg) =>{
        // console.log("El mensaje fue: " + msg); //Agarrar el mensaje
        io.emit('chat message', msg); //Se manda al html/cliente
    });

    socket.on('disconnect', () =>{
        console.log("El usuario se ha desconectado");
    });
});

server.listen(8080, () =>{
    console.log("Escuchando en el puerto 8080");
});