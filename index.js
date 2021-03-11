const express = require('express')
const app = express()
const port = 3000

require


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
