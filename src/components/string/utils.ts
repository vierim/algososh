interface IReverseRange<T> {
  _swap: () => void;
  setState: (items: T[]) => void;
  getState: () => T[];
  nextStep: () => void;
  startPosition: () => number;
  endPosition: () => number;
}

export class ReverseRange<T> implements IReverseRange<T> {
  private _state: T[] = [];
  private _start: number = 0;
  private _end: number = 0;

  isReversed: boolean = false;

  _swap() {
    let tmp = this._state[this._start];
    this._state[this._start] = this._state[this._end];
    this._state[this._end] = tmp;
  }

  setState(items: T[]) {
    if (items.length > 0) {
      this._state = [...items];

      this._start = 0;
      this._end = items.length - 1;
      this.isReversed = false;
    }
  }

  getState() {
    return this._state;
  }

  nextStep() {
    if (!this.isReversed) {
      this._swap();
    }

    this._start++;
    this._end--;

    if(this._start >= this._end) {
      this.isReversed = true;
    }
  }

  startPosition = () => this._start;
  endPosition = () => this._end;
}
