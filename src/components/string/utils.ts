import { TGetElementState, ElementStates } from '../../types';

interface IReverseRange<T> {
  nextStep: () => void;
  
  isReversed: boolean;
  range: T[];
  start: number;
  end: number;
}

export class ReverseRange<T> implements IReverseRange<T> {
  private _range: T[] = [];
  private _start: number = 0; // указатель на текущую позицию с начала массива
  private _end: number = 0; // указатель на текущую позицию с конца строки

  isReversed: boolean = false;

  protected _swap() {
    let tmp = this._range[this._start];
    this._range[this._start] = this._range[this._end];
    this._range[this._end] = tmp;
  }

  public nextStep() {
    if (!this.isReversed) {
      this._swap();

      this._start++;
      this._end--;

      if (this._start >= this._end) {
        this.isReversed = true;
      }
    }
  }

  set range(items: T[]) {
    if (items.length > 0) {
      this._range = [...items];

      if (this._range.length === 1) {
        this._start = 0;
        this._end = 0;
        this.isReversed = true;
      } else {
        this._start = 0;
        this._end = items.length - 1;
        this.isReversed = false;
      }
    }
  }

  get range() {
    return this._range;
  }

  get start() {
    return this._start;
  }

  get end() {
    return this._end;
  }
}

export const getElementState = ({
  itemIndex,
  startPosition,
  endPosition,
  isReversed,
  timerLaunched,
}: TGetElementState): ElementStates => {
  if (itemIndex === startPosition || itemIndex === endPosition) {
    if (isReversed) {
      return ElementStates.Modified;
    } else {
      return timerLaunched ? ElementStates.Changing : ElementStates.Default;
    }
  }

  if (itemIndex < startPosition || itemIndex > endPosition) {
    return ElementStates.Modified;
  }

  return ElementStates.Default;
};
