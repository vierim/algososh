import { ElementStates } from './element-states';

export type TReverseStringResult = {
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
