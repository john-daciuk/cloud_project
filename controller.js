const gridSize = 8;
const streakNeeded = 4;
const Model = new model(gridSize, streakNeeded);
const View = new view(Model);

View.drawBoard();
document.getElementById("status").innerHTML =  streakNeeded + " in a row to win";
var socket = null;
const endpoint = "wss://6yv87nul60.execute-api.us-east-1.amazonaws.com/test";
connectToWebSocket();

function clicked(row, col, byOpponent) {
  if (!byOpponent) {
    sendMessage(String(row) + " " + String(col));
  }
  document.getElementById("status").innerHTML =  "";
  if (Model.winner == null) {
    Model.makeMove(row, col);
    if (Model.winner != null) {
      gameOver();
    }
  } else {
    restartGame();
  }
  View.refresh();
}

function restartGame() {
  Model.clean();
  document.getElementById("status").innerHTML = "";
}

function gameOver() {
  document.getElementById("status").innerHTML = "Player " + Model.winner + " wins, click to restart.";
  var chime = new Audio("winChime.mp3");
  chime.play();
}
    
function sendMessage(move){
    payload = { "action": "sendmessage", "message": move };
    socket.send(JSON.stringify(payload));
}

function connectToWebSocket(){
    webSocketConnection = endpoint;
    socket = new WebSocket(webSocketConnection);

    socket.onopen = function(event) {
      console.log("socket connection is open");
    };

    socket.onmessage = function(event) {
      moves = parseMoveData(event);
      console.log("got event:", parseMoveData(event));
      clicked(...moves, true);
    };

    socket.onerror = function(event) {
        console.error("WebSocket error observed:", event);
    };

    socket.onclose = function(event) {
        console.log("socket connection closed");
    };
}

function parseMoveData(event) {
  const arr = event.data.split(":")[1].split(" ");
  return arr.slice(1,3).map(Number);
}
