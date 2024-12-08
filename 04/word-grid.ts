import { EOL } from "@std/fs";

interface WordSearchResults {
  total: number;
  runs: WordRun[];
}

interface WordRun {
  type: "horizontal" | "vertical" | "diagonal";
  letters: WordRunLetter[];
}

interface WordRunLetter {
  letter: string;
  col: number;
  row: number;
}

export class WordGrid {
  public static fromInput(input: string): WordGrid {
    const letters: string[] = [];
    const rows = input.trim().split(EOL);
    let colCount = 0;

    for (const row of rows) {
      const cols = row.split("");
      colCount = cols.length;

      letters.push(...cols);
    }

    return new WordGrid(colCount, rows.length, letters);
  }

  constructor(
    public cols: number,
    public rows: number,
    private cells: string[],
  ) {
  }

  public getLetter(x: number, y: number): string {
    return this.cells[this.getIndex(x, y)];
  }

  private getIndex(x: number, y: number): number {
    return x + (y * this.rows);
  }

  private runs: WordRun[] = [];
  public search(word: string): WordSearchResults {
    this.runs = [];
    this.findHorizontalRuns(word);
    this.findVerticalRuns(word);
    this.findDiagonalRuns(word);

    return {
      total: this.runs.length,
      runs: this.runs,
    };
  }

