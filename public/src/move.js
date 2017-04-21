socket.on('moved', function(data) {
  if (playerId !== 0) {
    if (document.getElementById("player" + data[2])) {
      move(data[2], data[1] + (screenWidth), data[0] + (screenHeight));
    } else {
      div = document.createElement("div");
      div.className = "player";
      div.id = "player" + data[2];
      div.style.position = "absolute";
      div.style.left = data[1] + (screenWidth) + "px";
      div.style.top = data[0] + (screenHeight) + "px";
      div.innerHTML = "<span class='name'>"+data[3]+"</span>"
      document.getElementById("game").append(div);
    }
  }
})

function move(player, x, y) {
  newPlayer = document.getElementById("player" + player);
  newPlayer.style.left = x + "px";
  newPlayer.style.top = y + "px";
}
