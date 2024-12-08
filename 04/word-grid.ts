import { EOL } from "@std/fs";

interface WordSearchResults {
  total: number;
  runs: WordRun[];
}

interface WordRun {
  type: "horizontal" | "vertical";
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

    return {
      total: this.runs.length,
      runs: this.runs,
    };
  }

  private findHorizontalRuns(word: string) {
    for (let row = 0; row < this.rows; row++) {
      let run = "";
      let nextIndex = 0;
      for (let col = 0; col < this.cols; col++) {
        const letter = this.getLetter(col, row);
        const letterInWord = word[nextIndex];

        if (letter === letterInWord) {
          run += letter;
          nextIndex++;
        } else {
          nextIndex = 0;
          run = "";

          const letterInWord = word[nextIndex];
          if (letter === letterInWord) {
            run += letter;
            nextIndex++;
          }
        }

        if (run === word) {
          this.runs.push({ type: "horizontal" });
          nextIndex = 0;
          run = "";
        }
      }
    }
  }

  private findVerticalRuns(word: string) {
    let searchPos = 0;
    let run = "";
    let nextRunIndex = 0;

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

    const checkNextRow = (search: { col: number; row: number }) => {
      const letterInNextRow = this.getLetter(search.col, search.row + 1);
      const letterInWord = word[nextRunIndex];

      if (letterInNextRow === letterInWord) {
        return letterInNextRow;
      } else {
        return false;
      }
    };

    while ((searchScan = scanForNextSearch())) {
      searchPos = this.getIndex(searchScan.col, searchScan.row);

      let nextLetter: string | false;
      while ((nextLetter = checkNextRow(searchScan))) {
        run += nextLetter;
        nextRunIndex++;

        if (run === word) {
          this.runs.push({ type: "vertical" });
          return;
        }
      }
    }
  }
}
