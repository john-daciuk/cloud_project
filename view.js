
class view {
  constructor(model) {
    this.canvas= document.getElementById('canvas');
    this.pr= window.devicePixelRatio;
    this.ctx= this.canvas.getContext('2d');
    this.canvas.style.width = Math.trunc(canvas.width/this.pr) + "px";
    this.canvas.style.height = Math.trunc(canvas.height/this.pr) + "px";
    this.ctx.scale(this.pr, this.pr);
    this.size = Number(canvas.style.width.slice(0,canvas.style.width.length - 2));
    this.gridSize = model.gridSize;
    this.squareWidth = this.size / this.gridSize;
    this.canvas.addEventListener('click', this.handleClick.bind(this));
    this.model=model;
    this.playerColors = {
      1:"9effb0",
      2:"ffff9e"
    };
  }


  handleClick(event) {
    const rect = this.canvas.getBoundingClientRect();
    var x = event.pageX - rect.left;
    var y = event.pageY- rect.top;
    var row = Math.trunc(y/this.squareWidth);
    var col = Math.trunc(x/this.squareWidth);
    clicked(row, col, false);
  }

  drawBoard() {
          this.ctx.lineCap = "butt";
          this.ctx.strokeStyle = "black";
          this.ctx.lineWidth = 8;
          this.ctx.strokeRect(0,0, this.size, this.size);
          this.ctx.lineWidth = 1.2;
          for (var i=0; i < 10; i++) {
            for (var j=0; j<10; j++) {
              this.ctx.strokeRect(j*this.squareWidth, i*this.squareWidth, this.squareWidth, this.squareWidth);
              this.ctx.stroke();
            }
          }
  };

  drawPiece(row, col, color) {
    var y = (row + .5) * this.squareWidth;
    var x = (col + .5) * this.squareWidth;
    this.ctx.beginPath();
    this.ctx.arc(x,y, this.squareWidth/2.6, 0, 2*Math.PI, true);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.lineWidth = .8;
    this.ctx.stroke();
  };

  clearAll() {
    this.ctx.clearRect(0,0, canvas.width, canvas.height);
    this.ctx.beginPath();
  }

  drawPieces() {
    for (var i=0; i<this.gridSize; i++) {
      for (var j=0; j<this.gridSize; j++) {
        if (this.model.gameMap[i][j] != 0) {
          this.drawPiece(i, j, this.playerColors[this.model.gameMap[i][j]]);
        }
      }
    }
  }

  drawStreak() {
    var y1 = (this.model.winLoc[0] + .5) * this.squareWidth;
    var x1 = (this.model.winLoc[1] + .5) * this.squareWidth;
    var y2 = (this.model.winLoc[2] + .5) * this.squareWidth;
    var x2 = (this.model.winLoc[3] + .5) * this.squareWidth;
    this.ctx.beginPath();
    this.ctx.moveTo(x1,y1);
    this.ctx.lineTo(x2,y2);
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = "rgba(153, 0, 255, .3)";
    this.ctx.stroke();
  }

  refresh() {
    this.clearAll();
    this.drawBoard();
    this.drawPieces();
    if (this.model.winLoc != null) {
      this.drawStreak()
    }
  }

}
