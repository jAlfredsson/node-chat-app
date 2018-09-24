const path = require('path')
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var app = express()
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

socket.emit('newMessage', {
  from: 'john',
  text: 'see you then',
  createdAt: 123123
})

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  })
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
