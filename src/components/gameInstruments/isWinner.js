const hasPlayerPlacedAllMarks = (row, type) => row.every((v) => v === type);

const isWinner = (field, type) => {
    if (field.find((row) => hasPlayerPlacedAllMarks(row, type))) {
        return true;
    }
    for (let i = 0; i < 3; i += 1) {
        if (hasPlayerPlacedAllMarks(field.map((el) => el[i]), type)) {
            return true;
        }
    }
    const diagonal1 = [field[0][0], field[1][1], field[2][2]];
    if (hasPlayerPlacedAllMarks(diagonal1, type)) {
        return true;
    }
    const diagonal2 = [field[2][0], field[1][1], field[0][2]];
    if (hasPlayerPlacedAllMarks(diagonal2, type)) {
        return true;
    }
    return false;
};

export default isWinner;
