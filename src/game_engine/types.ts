export type Cell = 'x' | 'o' | null;

export type Field = Array<Cell>;

export type WinningCombos = Array<[number, number, number]>;

export type GameState = {
  currentPlayer: string;
  isGameOver: boolean;
  winner: string | null;
};

export type Player = { isHuman: boolean; symbol: 'x' | 'o' };

export interface IPlayers {
  [key: string]: Player;
}

export interface IGameStrategy {
  getNextStep(field: Field): number;
}

export interface IStrategies {
  [key: string]: IGameStrategy;
}
