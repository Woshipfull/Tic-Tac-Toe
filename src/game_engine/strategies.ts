import { Field, WinningCombos, IStrategies } from './types';

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

class Easy {
  getNextStep(field: Field): number {
    return field.indexOf(null);
  }
}

class Normal {
  getNextStep(field: Field): number {
    const cellRank = [3, 2, 3, 2, 4, 2, 3, 2, 3];

    for (let i = 0; i < field.length; i += 1) {
      if (field[i] !== null) {
        cellRank[i] -= 99;
      }
    }

    for (let combo = 0; combo < winningCombos.length; combo += 1) {
      var a = winningCombos[combo][0];
      var b = winningCombos[combo][1];
      var c = winningCombos[combo][2];

      // если любые две ячейки в комбинации непустые и имеют одинаковое значение, продвигать оставшуюся ячейку
      if (field[a] === field[b]) {
        if (field[a] !== null) {
          if (field[c] === null) {
            cellRank[c] += 10;
          }
        }
      }

      if (field[a] === field[c]) {
        if (field[a] !== null) {
          if (field[b] === null) {
            cellRank[b] += 10;
          }
        }
      }

      if (field[b] === field[c]) {
        if (field[b] !== null) {
          if (field[a] === null) {
            cellRank[a] += 10;
          }
        }
      }
    }

    let bestCell = -1;
    let highest = -999;

    for (let index = 0; index < field.length; index += 1) {
      if (cellRank[index] > highest) {
        highest = cellRank[index];
        bestCell = index;
      }
    }

    return bestCell;
  }
}

const gameStrategies: IStrategies = {
  easy: new Easy(),
  normal: new Normal(),
};

export default gameStrategies;
