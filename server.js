'use strict';
 
const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');
const body = require('body-parser');

const PORT = process.env.PORT || 51372;
const INDEX = path.join(__dirname, 'index.html');

const app = express();

  app.use(express.static(path.join(__dirname, 'dist')));

  app.use(body.urlencoded({ extended : false}));
  app.use(body.json());

  const server = http.createServer(app);
  const io = socketIO(server);

  app.post('/', function(req, res){
    console.log('Harish Test... Printing Request ....');
    console.log(req.body);
    io.sockets.emit('my other event', req.body);
    res.redirect('back');
  });

  io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
  });

  app.use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => 
  console.log(`Listening on ${ PORT } ....${process.env.PORT}`));

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);





