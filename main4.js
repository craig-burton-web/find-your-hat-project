const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this.field = field;
    this.col = 0;
    this.row = 0;
    this.field[0][0] = pathCharacter;
  }

  playGame() {
    let playing = true;
    while (playing) {
      this.print();
      this.move();
      this.text();
      if (
        this.row < 0 ||
        this.col < 0 ||
        this.row >= this.field.length ||
        this.col >= this.field[0].length ||
        this.field[this.row][this.col] === "0" ||
        this.field[this.row][this.col] === "^"
      ) {
        playing = false;
      }
      this.field[this.row][this.col] = pathCharacter;
    }
  }

  text() {
    return this.row < 0
      ? console.log("out of bounds")
      : this.col < 0
      ? console.log("foul!")
      : this.row >= this.field.length
      ? console.log("Here be Dragons")
      : this.col >= this.field[0].length
      ? console.log("You shall not PASSS")
      : this.field[this.row][this.col] === "0"
      ? console.log("fell in hole")
      : this.field[this.row][this.col] === "^"
      ? console.log("found ur hat!")
      : "none";
  }

  move() {
    const response = prompt("which way?").toLowerCase();
    return response === "u"
      ? (this.row -= 1)
      : response === "d"
      ? (this.row += 1)
      : response === "l"
      ? (this.col -= 1)
      : response === "r"
      ? (this.col += 1)
      : "none";
  }

  print(field) {
    let str = "";
    for (let i = 0; i < this.field.length; i++) {
      str += "\n" + this.field[i].join(" ");
    }
    console.log(str);
  }

  static generateField(rows, cols, percent) {
    const field = Array.from(Array(rows), () => new Array(cols));
    for (let i = 0; i < field.length; i++) {
      for (let j = 0; j < field[i].length; j++) {
        field[i][j] = "░";
      }
    }

    const fieldSize = rows * cols;
    const numHoles = Math.floor(fieldSize * (percent / 100));
    let holeCount = 0;

    while (holeCount <= numHoles) {
      let randRow = Math.floor(Math.random() * rows);
      let randCol = Math.floor(Math.random() * cols);
      field[randRow][randCol] = "0";
      holeCount++;
    }

    let hatRow = Math.floor(Math.random() * rows);
    let hatCol = Math.floor(Math.random() * cols);
    field[hatRow][hatCol] = "^";

    field[0][0] = "*";
    return field;
  }
}

const field1 = new Field(Field.generateField(10, 10, 20));
field1.playGame();
