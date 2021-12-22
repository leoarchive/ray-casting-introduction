const map = 
[
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], 
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], 
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], 
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], 
  [1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1], 
  [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1], 
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1], 
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1], 
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1], 
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1], 
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1], 
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1], 
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1], 
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1], 
  [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1], 
  [1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1], 
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], 
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], 
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], 
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], 
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], 
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], 
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],  
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], 
]

function draw_map() {
  ctx.beginPath();
  ctx.fillStyle = 'blue';
  for (let i = 0; i < canvas.width / pixelSize; ++i) {
    for (let y = 0; y < canvas.height / pixelSize; ++y) {
      if (map[i][y])
        ctx.fillRect(y * pixelSize, i * pixelSize, pixelSize, pixelSize);
    }
  }
}

function ray() {
  ctx.beginPath()
  ctx.strokeStyle = 'red';

  let steps = canvas.width / 2
  for (let i = r; i < steps + r; i += pixelSize) {
    var x2 = x + canvas.width * Math.cos(2 * Math.PI * i / steps / 4);
    var y2 = y + canvas.height * Math.sin(2 * Math.PI * i / steps / 4);

    for (let j = 0; j < canvas.height; j += 10) {
      let posX = x + j * Math.cos(2 * Math.PI * i / steps / 4);
      let posY = y + j * Math.sin(2 * Math.PI * i / steps / 4);

      posX = posX / pixelSize;
      posY = posY / pixelSize;

      if (posX < 0) {
        posX = 0;
      } else if (posX >= wfp) {
        posX = wfp;
      }

      if (posY < 0) {
        posY = 0;
      } else if (posY >= hfp) {
        posY = hfp;
      }

      if (map[Math.round(posY)][Math.round(posX)] ||
          map[Math.round(posY - 1)][Math.round(posX)]) {
        x2 = posX * pixelSize;
        y2 = posY * pixelSize;
        break;
      }
    }

    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
  }
  
  ctx.stroke()
}

function draw_player() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ray();

  ctx.beginPath()
  ctx.fillStyle = 'pink';
  ctx.arc(x, y, pixelSize / 2, 0, 2 * Math.PI);
  ctx.fill();

  draw_map();
}

function up() {
  y -= pixelSize;
  if (y < 0) y = pixelSize;
  draw_player()
}

function down() {
  y += pixelSize;
  if (y >= canvas.height) y = canvas.height - 5;
  draw_player()
}

function right() {
  x += pixelSize;
  if (x >= canvas.width) x = canvas.width - 5;
  draw_player()
}

function left() {
  x -= pixelSize;
  if (x < 0) x = pixelSize;
  draw_player()
}

function rotate_right() {
  r += 45;
  draw_player()
}

function rotate_left() {
  r -= 45;
  draw_player()
}
