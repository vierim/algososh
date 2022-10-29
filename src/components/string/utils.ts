interface IReverseRange<T> {
  _swap: () => void;
  setRange: (items: T[]) => void;
  getRange: () => T[];
  nextStep: () => void;
  startPosition: () => number;
  endPosition: () => number;
}

export class ReverseRange<T> implements IReverseRange<T> {
  private _range: T[] = [];
  private _start: number = 0;
  private _end: number = 0;

  isReversed: boolean = false;

  _swap() {
    let tmp = this._range[this._start];
    this._range[this._start] = this._range[this._end];
    this._range[this._end] = tmp;
  }

  setRange(items: T[]) {
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

  getRange() {
    return this._range;
  }

  nextStep() {
    if (!this.isReversed) {
      this._swap();

      this._start++;
      this._end--;
    }

    if (this._start >= this._end) {
      this.isReversed = true;
    }
  }

  startPosition = () => this._start;
  endPosition = () => this._end;
}
