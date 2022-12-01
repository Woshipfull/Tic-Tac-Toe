import gameStrategies from './strategies';
import { isWinner, isGameOver } from './gameChecks';

import { Field, GameState, IPlayers, IGameStrategy } from './types';

const initPlayers = (whoStarts: string): IPlayers => ({
  user: {
    isHuman: true,
    symbol: whoStarts === 'user' ? 'x' : 'o',
  },
  ai: {
    isHuman: false,
    symbol: whoStarts === 'ai' ? 'x' : 'o',
  },
});

const buildField = (): Field => Array(9).fill(null);

class Game {
  private _state!: GameState;
  private _field!: Field;
  private _players!: IPlayers;
  private _strategy!: IGameStrategy;

  start(whoStarts: string, level: string = 'easy'): void {
    this._strategy = gameStrategies[level];
    this._field = buildField();
    this._players = initPlayers(whoStarts);
    this._state = {
      currentPlayer: whoStarts,
      isGameOver: false,
      winner: null,
    };

    if (this._state.currentPlayer === 'ai') {
      return this.aiMove();
    }

    return;
  }

  move(cellId: number): void {
    this.setValue(cellId);

    this.gameChecks();

    if (this._state.isGameOver) return;

    this.changeCurrentPlayer();

    if (this._state.currentPlayer === 'ai') {
      return this.aiMove();
    }
  }

  get getField() {
    return this._field;
  }

  get getState() {
    return this._state;
  }

  private aiMove() {
    const autoCellId = this._strategy.getNextStep(this._field);
    return this.move(autoCellId);
  }

  private setValue(cellId: number) {
    return (this._field[cellId] =
      this._players[this._state.currentPlayer].symbol);
  }

  private gameChecks() {
    if (isGameOver(this._field)) {
      this._state.isGameOver = true;
    }

    const curentSymbol = this._players[this._state.currentPlayer].symbol;
    if (isWinner(this._field, curentSymbol)) {
      this._state.isGameOver = true;
      this._state.winner = this._state.currentPlayer;
    }
  }

  private changeCurrentPlayer() {
    const nextPlayer = this._state.currentPlayer === 'user' ? 'ai' : 'user';
    this._state.currentPlayer = nextPlayer;
  }
}

export default Game;
