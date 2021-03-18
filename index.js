const express = require('express')
const app = express()
const port = process.env.PORT || 3000

require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const io = require('socket.io')(server);

require("./model/Message");


const Message = mongoose.model("Message");

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);

        const newMessage = new Message({
            message: msg
        });
        newMessage.save();
      });

socket.on('disconnect', () => {
    console.log('user disconnected');
});
});

require("./model/User");


require("./model/Chatroom");