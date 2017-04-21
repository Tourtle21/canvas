require(['socket.io/socket.io.js']);
//https://glacial-springs-23266.herokuapp.com/
var socket = io.connect('https://glacial-springs-23266.herokuapp.com/');
function startGame() {
  if (document.getElementById("playerName").value.length >= 1) {
    document.getElementById("newPlayer").style.display = "none";
    document.getElementById("game").style.display = "block";
    socket.emit("newPlayer", document.getElementById("playerName").value)
    document.addEventListener("keydown", (e) => {keyState[e.code] = true})

    document.addEventListener("keyup", (e) => {keyState[e.code] = false})

    document.getElementById("game").addEventListener("click", function(e) {
      if (shoot >= reloadTime) {
        shoot = 0;
        socket.emit('shoot', [left - (screenWidth) + 10, posTop - (screenHeight) + 10, e.clientX - (screenWidth), e.clientY - (screenHeight), playerId, bulletDistance, bulletSpeed]);
      }
    })
  }
}
var playerId = 0;
var left = window.innerWidth/2-392;
var posTop = window.innerHeight/2-292;
var screenWidth = window.innerWidth/2-392;
var screenHeight = window.innerHeight/2-292;
var keyState = [];
var score = 0;
var remove = true;
var shoot = true;
var bdx = [];
var bdy = [];
var bx = [];
var by = [];
var ba = [];
var bd = [];
var bs = [];
var reloadTime = 100;
var bulletDistance = 5;
var speed = 1;
var bulletSpeed = 5;
var types = [];
var amounts = [];
socket.on("addPoint", function(data) {
  score += 1;
  div = document.createElement("div");
  div.className = "power";
  div.style.width = "10px";
  div.style.height = "10px";
  div.style.background = "tan";
  div.style.position = "absolute";
  div.style.left = data[1] + screenWidth - 5 + "px";
  div.style.top = data[2] + screenHeight - 5 + "px";
  div.style.borderRadius = "50%";
  types.push(data[3]);
  amounts.push(data[4]);
  document.getElementById("game").append(div);
  document.getElementById("score").innerHTML = "Score: " + score;
})

setInterval(function() {
  if (ba.length >= 1) {
    console.log(ba)
  }
  for (var i = 0; i < bx.length; i++) {
    bx[i] -= bdx[i]*bs[i];
    by[i] -= bdy[i]*bs[i];
    ba[i] += 1;
    document.getElementsByClassName("bullet")[i].style.left = bx[i] + "px";
    document.getElementsByClassName("bullet")[i].style.top = by[i] + "px";
    checkCollision(document.getElementsByClassName("enemy"));
  }
  if (ba[0] > 10) {
    bx.splice(0, 1);
    by.splice(0, 1);
    ba.splice(0, 1);
    bdx.splice(0, 1);
    bdy.splice(0, 1);
    bs.splice(0, 1);
    document.getElementById("game").removeChild(document.getElementsByClassName("bullet")[0]);
  }
  var changed = false;
  if (keyState["KeyW"]) {
    if (posTop - 5 <= screenHeight) {
      posTop = screenHeight;
      changed = true;
    }
    else {
      posTop -= speed;
      changed = true;
    }
  }
  if (keyState["KeyS"]) {
    if (posTop + 5 >= window.innerHeight/2+288) {
      posTop = window.innerHeight/2+288;
      changed = true;
    }
    else {
      posTop += speed;
      changed = true;
    }
  }
  if (keyState["KeyD"]) {
    if (left + 5 >= window.innerWidth/2+388) {
      left = window.innerWidth/2+388;
      changed = true;
    }
    else {
      left += speed;
      changed = true;
    }
  }
  if (keyState["KeyA"]) {
    if (left - 5 <= screenWidth) {
      left = screenWidth;
      changed = true;
    }
    else {
      left -= speed;
      changed = true;
    }
  }
  if (shoot <= reloadTime - 1) {
    shoot += 1;
    document.getElementById("reloadBar").style.width = shoot/reloadTime * 100 + "%";
  }
  if (changed) {
    checkCollision(document.getElementsByClassName("power"));
    checkCollision(document.getElementsByClassName("point"));
    socket.emit("move", [posTop - (screenHeight), left - (screenWidth), playerId]);
  }
}, 30)
