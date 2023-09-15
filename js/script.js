var btn = document.querySelector("#start");
var c = document.querySelector("#canvas");
var ctx = c.getContext("2d");
c.width = 750;
c.height = 350;
var perm = [];
while (perm.length < 255) {
  while (perm.includes((val = Math.floor(Math.random() * 255))));
  perm.push(val);
}
var level = 0.008
var lerp = (a, b, t) => a + ((b - a) * (1 - Math.cos(t * Math.PI))) / 2;
var noise = (x) => {
  x = (x * level) % 255;
  return lerp(perm[Math.floor(x)], perm[Math.ceil(x)], x - Math.floor(x));
};

var player = new (function () {
  this.x = c.width / 2;
  this.y = 0;
  this.ySpeed = 0;
  this.rot = 0;
  this.rSpeed = 0;

  var img = new Image();
  img.src = "./img/motorbike.png";
  
  // Add any other styling here

  this.draw = function () {
    var p1 = c.height - noise(t + this.x) * 0.30;
    var p2 = c.height - noise(t +5+ this.x) * 0.30;

    var grounded = 0;
    if (p1 - 15 > this.y) {
      this.ySpeed += 0.1;
    } else {
      this.ySpeed -= this.y - (p1 - 15);
      this.y = p1 - 15;
      grounded = 1;
    }

    if (!playing || (grounded && Math.abs(this.rot) > Math.PI * 0.5)) {
      playing = false;
      this.rSpeed = 5;
      k.ArrowUp = 1;
      this.x -= speed * 2.5;
    }

    var angle = Math.atan2(p2 - 15 - this.y, this.x + 5 - this.x);
    this.y += this.ySpeed;

    if (grounded && playing) {
      this.rot -= (this.rot - angle) * 0.5;
      this.rSpeed = this.rSpeed - (angle - this.rot);
    }
    this.rSpeed += (k.ArrowLeft - k.ArrowRight) * 0.05;
    this.rot -= this.rSpeed * 0.1;
    if (this.rot > Math.PI) this.rot = -Math.PI;
    if (this.rot < -Math.PI) this.rot = Math.PI;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    ctx.drawImage(img, -30, -30, 50, 50);
    ctx.restore();
  };
})();

var t = 0;
var speed = 0;
var playing = true;
var k = { ArrowUp: 0, ArrowDown: 0, ArrowLeft: 0, ArrowRight: 0 };
function loop() {
  speed -= (speed - (k.ArrowUp - k.ArrowDown)) * 0.01;
  t += 10 * speed;
  ctx.fillStyle = "#B5DFE0";
  ctx.fillRect(0, 0, c.width, c.height);

  ctx.fillStyle = "#d7371f";
  ctx.beginPath();
  ctx.moveTo(0, c.height);
  for (let i = 0; i < c.width; i++)
    ctx.lineTo(i, c.height - noise(t + i) * 0.30);

  ctx.lineTo(c.width, c.height);
  ctx.fill();

  player.draw();

  // Check if 3 seconds have passed to increase the level
/*   if (performance.now() - startTime >= 800) {
    level += 0.00001;
    startTime = performance.now(); // Reset the timer
  } */
  
  requestAnimationFrame(loop);
}

var startTime = performance.now(); 


onkeydown = (d) => (k[d.key] = 1);
onkeyup = (d) => (k[d.key] = 0);

btn.addEventListener("click", () => {
  window.location.reload();
});

// Add event listeners for mobile controls
// Add event listeners for mobile controls
document
  .getElementById("mobileUpButton")
  .addEventListener("touchstart", function (event) {
    event.preventDefault(); // Prevent default touch event behavior
    k.ArrowUp = 1;
    // Handle the "Up" action here
  });

document
  .getElementById("mobileDownButton")
  .addEventListener("touchstart", function (event) {
    event.preventDefault(); // Prevent default touch event behavior
    k.ArrowDown = 1;
    // Handle the "Down" action here
  });

document
  .getElementById("mobileLeftButton")
  .addEventListener("touchstart", function (event) {
    event.preventDefault(); // Prevent default touch event behavior
    k.ArrowLeft = 1;
    // Handle the "Left" action here
  });

document
  .getElementById("mobileRightButton")
  .addEventListener("touchstart", function (event) {
    event.preventDefault(); // Prevent default touch event behavior
    k.ArrowRight = 1;
    // Handle the "Right" action here
  });

// Add event listeners for mobile control release (touchend)
document
  .getElementById("mobileUpButton")
  .addEventListener("touchend", function (event) {
    event.preventDefault(); // Prevent default touch event behavior
    k.ArrowUp = 0;
  });

document
  .getElementById("mobileDownButton")
  .addEventListener("touchend", function (event) {
    event.preventDefault(); // Prevent default touch event behavior
    k.ArrowDown = 0;
  });

document
  .getElementById("mobileLeftButton")
  .addEventListener("touchend", function (event) {
    event.preventDefault(); // Prevent default touch event behavior
    k.ArrowLeft = 0;
  });

document
  .getElementById("mobileRightButton")
  .addEventListener("touchend", function (event) {
    event.preventDefault(); // Prevent default touch event behavior
    k.ArrowRight = 0;
  });

loop();
