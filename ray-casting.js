const map = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

function draw_map() {
  ctx.beginPath();
  ctx.fillStyle = 'blue';
  for (let i = 0; i < map2dWidth / pixelSize; ++i) {
    for (let y = 0; y < map2dHeight / pixelSize; ++y) {
      if (map[i][y])
        ctx.fillRect(y * pixelSize, i * pixelSize, pixelSize, pixelSize);
    }
  }
}

function draw_ray() {
  ctx.beginPath()
  ctx.strokeStyle = 'red';

  let steps = map2dWidth;
  let iDis = 0;
  for (let i = rotateCircleRadius; i < steps + rotateCircleRadius; i += pixelSize) {
    var x2 = x + map2dWidth * Math.cos(2 * Math.PI * i / steps / 4);
    var y2 = y + map2dHeight * Math.sin(2 * Math.PI * i / steps / 4);

    rayDistances[iDis] = 1;

    for (let j = 0; j < map2dHeight; j += 10) {
      rayDistances[iDis]++;

      let posX = x + j * Math.cos(2 * Math.PI * i / steps / 4);
      let posY = y + j * Math.sin(2 * Math.PI * i / steps / 4);

      posX = posX / pixelSize;
      posY = posY / pixelSize;

      if (posX < 0) {
        posX = 0;
      } else if (posX >= widthForPixel) {
        posX = widthForPixel;
      }

      if (posY < 0) {
        posY = 0;
      } else if (posY >= heightForPixel) {
        posY = heightForPixel;
      }

      if (map[Math.round(posY)][Math.round(posX)] ||
          map[Math.round(posY - 1)][Math.round(posX)]) {
        x2 = posX * pixelSize;
        y2 = posY * pixelSize;
        break;
      }
    }
    iDis++;
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
  }

  ctx.stroke();
  draw_walls();
}

function draw_walls() {
  ctx.clearRect(map2dWidth, 0, canvas.width, canvas.height);
  ctx.beginPath();
  
  for (let i = 0; i < rayDistances.length; ++i) {

    for (let j = 0; j < canvas.height; ++j) {
      ctx.fillStyle = 'blue';
      ctx.fillRect(map2dWidth + i * pixelSize, map2dWidth - j * pixelSize, pixelSize, pixelSize);
    }

    for (let j = 0; j < rayDistances[i]; ++j) {
      ctx.fillStyle = 'white';
      ctx.fillRect(map2dWidth + i * pixelSize, map2dWidth - j * pixelSize, pixelSize, pixelSize);
      ctx.fillRect(map2dWidth + i * pixelSize, 0 + j * pixelSize, pixelSize, pixelSize);
    }
  }
}

function draw_player() {
  ctx.clearRect(0, 0, map2dWidth, map2dHeight);

  draw_ray();

  ctx.beginPath()
  ctx.fillStyle = 'lightgreen';
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
  if (y >= map2dHeight) y = map2dHeight - 5;
  draw_player()
}

function right() {
  x += pixelSize;
  if (x >= map2dWidth) x = map2dWidth - 5;
  draw_player()
}

function left() {
  x -= pixelSize;
  if (x < 0) x = pixelSize;
  draw_player()
}

function rotate_right() {
  rotateCircleRadius += 45;
  draw_player()
}

function rotate_left() {
  rotateCircleRadius -= 45;
  draw_player()
}