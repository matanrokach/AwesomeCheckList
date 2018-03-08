const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');
const path = require('path');
const aws = require('./aws.service');
const mongoose = require('mongoose');
const ListItem = mongoose.model('listItems');

module.exports = server => {
  const io = socketIO(server);

  let sockets = [];

  io.on('connection', function (socket) {
    sockets.push(socket);

    // Broadcast
    socket.on('message', function (message) {
      for (var i = 0; i < sockets.length; i++) {
        if(sockets[i] != socket)
          sockets[i].send(message);
      }
    });
    socket.on('disconnect', function () {
      for (var i = 0; i < sockets.length; i++) {
        if (sockets[i].id === socket.id) {
            sockets .splice(i, 1);
        }
      }
      console.log('The socket disconnected');
    });
    // AWS S3 BUCKET
    socket.on('upload-image', function (message) {
      var path = 'images/' + message.name;
      aws.write(path, message.data).then(async function (response) {
        console.log(response);
        if(!response.statusCode)
          await ListItem.update({_id: message.taskid}, {imageurl: message.name});

        socket.emit('image-uploaded', {
            name: 'data:image/jpeg;base64,',
            response: response,
            taskId: message.taskId,
            imageurl: message.name
        });

      });
    });
      // -----
  });
}
