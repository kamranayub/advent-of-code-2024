import { EOL } from "@std/fs";

interface WordSearchResults {
  total: number;
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
    return this.cells[x + (y * this.rows)];
  }

  private runs: string[] = [];
  public search(word: string): WordSearchResults {
    this.runs = [];
    this.findHorizontalRuns(word);

    return {
      total: this.runs.length,
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
          this.runs.push(run);
          nextIndex = 0;
          run = "";
        }
      }
    }
  }
}
