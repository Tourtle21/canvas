var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('/index.html');
});
screenWidth = 0;
screenHeight = 0;
playerCount = 0;
id = 0;
allClients = [];
board = [];
points = [];
names = [];
ids = [];
amountOfPoints = 0;
io.on('connection', function (socket) {
  socket.on("newPlayer", function(data) {
    playerCount++;
    id++;
    socket.emit('count', { playerCount: playerCount, playerId: id, board: board, points: points, names: names});
    allClients.push(socket);
    board.push([0, 0, id])
    names.push(data)
    ids.push(id);
    socket.on('disconnect', function () {
      var i = allClients.indexOf(socket);
      playerInd = board[i][2];
      board.splice(i, 1);
      allClients.splice(i, 1);
      names.splice(i, 1);
      ids.splice(i, 1);
      playerCount--;
      io.emit('left', { playerCount: playerCount, playerId: playerInd});
    });
  })
  socket.on("move", function(data) {
    if (data.length > 3) {
      screenWidth = data[3]
      screenHeight = data[4]
      io.emit('moved', [data[0], data[1], data[2], data[5]])
    } else {
      io.emit('moved', data)
    }
    var i = allClients.indexOf(socket);
    board[i][0] = data[0];
    board[i][1] = data[1];
  })
  socket.on("hit", function(data) {
    points.splice(data[0], 1);
    io.emit('remove', data);
  });
  socket.on("shoot", function(data) {
    io.emit("shot", data);
  })
  socket.on("killer", function(data) {
    var i = ids.indexOf(parseInt(data[0]));
    allClients[i].emit("addPoint", data);
  })
});
setInterval(function() {
  if (playerCount > 1) {
    amountOfPoints += 1;
    leftRand = Math.random();
    topRand = Math.random();
    points.push([leftRand, topRand])
    io.emit("spawnCheck", [leftRand, topRand])
  } else {
    points = [];
  }
}, 5000)

server.listen(process.env.PORT || 8080);
console.log("Multiplayer app listening on port 8080");
