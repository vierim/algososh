import { ElementStates } from './element-states';

export type TReverseRangeResult = {
  id: number;
  value: string;
  state: ElementStates;
}[];

export type TSortingResult = {
  value: number;
  state: ElementStates;
}[];

export type TStackResult = {
  value: string;
  state: ElementStates;
}[];
