function draw_2d_map() {
  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.stroke();
}
var testeauxx = 100;
var testeauxy = 50;
var testeauxwidth = 80;

function test() {
  ctx.beginPath()
  ctx.fillRect(testeauxx, testeauxy, testeauxwidth, 1);
}

function ray() {
  ctx.beginPath()
  ctx.strokeStyle = 'red';

  let steps = canvas.width / 2
  for (let i = r; i < steps + r; ++i) {
    var auxx = x + canvas.height * Math.cos(2 * Math.PI * i / steps / 2)
    var auxy = y + canvas.height * Math.sin(2 * Math.PI * i / steps / 2)
    
    if (auxx >= (testeauxx-testeauxwidth) && auxx <= (testeauxx+testeauxwidth+60)
    && auxy <= testeauxy) {
      continue;
    }
    
    ctx.moveTo(x, y)
    ctx.lineTo(auxx, auxy);
    // ctx.lineTo(auxy+5, auxx+10);
  }
  ctx.stroke()
}

function draw_player() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ray();

  ctx.beginPath()
  ctx.fillStyle = 'blue';
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(r * Math.PI / 180);
  ctx.fillRect(-5, -5, 10, 10);
  ctx.restore();

  draw_2d_map();
  test();
}

function up() {
  y -= 10;
  if (y < 0) y = 5;
  draw_player()
}

function down() {
  y += 10;
  if (y >= canvas.height) y = canvas.height - 5;
  draw_player()
}

function right() {
  x += 10;
  if (x >= canvas.width) x = canvas.width - 5;
  draw_player()
}

function left() {
  x -= 10;
  if (x < 0) x = 5;
  draw_player()
}

function rotate_right() {
  r += 10;
  draw_player()
}

function rotate_left() {
  r -= 10;
  draw_player()
}
