const gridSize = 8;
const streakNeeded = 4;
const Model = new model(gridSize, streakNeeded);
const View = new view(Model);
var userName;
var playerRole;

View.drawBoard();
document.getElementById("status").innerHTML = streakNeeded + " in a row to win";
var socket = null;
const endpoint = "wss://6yv87nul60.execute-api.us-east-1.amazonaws.com/test";

document.getElementById("submit").onclick = function(){
  userName = document.getElementById("userName").value;
  playerRole = parseInt(document.getElementById("playerRole").value);
  document.getElementById("userName").disabled = true;
  document.getElementById("playerRole").disabled = true;
  connectToWebSocket();
};



function clicked(row, col, byOpponent) {
  if (!byOpponent && playerRole != Model.player) {return;}
  if (!byOpponent) {sendMessage(String(row) + " " + String(col));}
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
    payload = {"action": "sendmessage", "message": move};
    socket.send(JSON.stringify(payload));
}

function connectToWebSocket(){
    socket = new WebSocket(endpoint);

    socket.onopen = function(event) {
      document.getElementById("submit").innerHTML = 'Connected';
    };

    socket.onmessage = function(event) {
      moves = parseMoveData(event);
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







// # EVENTS TO FRONTEND
// # move event to the frontend
// # {"action":"sendMove", "move": "row col"}
// # {"action": "startGame", "gameId": "1234", "opponentId": "0282", "playerRole": "1"}




// # EVENTS TO WEBSOCKET
// # move event to WebSocket
// # {"action":"sendMove", "move": "row col", "gameId":"987", "playerId":"12345", "opponentId":"7654"}
// # {"action":"connect", "playerId":"123"}
// # {"action":"createGame"}


//textbox
//for user to type in userid, before they hit play


// buttons
// play

// add frontend interface to see player 1 or player 2, as well as
// whether game is currently playing, and how many players have
// joined the game

// need to add to javascript which player I am
// stop clicking when it's not my turn
