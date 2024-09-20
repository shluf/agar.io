function drawGrid() {
    
    var startX = floor(blob.pos.x / gridSize) * gridSize - width / (2 * zoom);
    var startY = floor(blob.pos.y / gridSize) * gridSize - height / (2 * zoom);
    var endX = startX + width / zoom + gridSize;
    var endY = startY + height / zoom + gridSize;
    
    for (var x = startX; x < endX; x += gridSize) {
      for (var y = startY; y < endY; y += gridSize) {
        fill(0);
        stroke(100);
        rect(x , y, gridSize, gridSize);
      }
    }
  }