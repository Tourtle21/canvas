socket.on('spawnCheck', function(data) {
  var spawnLeft = screenWidth;
  var spawnTop = screenHeight;
  var spawnRight = window.innerWidth/2+424;
  var spawnBottom = window.innerHeight/2+297;
  leftSide = Math.floor(data[0] * (spawnRight - spawnLeft)) + spawnLeft;
  topSide = Math.floor(data[1] * (spawnBottom - spawnTop)) + spawnTop;
  div = document.createElement("div");
  div.className = "point";
  div.style.left = leftSide + "px";
  div.style.top = topSide + "px";
  document.getElementById("game").append(div);
})
