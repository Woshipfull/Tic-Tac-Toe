import { Field, Cell, WinningCombos } from './types';

type Line = [Cell, Cell, Cell];

const winningCombos: WinningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const hasPlayerPlacedAllMarks = (line: Line, type: 'x' | 'o'): boolean =>
  line.every((v) => v === type);

const isWinner = (field: Field, type: 'x' | 'o'): boolean => {
  for (let i = 0; i < winningCombos.length; i += 1) {
    const winCombo = winningCombos[i];
    const line: Line = [
      field[winCombo[0]],
      field[winCombo[1]],
      field[winCombo[2]],
    ];
    if (hasPlayerPlacedAllMarks(line, type)) {
      return true;
    }
  }
  return false;
};

const isGameOver = (field: Field): boolean =>
  !field.flat().some((v) => v === null);

export { isWinner, isGameOver };
