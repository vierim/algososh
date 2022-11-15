import { ElementStates } from './element-states';

export type TReverseRangeResult = {
  id: number;
  value: string;
  state: ElementStates;
}[];

export type TSortingResult = {
  array: number[];
  current: number[];
  modified: number[];
};
