socket.on('count', function(data) {
  if (playerId == 0) {
    playerId = data.playerId
    for (i = 0; i < data.board.length; i++) {
      newPlayerId = data.board[i][2];
      div = document.createElement("div");
      div.className = "player";
      div.id = "player" + newPlayerId;
      div.style.position = "absolute";
      div.style.left = data.board[i][1] + (screenWidth) + "px";
      div.style.top = data.board[i][0] + (screenHeight) + "px";
      div.style.background = "blue";
      div.innerHTML = "<span class='name'>"+data.names[i]+"</span>";
      document.getElementById("game").append(div);
    }
    for (i = 0; i < data.points.length; i++) {
      div = document.createElement("div");
      div.className = "point";
      div.style.position = "absolute";
      var spawnLeft = screenWidth;
      var spawnTop = screenHeight;
      var spawnRight = window.innerWidth/2+424;
      var spawnBottom = window.innerHeight/2+297;
      leftSide = Math.floor(data.points[i][0] * (spawnRight - spawnLeft)) + spawnLeft;
      topSide = Math.floor(data.points[i][1] * (spawnBottom - spawnTop)) + spawnTop;
      div.style.left = leftSide + "px";
      div.style.top = topSide + "px";
      div.style.background = "green";
      document.getElementById("game").append(div);
    }
    document.getElementsByClassName("player")[0].id = "player" + playerId;
    document.getElementById("player" + playerId).style.left = left + "px";
    document.getElementById("player" + playerId).style.top = posTop + "px";
    document.getElementById("player" + playerId).style.background = "red";
    document.getElementById("player" + playerId).innerHTML = "<span class='name'>"+document.getElementById("playerName").value+"</span>";
    socket.emit("move", [posTop - (screenHeight), left - (screenWidth), playerId, window.innerWidth, window.innerHeight, document.getElementById("playerName").value])
  }
})
socket.on('left', function(data) {
  document.getElementById("game").removeChild(document.getElementById("player" + data.playerId));
})
