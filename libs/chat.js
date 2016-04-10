'use strict';

let socketio = require('socket.io');
let _ = require('lodash');

let io;
let _users = [];

exports.listen = function (server) {
  io = socketio.listen(server);
  io.on('connection', handleConnection);
};

function handleConnection(socket) {
  let usernames = _.map(_users, (user) => user.name);
  socket.emit('connected', usernames);

  socket.on('disconnect', () => {
    _users = _.reject(_users, (user) => user.id == socket.id);
    let usernames = _.map(_users, (user) => user.name);

    socket.broadcast.emit('userLeft', usernames);
  });

  socket.on('joinChat', (name) => {
    let id = socket.id;
    let entryDate = new Date();
    let user = { id, name, entryDate };

    _users.push(user);

    let usernames = _.map(_users, (user) => user.name);
    socket.broadcast.emit('newUser', usernames);
  });

  socket.on('message', (action) => {
    socket.broadcast.emit('message', {
      message: action.message,
      user: action.user
    });
  });
}
