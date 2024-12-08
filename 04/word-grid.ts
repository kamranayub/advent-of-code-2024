import { EOL } from "@std/fs";

interface WordSearchResults {
  total: number;
  runs: WordRun[];
}

interface WordRun {
  type: "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw";
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

  public getLetter(col: number, row: number): string {
    return this.cells[this.getIndex(col, row)];
  }

  public getIndex(col: number, row: number): number {
    return col + (row * this.rows);
  }

  public search(word: string): WordSearchResults {
    const finder = new RunFinder(this, word);
    const runs = finder.findRuns();

    return {
      total: runs.length,
      runs: runs,
    };
  }
}

class RunFinder {
  private searchPos = 0;
  private searchScan: { col: number; row: number } = { col: 0, row: 0 };
  private runs: WordRun[] = [];

  constructor(private grid: WordGrid, private word: string) {}

  public findRuns(): WordRun[] {
    while (this.scanForNextSearch()) {
      this.searchPos = this.grid.getIndex(
        this.searchScan.col,
        this.searchScan.row,
      );
      this.search();
    }

    return this.runs;
  }

  private scanForNextSearch() {
    for (let row = 0; row < this.grid.rows; row++) {
      for (let col = 0; col < this.grid.cols; col++) {
        if (this.grid.getIndex(col, row) <= this.searchPos) continue;

        const letter = this.grid.getLetter(col, row);

        if (letter === this.word[0]) {
          this.searchScan = { col, row };
          return true;
        }
      }
    }
    return false;
  }

  search() {
    this.searchWest();
    this.searchEast();
    this.searchNorth();
    this.searchSouth();
    this.searchSouthEast();
    this.searchSouthWest();
    this.searchNorthEast();
    this.searchNorthWest();
  }

  searchEast() {
    let nextLetter: WordRunLetter | false = false;
    const letters: WordRunLetter[] = [];
    let nextRunIndex = 0;

    while (
      (nextLetter = this.checkNext(
        this.searchScan.col + nextRunIndex,
        this.searchScan.row,
        nextRunIndex,
      ))
    ) {
      letters.push(nextLetter);
      nextRunIndex++;

      const run = letters.map((l) => l.letter).join("");
      if (run === this.word) {
        this.runs.push({ type: "e", letters });
        return;
      }
    }
  }

  searchWest() {
    let nextLetter: WordRunLetter | false = false;
    const letters: WordRunLetter[] = [];
    let nextRunIndex = 0;

    while (
      (nextLetter = this.checkNext(
        this.searchScan.col - nextRunIndex,
        this.searchScan.row,
        nextRunIndex,
      ))
    ) {
      letters.push(nextLetter);
      nextRunIndex++;

      const run = letters.map((l) => l.letter).join("");
      if (run === this.word) {
        this.runs.push({ type: "w", letters });
        return;
      }
    }
  }

  searchSouth() {
    let nextLetter: WordRunLetter | false = false;
    const letters: WordRunLetter[] = [];
    let nextRunIndex = 0;

    while (
      (nextLetter = this.checkNext(
        this.searchScan.col,
        this.searchScan.row + nextRunIndex,
        nextRunIndex,
      ))
    ) {
      letters.push(nextLetter);
      nextRunIndex++;

      const run = letters.map((l) => l.letter).join("");
      if (run === this.word) {
        this.runs.push({ type: "s", letters });
        return;
      }
    }
  }

  searchNorth() {
    let nextLetter: WordRunLetter | false = false;
    const letters: WordRunLetter[] = [];
    let nextRunIndex = 0;

    while (
      (nextLetter = this.checkNext(
        this.searchScan.col,
        this.searchScan.row - nextRunIndex,
        nextRunIndex,
      ))
    ) {
      letters.push(nextLetter);
      nextRunIndex++;

      const run = letters.map((l) => l.letter).join("");
      if (run === this.word) {
        this.runs.push({ type: "n", letters });
        return;
      }
    }
  }

  searchSouthEast() {
    let nextRunIndex = 0;
    const letters: WordRunLetter[] = [];
    let nextLetter: WordRunLetter | false = false;
    while (
      (nextLetter = this.checkNext(
        this.searchScan.col + nextRunIndex,
        this.searchScan.row + nextRunIndex,
        nextRunIndex,
      ))
    ) {
      letters.push(nextLetter);
      nextRunIndex++;

      const run = letters.map((l) => l.letter).join("");
      if (run === this.word) {
        this.runs.push({ type: "se", letters });
        return;
      }
    }
  }

  searchSouthWest() {
    let nextRunIndex = 0;
    const letters: WordRunLetter[] = [];
    let nextLetter: WordRunLetter | false = false;
    while (
      (nextLetter = this.checkNext(
        this.searchScan.col - nextRunIndex,
        this.searchScan.row + nextRunIndex,
        nextRunIndex,
      ))
    ) {
      letters.push(nextLetter);
      nextRunIndex++;

      const run = letters.map((l) => l.letter).join("");
      if (run === this.word) {
        this.runs.push({ type: "sw", letters });
        return;
      }
    }
  }

  searchNorthEast() {
    let nextRunIndex = 0;
    const letters: WordRunLetter[] = [];
    let nextLetter: WordRunLetter | false = false;
    while (
      (nextLetter = this.checkNext(
        this.searchScan.col + nextRunIndex,
        this.searchScan.row - nextRunIndex,
        nextRunIndex,
      ))
    ) {
      letters.push(nextLetter);
      nextRunIndex++;

      const run = letters.map((l) => l.letter).join("");
      if (run === this.word) {
        this.runs.push({ type: "ne", letters });
        return;
      }
    }
  }

  searchNorthWest() {
    let nextRunIndex = 0;
    const letters: WordRunLetter[] = [];
    let nextLetter: WordRunLetter | false = false;
    while (
      (nextLetter = this.checkNext(
        this.searchScan.col - nextRunIndex,
        this.searchScan.row - nextRunIndex,
        nextRunIndex,
      ))
    ) {
      letters.push(nextLetter);
      nextRunIndex++;

      const run = letters.map((l) => l.letter).join("");
      if (run === this.word) {
        this.runs.push({ type: "nw", letters });
        return;
      }
    }
  }

  checkNext(
    col: number,
    row: number,
    nextRunIndex: number,
  ): WordRunLetter | false {
    const letterInCell = this.grid.getLetter(
      col,
      row,
    );
    const letterInWord = this.word[nextRunIndex];

    if (letterInCell === letterInWord) {
      return { letter: letterInCell, col, row };
    } else {
      return false;
    }
  }
}
