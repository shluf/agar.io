function Blob(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;
    this.vel = createVector(0, 0);
  
    this.update = function() {
      var newvel = createVector(mouseX - width / 2, mouseY - height / 2);
      newvel.div(50);
      newvel.limit(3);
      this.vel.lerp(newvel, 0.2);
      this.pos.add(this.vel);
    };
  
    this.eats = function(other) {
      var d = p5.Vector.dist(this.pos, createVector(other.x, other.y));
      if (d < this.r + other.r && this.r > other.r) {
        var sum = PI * this.r * this.r + PI * other.r * other.r;
        this.r = sqrt(sum / PI);
        return true;
      } else {
        return false;
      }
    };
  
    this.constrain = function() {
      this.pos.x = constrain(this.pos.x, -width / 4, width / 4);
      this.pos.y = constrain(this.pos.y, -height / 4, height / 4);
    };
  
    this.show = function(uname) {
      fill(255);
      ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
      fill(0, 255, 0);
      textAlign(CENTER);
      textSize(4);
      text(uname, this.pos.x, this.pos.y + this.r + 5);
    };
  }