  private findHorizontalRuns(word: string) {
    let searchPos = 0;

    const scanForNextSearch = () => {
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          if (this.getIndex(col, row) <= searchPos) continue;

          const letter = this.getLetter(col, row);

          if (letter === word[0]) {
            return { col, row };
          }
        }
      }
      return false;
    };

    let searchScan: { col: number; row: number } | false;

    const checkNext = (
      col: number,
      row: number,
      nextRunIndex: number,
    ): WordRunLetter | false => {
      const letterInCell = this.getLetter(
        col,
        row,
      );
      const letterInWord = word[nextRunIndex];

      if (letterInCell === letterInWord) {
        return { letter: letterInCell, col, row };
      } else {
        return false;
      }
    };

    const searchEast = (searchScan: { col: number; row: number }) => {
      let nextLetter: WordRunLetter | false = false;
      const letters: WordRunLetter[] = [];
      let nextRunIndex = 0;

      while (
        (nextLetter = checkNext(
          searchScan.col + nextRunIndex,
          searchScan.row,
          nextRunIndex,
        ))
      ) {
        letters.push(nextLetter);
        nextRunIndex++;

        const run = letters.map((l) => l.letter).join("");
        if (run === word) {
          this.runs.push({ type: "horizontal", letters });
          return true;
        }
      }
      return false;
    };

    const searchWest = (searchScan: { col: number; row: number }) => {
      let nextLetter: WordRunLetter | false = false;
      const letters: WordRunLetter[] = [];
      let nextRunIndex = 0;

      while (
        (nextLetter = checkNext(
          searchScan.col - nextRunIndex,
          searchScan.row,
          nextRunIndex,
        ))
      ) {
        letters.push(nextLetter);
        nextRunIndex++;

        const run = letters.map((l) => l.letter).join("");
        if (run === word) {
          this.runs.push({ type: "horizontal", letters });
          return true;
        }
      }
      return false;
    };

    while ((searchScan = scanForNextSearch())) {
      searchPos = this.getIndex(searchScan.col, searchScan.row);
      searchWest(searchScan);
      searchEast(searchScan);
    }
  }

  private findVerticalRuns(word: string) {
    let searchPos = 0;

    const scanForNextSearch = () => {
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          if (this.getIndex(col, row) <= searchPos) continue;

          const letter = this.getLetter(col, row);

          if (letter === word[0]) {
            return { col, row };
          }
        }
      }
      return false;
    };

    let searchScan: { col: number; row: number } | false;

    const checkNext = (
      col: number,
      row: number,
      nextRunIndex: number,
    ): WordRunLetter | false => {
      const letterInCell = this.getLetter(
        col,
        row,
      );
      const letterInWord = word[nextRunIndex];

      if (letterInCell === letterInWord) {
        return { letter: letterInCell, col, row };
      } else {
        return false;
      }
    };

    const searchSouth = (searchScan: { col: number; row: number }) => {
      let nextLetter: WordRunLetter | false = false;
      const letters: WordRunLetter[] = [];
      let nextRunIndex = 0;

      while (
        (nextLetter = checkNext(
          searchScan.col,
          searchScan.row + nextRunIndex,
          nextRunIndex,
        ))
      ) {
        letters.push(nextLetter);
        nextRunIndex++;

        const run = letters.map((l) => l.letter).join("");
        if (run === word) {
          this.runs.push({ type: "vertical", letters });
          return true;
        }
      }
      return false;
    };

    const searchNorth = (searchScan: { col: number; row: number }) => {
      let nextLetter: WordRunLetter | false = false;
      const letters: WordRunLetter[] = [];
      let nextRunIndex = 0;

      while (
        (nextLetter = checkNext(
          searchScan.col,
          searchScan.row - nextRunIndex,
          nextRunIndex,
        ))
      ) {
        letters.push(nextLetter);
        nextRunIndex++;

        const run = letters.map((l) => l.letter).join("");
        if (run === word) {
          this.runs.push({ type: "vertical", letters });
          return true;
        }
      }
      return false;
    };

    while ((searchScan = scanForNextSearch())) {
      searchPos = this.getIndex(searchScan.col, searchScan.row);
      searchSouth(searchScan);
      searchNorth(searchScan);
    }
  }

  private findDiagonalRuns(word: string) {
    let searchPos = 0;

    const scanForNextSearch = () => {
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          if (this.getIndex(col, row) <= searchPos) continue;

          const letter = this.getLetter(col, row);

          if (letter === word[0]) {
            return { col, row };
          }
        }
      }
      return false;
    };

    let searchScan: { col: number; row: number } | false;

    const checkNext = (
      col: number,
      row: number,
      nextRunIndex: number,
    ): WordRunLetter | false => {
      const letterInNextRow = this.getLetter(
        col,
        row,
      );
      const letterInWord = word[nextRunIndex];

      if (letterInNextRow === letterInWord) {
        return { letter: letterInNextRow, col, row };
      } else {
        return false;
      }
    };

    const searchSouthEast = (searchScan: { col: number; row: number }) => {
      let nextRunIndex = 0;
      const letters: WordRunLetter[] = [];
      let nextLetter: WordRunLetter | false = false;
      while (
        (nextLetter = checkNext(
          searchScan.col + nextRunIndex,
          searchScan.row + nextRunIndex,
          nextRunIndex,
        ))
      ) {
        letters.push(nextLetter);
        nextRunIndex++;

        const run = letters.map((l) => l.letter).join("");
        if (run === word) {
          this.runs.push({ type: "diagonal", letters });
          return true;
        }
      }
      return false;
    };

    const searchSouthWest = (searchScan: { col: number; row: number }) => {
      let nextRunIndex = 0;
      const letters: WordRunLetter[] = [];
      let nextLetter: WordRunLetter | false = false;
      while (
        (nextLetter = checkNext(
          searchScan.col - nextRunIndex,
          searchScan.row + nextRunIndex,
          nextRunIndex,
        ))
      ) {
        letters.push(nextLetter);
        nextRunIndex++;

        const run = letters.map((l) => l.letter).join("");
        if (run === word) {
          this.runs.push({ type: "diagonal", letters });
          return true;
        }
      }
      return false;
    };

    const searchNorthEast = (searchScan: { col: number; row: number }) => {
      let nextRunIndex = 0;
      const letters: WordRunLetter[] = [];
      let nextLetter: WordRunLetter | false = false;
      while (
        (nextLetter = checkNext(
          searchScan.col + nextRunIndex,
          searchScan.row - nextRunIndex,
          nextRunIndex,
        ))
      ) {
        letters.push(nextLetter);
        nextRunIndex++;

        const run = letters.map((l) => l.letter).join("");
        if (run === word) {
          this.runs.push({ type: "diagonal", letters });
          return true;
        }
      }
      return false;
    };

    const searchNorthWest = (searchScan: { col: number; row: number }) => {
      let nextRunIndex = 0;
      const letters: WordRunLetter[] = [];
      let nextLetter: WordRunLetter | false = false;
      while (
        (nextLetter = checkNext(
          searchScan.col - nextRunIndex,
          searchScan.row - nextRunIndex,
          nextRunIndex,
        ))
      ) {
        letters.push(nextLetter);
        nextRunIndex++;

        const run = letters.map((l) => l.letter).join("");
        if (run === word) {
          this.runs.push({ type: "diagonal", letters });
          return true;
        }
      }
      return false;
    };

    while ((searchScan = scanForNextSearch())) {
      searchPos = this.getIndex(searchScan.col, searchScan.row);
      searchSouthEast(searchScan);
      searchSouthWest(searchScan);
      searchNorthEast(searchScan);
      searchNorthWest(searchScan);
    }
  }
}
