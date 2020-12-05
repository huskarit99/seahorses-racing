const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();
const router = require('./router');
app.use(cors());
app.use(router);

const server = http.createServer(app);
const io = socketio(server);

var user = []; // name + coderoom
var room = {}; // list users in a room
var numberOfUsersInOneRoom = [];

app.get('/getCodeRoom', (req, res) => {
    const length = 6;
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    res.send({ coderoom: text} );
});

app.get('/checkHost', (req, res) => {
  if (room[req.query.coderoom]) {
    res.send({ host: false})
  }
  else {
    res.send({ host: true });
  }
})

// ------------------Socket.io -- Message-----------------------//
io.on('connect', (socket) => {
  socket.on('create', async ({ name: name, coderoom: coderoom }, callback) => {
    user[socket.id] = {
      name: name,
      coderoom: coderoom
    };
    if (!numberOfUsersInOneRoom[coderoom]) {
      numberOfUsersInOneRoom[coderoom] = 1;
      socket.join(coderoom);
      room[coderoom] = [];
      room[coderoom].push(name);
      socket.emit('responeJoin', {
        room: room[coderoom]
      });
      socket.broadcast.to(coderoom).emit('responeJoin', {
        room: room[coderoom]
      });
      const message = "You have created successfully !!!";
      callback({
        error: false,
        message: message
      });
    }
    else {
      const message = 'Coderoom or name is not available !!!';
      callback({
        error: true,
        message: message
      });
    }
  });

  socket.on('join', async ({ name: name, coderoom: coderoom }, callback) => {
    user[socket.id] = {
      name: name,
      coderoom: coderoom
    };
    if (!numberOfUsersInOneRoom[coderoom]) {
      const message = "Your coderoom does not exist !!!";
      callback({
        error: true,
        message: message
      });
    }
    else {
      if (numberOfUsersInOneRoom[coderoom] === 4) {
        const message = "The room is full !!!";
        callback({
          error: true,
          message: message
        });
      }
      else {
        if (!(room[coderoom].find((member) => { return (member === name); }))) {
          numberOfUsersInOneRoom[coderoom] += 1;
          room[coderoom].push(name);
          socket.join(coderoom);
          socket.emit('responeJoin', {
            room: room[coderoom]
          });
          socket.broadcast.to(coderoom).emit('responeJoin', {
            room: room[coderoom]
          });
          const message = "You have joined room successfully !!!";
          callback({
            error: false,
            message: message
          });
        }
      }
    }
  });

  socket.on('start', ({name: name, coderoom: coderoom}) => {
    socket.broadcast.to(coderoom).emit('start');
  });

  socket.on('disconnect', () => {
    // const name = user[socket.id].name;
    // const coderoom = user[socket.id].coderoom;
    // check[name][coderoom] -= 1;
  });
});
//--------------------------------------------------------------//

server.listen(PORT, () => console.log('Server has started'));