function checkCollision(item) {
  points = item;
  for (var i = 0; i < points.length; i++) {
    r1 = 10
    if (item == document.getElementsByClassName("point")) {
      r2 = 5
    } else {
      r2 = 2.5
    }
    x1 = left + r1
    y1 = posTop + r1;
    x2 = parseInt(points[i].style.left.slice(0, -2)) + r2;
    y2 = parseInt(points[i].style.top.slice(0, -2)) + r2;
    if ((x2-x1)**2 + (y1-y2)**2 <= (r1+r2)**2 && remove) {
      if (item == document.getElementsByClassName("enemy")) {
        person = document.getElementsByClassName("enemy")[i];
        num = Math.random();
        type = "";
        amount = 0;
        if (num >= .75) {
          type = "reloadTime";
          amount = reloadTime;
        }
        else if (num >= .5) {
          type = "bulletDistance";
          amount = bulletDistance
        }
        else if (num >= .25) {
          type = "speed";
          amount = speed;
        }
        else {
          type = "bulletSpeed";
          console.log(bulletSpeed);
          amount = bulletSpeed;
        }
        socket.emit("killer", [person.className.slice(person.className.indexOf("on") + 2), parseInt(person.style.left.slice(0, -2)) - screenWidth, parseInt(person.style.top.slice(0, -2)) - screenHeight, type, amount]);
        left = window.innerWidth/2-366;
        posTop = window.innerHeight/2-292;
        socket.emit("move", [posTop - (screenHeight), left - (screenWidth) - 26, playerId, i]);
      }else if (item == document.getElementsByClassName("point")){
        socket.emit("hit", [i, playerId])
        remove = false;
      } else {
        if (types[i] == "reloadTime") {
          console.log(reloadTime, (101 - amounts[i]))
          reloadTime -= (101 - amounts[i]);
          if (reloadTime <= 0) {
            reloadTime = 0;
          }
          console.log(reloadTime);
        }
        else if (types[i] == "bulletDistance") {
          bulletDistance += amounts[i] - 4;
          console.log(bulletDistance);
        }
        else if (types[i] == "speed") {
          speed += ((amounts[i] - 1) * 10 + 1) * 0.1;
          console.log(speed);
        }
        else {
          bulletSpeed += ((amounts[i] - 5) * 10 + 1) * 0.1;
          console.log(bulletSpeed)
        }
        types.splice(i, 1);
        amounts.splice(i, 1);
        document.getElementById("game").removeChild(document.getElementsByClassName("power")[i]);
      }
    }
  }
}
