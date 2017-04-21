socket.on('shot', function(data) {
  xmovement = ((data[0] + screenWidth) - (data[2] + screenWidth));
  ymovement = ((data[1] + screenHeight) - (data[3] + screenHeight));
  distance = Math.sqrt(xmovement**2 + ymovement**2);

  div = document.createElement("div");
  if (data[4] != playerId) {
    div.className = "bullet enemy person" + data[4];
  } else {
    div.className = "bullet";
  }
  div.style.position = "absolute";
  div.style.left = data[0] + screenWidth  + "px";
  div.style.top = data[1] + screenHeight  + "px";
  document.getElementById("game").append(div);
  bdx.push((xmovement/distance))
  bdy.push((ymovement/distance))
  bx.push(data[0] + screenWidth - ((xmovement)/distance)*data[6])
  by.push(data[1] + screenHeight - ((ymovement)/distance)*data[6])
  bs.push(data[6])
  ba.push(-data[5]);
})


socket.on('remove', function(data) {
  if (data[1] == playerId) {
    remove = true;
    score += 1;
    document.getElementById("score").innerHTML = "Score: " + score;
  }
  document.getElementById("game").removeChild(document.getElementsByClassName("point")[data[0]]);
})
