import Easy from "./Easy.js";
import Normal from "./Normal.js";
import { isWinner, isGameOver } from "./gameChecks.js";

const gameStrategies = {
  easy: () => new Easy(),
  normal: () => new Normal(),
};

const initPlayers = (whoStarts) => ({
  user: {
    isHuman: true,
    symbol: whoStarts === "user" ? "x" : "o",
  },
  ai: {
    isHuman: false,
    symbol: whoStarts === "ai" ? "x" : "o",
  },
});

const buildField = () => [
  Array(3).fill(null),
  Array(3).fill(null),
  Array(3).fill(null),
];

class Game {
  start(whoStarts, level = "easy") {
    this._strategy = gameStrategies[level]();
    this._field = buildField();
    this._players = initPlayers(whoStarts);
    this._state = {
      currentPlayer: whoStarts,
      isGameOver: false,
      winner: null,
    };

    if (this._state.currentPlayer === "ai") {
      return this._aiMove();
    }

    return;
  }

  move(row, col) {
    this._setValue(row, col);

    this._gameChecks();

    if (this._state.isGameOver) return;

    this._changeCurrentPlayer();

    if (this._state.currentPlayer === "ai") {
      return this._aiMove();
    }
  }

  getField() {
    return this._field;
  }

  getState() {
    return this._state;
  }

  _aiMove() {
    const [autoRow, autoCol] = this._strategy.getNextStep(this._field);
    return this.move(autoRow, autoCol);
  }

  _setValue(row, col) {
    return (this._field[row][col] =
      this._players[this._state.currentPlayer].symbol);
  }

  _gameChecks() {
    if (isGameOver(this._field)) {
      this._state.isGameOver = true;
    }

    const curentSymbol = this._players[this._state.currentPlayer].symbol;
    if (isWinner(this._field, curentSymbol)) {
      this._state.isGameOver = true;
      this._state.winner = this._state.currentPlayer;
    }
  }

  _changeCurrentPlayer() {
    const nextPlayer = this._state.currentPlayer === "user" ? "ai" : "user";
    this._state.currentPlayer = nextPlayer;
  }
}

export default Game;
