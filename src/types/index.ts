import { ActionStates } from './action-states';
import { Direction } from './direction';
import { ElementStates } from './element-states';
import { Positions } from './positions';

import type { 
  TSortingResult, 
  TReverseRangeResult, 
  TStackResult
} from './results';

export { ActionStates, Direction, ElementStates, Positions };

export type { TSortingResult, TReverseRangeResult, TStackResult };

export type TGetElementState = {
  itemIndex: number;
  startPosition: number;
  endPosition: number;
  isReversed: boolean;
  timerLaunched: boolean;
};
