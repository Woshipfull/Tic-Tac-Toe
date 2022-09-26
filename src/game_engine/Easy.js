 export default class Easy {
    getNextStep(field) {
        return field.reduce((acc, row, i) => {
            const j = row.indexOf(null);
            if (acc.length === 0 && j !== -1) {
                return [i, j];
            }
            return acc;
        }, []);
    }
}
