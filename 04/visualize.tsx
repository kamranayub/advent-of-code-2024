import React, { useState } from "react";
import {
  Box,
  Newline,
  render,
  Text,
  useApp,
  useFocus,
  useFocusManager,
  useInput,
} from "ink";
import { getPuzzleInput, sampleInput } from "./input.ts";
import { WordGrid } from "./word-grid.ts";

const puzzleInput = await getPuzzleInput();
const wordGrid = WordGrid.fromInput(puzzleInput);
const results = wordGrid.search("XMAS");

const App = () => {
  const focusManager = useFocusManager();
  const [hideUnused, setHideUnused] = useState(false);
  const [highlightedRun, setHighlightedRun] = useState(null);

  const { exit } = useApp();

  useInput((input, key) => {
    focusManager.focus("header");
    if (input === "q") {
      exit();
    } else if (input === "h") {
      setHideUnused((prev) => !prev);
    } else if (key.leftArrow) {
      setHighlightedRun((prev) => {
        if (prev === null) {
          return 0;
        }
        if (prev <= 0) {
          return null;
        }
        return prev - 1;
      });
    } else if (key.rightArrow) {
      setHighlightedRun((prev) => {
        if (prev === null) return 0;
        return prev >= results.total ? 0 : prev + 1;
      });
    }
  });

  return (
    <Box flexDirection="column">
      <Header highlightedRun={highlightedRun} />
      <Newline />
      <Grid hideUnused={hideUnused} highlightedRun={highlightedRun} />
      <Controls hideUnused={hideUnused} />
    </Box>
  );
};

const Header = ({ highlightedRun }: { highlightedRun: number | null }) => {
  useFocus({ id: "header " });

  return (
    <>
      <Text>
        <Text bold>Grid:</Text>{" "}
        <Text color="green">{wordGrid.cols}</Text>x<Text color="green">
          {wordGrid.rows}
        </Text>
      </Text>
      <Text>
        <Text bold>Higlighted Run:</Text>{" "}
        <Text color="orange">
          {highlightedRun === null
            ? "(none)"
            : `${highlightedRun + 1} of ${results.total}`}{" "}
          ({highlightedRun === null
            ? ""
            : `Direction: ${results.runs[highlightedRun].type.toUpperCase()}`})
        </Text>
      </Text>
    </>
  );
};

const Controls = ({ hideUnused }: { hideUnused: boolean }) => {
  return (
    <Box flexDirection="column">
      <Text>Commands:</Text>
      <Text>
        <Text color="cyan">(q)</Text> to exit
      </Text>
      <Text>
        <Text color="cyan">(h)</Text> to {hideUnused ? "show" : "hide"}{" "}
        unused letters
      </Text>
      <Text>
        <Text color="cyan">(&larr;)</Text> to see to prev run
      </Text>
      <Text>
        <Text color="cyan">(&rarr;)</Text> to see to next run
      </Text>
    </Box>
  );
};

const Grid = (
  { hideUnused, highlightedRun }: {
    hideUnused: boolean;
    highlightedRun: number | null;
  },
) => {
  const letterIsUsed = (col: number, row: number) => {
    return results.runs.some((r) =>
      r.letters.some((l) => l.col === col && l.row === row)
    );
  };

  return (
    <Box
      flexDirection="column"
      padding={1}
      borderStyle="single"
      borderColor="gray"
      flexShrink={1}
    >
      {new Array(wordGrid.rows).fill(0).map((_, row) => (
        <Box key={row} gap={1}>
          {new Array(wordGrid.cols).fill(0).map((_, col) => {
            const used = letterIsUsed(col, row);
            const hide = !used && hideUnused;
            const isInRun = highlightedRun !== null
              ? results.runs[highlightedRun].letters.some((l) =>
                l.col === col && l.row === row
              )
              : false;

            return (
              <Letter
                key={`${col},${row}`}
                letter={hide ? "." : wordGrid.getLetter(col, row)}
                used={used}
                highlight={isInRun}
              />
            );
          })}
        </Box>
      ))}
    </Box>
  );
};

const Letter = (
  { letter, used, highlight }: {
    key: string;
    letter: string;
    used: boolean;
    highlight: boolean;
  },
) => (
  <Box>
    <Text
      color={used ? highlight ? "white " : "red" : "white"}
      backgroundColor={highlight ? "red" : undefined}
      dimColor={!used}
    >
      {letter}
    </Text>
  </Box>
);

export function run() {
  render(<App />);
}
