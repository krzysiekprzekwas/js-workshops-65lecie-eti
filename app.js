/*
 * Const
 */
const WIDTH = 1200;
const HEIGHT = 900;
 
const LEFT = 65;
const RIGHT = 68;
const UP = 87;
const DOWN = 83;
 
const FOOD_COUNT = 50;
const FOOD_GENERATE = 0.1;
 
/*
 * Gloabal variables
 */
var movingLeft = false;
var movingRight = false;
var movingUp = false;
var movingDown = false;
 
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var player;
var food = [];
 
function keyPressed(e) {
      //console.log(e.which);
 
      if(e.which == LEFT)
            movingLeft = true;
      else if(e.which == RIGHT)
            movingRight = true;
      else if(e.which == UP)
            movingUp = true;
      else if(e.which == DOWN)
            movingDown = true;
}
function keyReleased(e) {
      //console.log(e.which);
 
      if(e.which == LEFT)
            movingLeft = false;
      else if(e.which == RIGHT)
            movingRight = false;
      else if(e.which == UP)
            movingUp = false;
      else if(e.which == DOWN)
            movingDown = false;
}
 
/*
 * Creating player
 */
function PLAYER(x, y, radius) {
      this.x = x;
      this.y = y;
      this.radius = radius;
};
PLAYER.prototype.draw = function() {
 
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'green';
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle="rgba(0, 255, 0, 0.3)";
      context.stroke();
      context.closePath();
}
PLAYER.prototype.movement = function() {
 
      var movement = 3;
 
      if(movingUp)
            player.y -= movement;
      if(movingDown)
            player.y += movement;
      if(movingLeft)
            player.x -= movement;
      if(movingRight)
            player.x += movement;
 
      if(player.x < 0)
            player.x = 0;
 
      if(player.y < 0)
            player.y = 0;
 
      if(player.x > WIDTH)
            player.x = WIDTH;
 
      if(player.y > HEIGHT)
            player.y = HEIGHT;
}
PLAYER.prototype.eat = function() {
 
      for(var i = 0; i < food.length; i++) {
 
            var dx = food[i].x - this.x;
            var dy = food[i].y - this.y;
 
            var distance = Math.sqrt( dx*dx + dy*dy );
 
            if(distance < this.radius)
            {
                  food.splice(i, 1);
                  player.radius += 1;
            }
      }
}
 
/*
 * Food
 */
function FOOD(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 9;
 
      this.red = Math.floor(Math.random() * 255);
      this.green = Math.floor(Math.random() * 255);
      this.blue = Math.floor(Math.random() * 255);
}
FOOD.prototype.draw = function() {
 
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'rgb(' + this.red + ', ' + this.green + ', ' + this.blue + ')';
      context.fill();
      context.closePath();
}
function generateFood() {
 
      var x = Math.random() * WIDTH;
      var y = Math.random() * HEIGHT;
 
      var foodPiece = new FOOD(x, y);
      food.push(foodPiece);
}
 
/*
 * Initalization
 */
function initalize() {
 
      // Create player
      player = new PLAYER(WIDTH / 2, HEIGHT / 2, 15);
 
      // Generate intial food
      for(var i = 0; i < FOOD_COUNT; i++)
            generateFood();
}
 
/*
 * Updating functions
 */
function update() {
 
      // CLear context
      context.clearRect(0, 0, WIDTH, HEIGHT);
 
      // Generate food
      if(Math.random() < FOOD_GENERATE)
            generateFood();
 
      // Moving
      player.movement();
 
      // Feed
      player.eat();
 
      // Redraw food
      for(var i = 0; i < food.length; i++)
            food[i].draw();
 
      // Redraw player
      player.draw();
}
 
 
 // Initalize player etc
 initalize();
 
 // Initalize loop
 setInterval(update, 25);
 