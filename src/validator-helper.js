class ValidatorHelper {

    static splitByRows(sudoku) {
        return sudoku.match(/[\s\S]{1,21}/g) || [];
    }

    static rowIsColumnSplitter(row) {
        return !row.includes("|")
    }

    static stripStringOfNewlines(string) {
        return string.replace(/\n|\r|\s/g, "");
    }

    static stripStringOfDelimiter(string) {
        return string.split("|").join("");
    }

    static transformToArray(string) {
        return string.split("");
    }

    static hasDuplicatesExcludingZero(array) {
        array = array.filter(value => value !== "0");
        return (new Set(array)).size !== array.length;
    }

    static ignoreZeroValues(array) {
        array.filter(value => value !== "0");
    }

    static transposeMatrix(array) {
        return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
    }
}

module.exports = ValidatorHelper;