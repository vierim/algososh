import { TSortingResult, TReverseRangeResult, TStackResult } from "./results";

export type { TSortingResult, TReverseRangeResult, TStackResult };

export type TGetElementState = ({
  itemIndex: number;
  startPosition: number;
  endPosition: number;
  isReversed: boolean;
  timerLaunched: boolean;
});
