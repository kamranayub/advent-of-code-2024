import { EOL } from "@std/fs";

export class WordGrid {
  public static fromInput(input: string): WordGrid {
    const cells: string[] = [];
    const rows = input.trim().split(EOL);
    let colCount = 0;

    for (const row of rows) {
      const cols = row.split("");
      colCount = cols.length;

      cells.push(...cols);
    }

    return new WordGrid(colCount, rows.length, cells);
  }

  constructor(
    public cols: number,
    public rows: number,
    private cells: string[],
  ) {
  }

  public getCell(x: number, y: number): string {
    return this.cells[x + (y * this.rows)];
  }
}
