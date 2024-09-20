var blobs = [];

function Blob(id, x, y, r) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.r = r;
}

var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());

var server = app.listen(process.env.PORT || 3000, listen);

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Web socket listening at http://' + host + ':' + port);
}

app.use(express.static('public'));

var io = require('socket.io')(server, {
    allowEIO3: true
  });

setInterval(heartbeat, 33);

function heartbeat() {
  io.sockets.emit('heartbeat', blobs);
}

io.sockets.on(
  'connection',
  function(socket) {
    console.log('We have a new client: ' + socket.id);

    socket.on('start', function(data) {
    //   console.log(socket.id + ' ' + data.x + ' ' + data.y + ' ' + data.r);
      var blob = new Blob(socket.id, data.x, data.y, data.r);
      blobs.push(blob);
    });

    socket.on('update', function(data) {
    //   console.log(socket.id + " " + data.x + " " + data.y + " " + data.r);
      var blob;
      for (var i = 0; i < blobs.length; i++) {
        if (socket.id == blobs[i].id) {
          blob = blobs[i];
        }
      }
    //   console.log(blob.x);
      blob.x = data.x;
      blob.y = data.y;
      blob.r = data.r;
    });

    socket.on('eat', function(eatenId) {
        var eaterBlob = blobs.find(b => b.id === socket.id);
        var eatenBlob = blobs.find(b => b.id === eatenId);
        
        if (eaterBlob && eatenBlob && eaterBlob.r > eatenBlob.r) {
          var sum = Math.PI * eaterBlob.r * eaterBlob.r + Math.PI * eatenBlob.r * eatenBlob.r;
          eaterBlob.r = Math.sqrt(sum / Math.PI);
          
          blobs = blobs.filter(b => b.id !== eatenId);
          
          io.to(eatenId).emit('eaten');
        }
      });

    socket.on('disconnect', function() {
      console.log('Client has disconnected');
    });
  }
);