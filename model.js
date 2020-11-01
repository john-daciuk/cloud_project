
class model {
  constructor(gridSize, streakNeeded) {
    this.gameMap = [];
    this.gridSize = gridSize;
    for (var i=0; i<this.gridSize; i++) {
      this.gameMap.push(new Array(this.gridSize).fill(0));
    }
    this.player = 1;
    this.winner = null;
    this.streakNeeded = streakNeeded;
    this.winLoc = null;
  }

  clean() {
    this.gameMap = [];
    for (var i=0; i<this.gridSize; i++) {
      this.gameMap.push(new Array(this.gridSize).fill(0));
    }
    this.winner = null;
    this.player = 1;
    this.winLoc = null;
  }

  togglePlayer() {
    this.player == 1 ? this.player = 2 : this.player = 1
  }

  makeMove(row, col) {
    if (this.gameMap[row][col] == 0) {
      this.gameMap[row][col] = this.player;
      this.togglePlayer();
      this.checkWin();
    }
  }

  checkBounds(row, col) {
    return (row >= 0 && row < this.gameMap.length && col >=0 && col < this.gameMap.length);
  }

  checkWin() {
    for (var i=0; i<this.gameMap.length; i++) {
      for (var j=0; j<this.gameMap.length; j++) {
        if (this.gameMap[i][j] != 0) {
          var p = this.gameMap[i][j]
          
          // check row
          if (this.checkWinHelper(i, j, 0, 1, p)) {
            return;
          }

          // check col
          if (this.checkWinHelper(i, j, 1, 0, p)) {
            return;
          }

          // check uphill
          if (this.checkWinHelper(i, j, -1, 1, p)) {
            return;
          }

          // check downhill
          if (this.checkWinHelper(i, j, 1, 1, p)) {
            return;
          }
        }
      }
    }
  }

  checkWinHelper(i, j, rm, cm, p) {
    var consec = 1;
    for (var k=1; k<this.streakNeeded; k++) {
      var row = i + rm * k;
      var col = j + cm * k;
      if (this.checkBounds(row, col) && this.gameMap[row][col] == p) {
        consec += 1;
        if (consec >= streakNeeded) {
          this.winner = p;
          this.winLoc = [i, j, row, col];
          return true;
        }
      }
    }
    return false;
  }

}
