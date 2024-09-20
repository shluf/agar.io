var socket;
var blob;
var blobs = [];
var zoom = 1;

var playerName;

var gridSize = 50;

function setup() {
  var canvas = createCanvas(700, 700);
  canvas.parent('canvas-container');

  playerName = prompt("Enter your name:", "Player");
  if (playerName == null || playerName.trim() === "") {
    playerName = "Anonymous";
  }

  socket = io.connect('http://localhost:3000');


  blob = new Blob(random(width), random(height), random(8, 24));
  var data = {
    x: blob.pos.x,
    y: blob.pos.y,
    r: blob.r,
    name: playerName
  };
  socket.emit('start', data);

  socket.on('heartbeat', function(data) {
    blobs = data;
    updatePlayerList();
  });

  socket.on('eaten', function() {
    blob = new Blob(random(width), random(height), random(8, 24));
    var data = {
      x: blob.pos.x,
      y: blob.pos.y,
      r: blob.r,
      name: playerName
    };
    socket.emit('start', data);
  });
}

function draw() {
  background(0);

  translate(width / 2, height / 2);
  var newzoom = 64 / blob.r;
  zoom = lerp(zoom, newzoom, 0.1);
  scale(zoom);
  translate(-blob.pos.x, -blob.pos.y);

  drawGrid();
  
  for (var i = blobs.length - 1; i >= 0; i--) {
    var id = blobs[i].id;
    if (id !== socket.id) {
      fill(0, 0, 255);
      ellipse(blobs[i].x, blobs[i].y, blobs[i].r * 2, blobs[i].r * 2);
      
      fill(255);
      textAlign(CENTER);
      textSize(4);
      text(blobs[i].name, blobs[i].x, blobs[i].y + blobs[i].r + 5);

      if (blob.eats(blobs[i])) {
        socket.emit('eat', blobs[i].id);
      }
    }
  }
    
  blob.show(playerName);
  
  if (mouseIsPressed) {
    blob.update();
  }
  blob.constrain();

  var data = {
    x: blob.pos.x,
    y: blob.pos.y,
    r: blob.r
  };
  socket.emit('update', data);
}