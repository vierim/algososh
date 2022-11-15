import {
  SortingMethods,
  Direction,
  ILogStep,
  TSortingSteps,
} from '../../types';

interface ISortableArray<T> {
  sortArray: () => void;
  
  steps: TSortingSteps<T>;
}

export class SortableArray<T> implements ISortableArray<T> {
  private _array: T[];
  private _method: SortingMethods;
  private _direction: Direction;
  private _steps: TSortingSteps<T> = [];

  constructor() {
    this._array = [];
    this._method = SortingMethods.Choice;
    this._direction = Direction.Ascending;
  }

  protected _clearSteps() {
    this._steps = [];
  }

  protected _compare(current: T, compared: T) {
    if (this._direction === Direction.Ascending) {
      return current > compared;
    } else {
      return current < compared;
    }
  }

  protected _swap(current: number, compared: number) {
    let tmp = this._array[current];
    this._array[current] = this._array[compared];
    this._array[compared] = tmp;
  }

  protected _choiceSorting() {
    for (let i = 0; i < this._array.length; i++) {
      let currentInd = i;

      for (let j = i + 1; j < this._array.length; j++) {
        this._logStep({ current: [i, j, currentInd] });

        if (!this._compare(this._array[j], this._array[currentInd])) {
          currentInd = j;
        }
      }

      this._swap(i, currentInd);

      this._logStep({ current: [i, currentInd] });
      this._logStep({ modified: i });
    }
  }

  protected _bubbleSorting() {
    for (let i = 0; i < this._array.length; i++) {
      for (let j = i + 1; j < this._array.length; j++) {
        this._logStep({ current: [i, j] });

        if (this._compare(this._array[i], this._array[j])) {
          this._swap(i, j);
          this._logStep({ current: [i, j] });
        }
      }

      this._logStep({ modified: i });
    }
  }

  sortArray() {
    this._clearSteps();

    if (this._method === SortingMethods.Choice) {
      this._choiceSorting();
    }

    if (this._method === SortingMethods.Bubble) {
      this._bubbleSorting();
    }
  }

  protected _logStep({ current, modified }: ILogStep) {
    if (this._steps.length > 0) {
      const previousStep = this._steps[this._steps.length - 1];

      this._steps.push({
        array: [...this._array],
        current: current !== undefined ? [...current] : [],
        modified: [
          ...(modified !== undefined
            ? [...previousStep.modified, modified]
            : [...previousStep.modified]),
        ],
      });
    } else {
      this._steps.push({
        array: [...this._array],
        current: current !== undefined ? [...current] : [],
        modified: modified !== undefined ? [modified] : [],
      });
    }
  }

  set data(data: T[]) {
    this._clearSteps();
    this._array = [...data];
  }

  set method(method: SortingMethods) {
    this._clearSteps();
    this._method = method;
  }

  set direction(direction: Direction) {
    this._clearSteps();
    this._direction = direction;
  }

  get steps() {
    return this._steps;
  }
}
