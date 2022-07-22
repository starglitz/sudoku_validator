const ValidatorHelper = require("./validator-helper");

class Validator {
  static validate(sudoku) {
    const validator = new Validator

    return validator.validate(sudoku)
  }

  validate(sudoku) {
    let rows = this.transformSudokuToArrayOfRows(sudoku);
    const columns = ValidatorHelper.transposeMatrix(rows);

    if(!this.sudokuValid(rows, columns)) {
      return "Sudoku is invalid.";
    }

    if(this.rowsHaveUnfilledFields(rows)) {
      return "Sudoku is valid but incomplete.";
    }

    return "Sudoku is valid.";
  }

  sudokuValid(rows, columns) {
    if(this.arraysHaveDuplicates(rows)) {
      return false;
    }
    if(this.arraysHaveDuplicates(columns)) {
      return false;
    }

    return !this.arraysHaveDuplicates(this.getBoxes(rows));
  }


  arraysHaveDuplicates(rows) {
    return rows.some(ValidatorHelper.hasDuplicatesExcludingZero);
  }

  getBoxes(sudoku) {
    let boxes = [[], [], [], [], [], [], [], [], []];
    for(let i = 0; i < sudoku.length; i++) { //rows
      for(let j = 0; j < sudoku.length; j++) { //columns
        let number = sudoku[i][j];
        boxes[this.getBoxPosition(i,j)].push(number);
      }
    }
    return boxes;
  }

  transformSudokuToArrayOfRows(sudoku) {
    return ValidatorHelper.splitByRows(sudoku)
        .filter(row => !ValidatorHelper.rowIsColumnSplitter(row))
        .map(row => {
          row = ValidatorHelper.stripStringOfNewlines(row);
          row = ValidatorHelper.stripStringOfDelimiter(row);
          return ValidatorHelper.transformToArray(row);
        })
  }

  getBoxPosition(rowIndex, columnIndex) {
    const rowPosition = Math.floor((rowIndex / 3)) * 3;
    const columnPosition = Math.floor(columnIndex / 3);
    return rowPosition + columnPosition;
  }

  rowsHaveUnfilledFields(rows) {
    let merged = rows.flat(1);
    return merged.includes("0");
  }
}

module.exports = Validator
