import { EOL } from "@std/fs";

interface WordSearchResults {
  total: number;
  runs: WordRun[];
}

type Direction = "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw" | "x";

interface WordRun {
  type: Direction;
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
    if (col < 0) throw new Error("Index out of bounds");
    if (col >= this.cols) throw new Error("Index out of bounds");
    if (row < 0) throw new Error("Index out of bounds");
    if (row >= this.rows) throw new Error("Index out of bounds");

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

  public searchForCross(word: string): WordSearchResults {
    const center = (word.length - 1) / 2;
    const finder = new RunFinder(this, word);
    finder.setDirections(["ne", "nw", "se", "sw"]);
    const runs = finder.findRuns();

    const pairs: WordRun[] = [];
    const crossIndexUsage = new Array(this.cells.length).fill(false);

    for (let index = 0; index < runs.length; index++) {
      const { col, row } = runs[index].letters[center];
      const centerIndex = this.getIndex(col, row);

      const otherIndex = runs.findIndex((run, otherIndex) =>
        run.letters[center].col === col && run.letters[center].row === row &&
        index !== otherIndex
      );

      if (otherIndex >= 0 && !crossIndexUsage[centerIndex]) {
        crossIndexUsage[centerIndex] = true;
        pairs.push({
          letters: [...runs[index].letters, ...runs[otherIndex].letters],
          type: "x",
        });
      }
    }

    return {
      runs: pairs,
      total: pairs.length,
    };
  }
}

class RunFinder {
  private searchPos = 0;
  private searchScan: { col: number; row: number } = { col: 0, row: 0 };
  private runs: WordRun[] = [];
  private directions: Direction[] = [
    "n",
    "s",
    "e",
    "w",
    "ne",
    "nw",
    "se",
    "sw",
  ];

  constructor(private grid: WordGrid, private word: string) {}

  public setDirections(directions: Direction[]) {
    this.directions = directions;
  }

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
    if (!this.directions.includes("e")) return;

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
    if (!this.directions.includes("w")) return;

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
    if (!this.directions.includes("s")) return;

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
    if (!this.directions.includes("n")) return;

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
    if (!this.directions.includes("se")) return;

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
    if (!this.directions.includes("sw")) return;

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
    if (!this.directions.includes("ne")) return;

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
    if (!this.directions.includes("nw")) return;

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
    if (col < 0 || col >= this.grid.cols || row < 0 || row >= this.grid.rows) {
      return false;
    }

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
