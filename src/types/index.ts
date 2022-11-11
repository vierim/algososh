import { ActionStates } from './action-states';
import { Direction } from './direction';
import { ElementStates } from './element-states';
import { Positions } from './positions';
import { SortingMethods } from './sorting-methods';

import type {
  TSortingResult,
  TReverseRangeResult,
  TStackResult,
} from './results';

export { 
  ActionStates, 
  Direction, 
  ElementStates, 
  Positions, 
  SortingMethods 
};

export type { TSortingResult, TReverseRangeResult, TStackResult };

export type TGetElementState = {
  itemIndex: number;
  startPosition: number;
  endPosition: number;
  isReversed: boolean;
  timerLaunched: boolean;
};

export type TSortingSteps<T> = {
  array: T[];
  current: number[];
  modified: number[];
}[];

export interface ILogStep {
  current?: number[],
  modified?: number
}
