class Dice {
  throw() {
    return Math.floor(Math.random() * 6 + 1);
  }
}

class Tablero {
  constructor(playerOne, playerTwo, dice) {
    this.tablero = [];
    this.tablero.length = 100;
    this.tablero[0] = "start";
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.dice = dice;
    this.setSerpientes();
    this.setEscaleras();
  }
  setSerpientes() {
    this.tablero[10] = { serpiente: 5, escaleras: 0 };
    this.tablero[22] = { serpiente: 17, escaleras: 0 };
    this.tablero[33] = { serpiente: 26, escaleras: 0 };
    this.tablero[45] = { serpiente: 37, escaleras: 0 };
    this.tablero[59] = { serpiente: 51, escaleras: 0 };
    this.tablero[70] = { serpiente: 28, escaleras: 0 };
    this.tablero[89] = { serpiente: 44, escaleras: 0 };
  }
  setEscaleras() {
    this.tablero[5] = { escaleras: 10, serpiente: 0 };
    this.tablero[14] = { escaleras: 19, serpiente: 0 };
    this.tablero[24] = { escaleras: 46, serpiente: 0 };
    this.tablero[35] = { escaleras: 92, serpiente: 0 };
    this.tablero[80] = { escaleras: 98, serpiente: 0 };
  }
  startGame() {
    let winner = false;
    for (let i = 0; i <= this.tablero.length; i++) {
      winner = this.game(this.playerOne);
      if (winner) {
        i = 100;
        break;
      }
      winner = this.game(this.playerTwo);
      if (winner) {
        i = 100;
        break;
      }
    }
  }
  game(player) {
    let pass = false;
    let throwed = 0;
    throwed = this.dice.throw();
    pass = this.Evalsubstraction(throwed, player);
    console.log(
      `Jugador ${player.getName()} va en el lugar ${player.getPosition()}`
    );
    if (this.check(player) == true) {
      console.log(
        `Jugador ${player.getName()} subio/bajo a ${player.getPosition()}`
      );
    }
    return pass;
  }
  Evalsubstraction(throwed, player) {
    let position = player.getPosition();
    if (position + throwed > 100) {
      let lessTo100 = 100 - position;
      let substract = throwed - lessTo100;
      let total = 100 - substract;
      player.setPosition(total);
    } else {
      player.add(throwed);
      if (player.getPosition() === 100) {
        console.log(`El jugador ${player.getName()} Ganó`);
        return true;
      } else {
        return false;
      }
    }
  }
  check(player) {
    let position = player.getPosition();
    if (this.tablero[position] !== undefined) {
      if (this.tablero[position].escaleras !== 0) {
        player.setPosition(this.tablero[position].escaleras);
        console.log("Escalera!");
      } else if (this.tablero[player.getPosition()].serpiente !== 0) {
        player.setPosition(this.tablero[position].serpiente);
        console.log("Serpiente!");
        return true;
      }
    }
  }
}

class Jugadores {
  constructor(name) {
    this.player = 0;
    this.name = name;
  }
  add(p) {
    this.player += p;
  }
  getName() {
    return this.name;
  }
  setPosition(p) {
    this.player = p;
  }
  getPosition() {
    return this.player;
  }
}

let player1 = new Jugadores("Pablo");
let player2 = new Jugadores("Roberto");
let dice1 = new Dice();
let start = new Tablero(player1, player2, dice1);

// j    i
// [7]<>[0]
// [6]<>[1]
// [5]<>[2]
// [4]<>[3]
// [3]<>[4]
// [2]<>[5]
// [1]<>[6]
start.startGame();
