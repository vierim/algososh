import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';
import { TSortingResult } from '../../types/results';

const MIN_ARRAY_LEN = 3;
const MAX_ARRAY_LEN = 17;

const MIN_VALUE = 0;
const MAX_VALUE = 100;

export const randomArr = (): number[] => {
  const newArrayLength =
    Math.floor(Math.random() * (MAX_ARRAY_LEN - MIN_ARRAY_LEN)) + MIN_ARRAY_LEN;
  const newArray = new Array(newArrayLength)
    .fill(0)
    .map(
      (item) =>
        item + Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE)) + MIN_VALUE
    );

  return newArray;
};

export class SortingArray {
  private arr: TSortingResult;
  private method: string;
  private direction: Direction;

  private steps: Array<TSortingResult>;

  constructor(arr: TSortingResult, method: string, direction: Direction) {
    this.arr = [...arr].map((item) => {
      return { ...item };
    });
    this.method = method;
    this.direction = direction;
    this.steps = [];

    this.sortArray();
  }

  sortArray() {
    if (this.method === 'choice') {
      this.choiceSorting();
    }

    if (this.method === 'bubble') {
      this.bubbleSorting();
    }
  }

  choiceSorting() {
    console.log('Метод в стадии разработки');
  }

  bubbleSorting() {
    for (let i = 0; i < this.arr.length; i++) {
      this.arr[i].state = ElementStates.Changing;

      for (let j = i + 1; j < this.arr.length; j++) {
        this.arr[j].state = ElementStates.Changing;
        this.logStep();

        if (this.compare(this.arr[i].value, this.arr[j].value)) {
          this.swap(i, j);
          this.logStep();
        }

        this.arr[j].state = ElementStates.Default;
      }

      this.arr[i].state = ElementStates.Modified;
      if (i === this.arr.length - 1) {
        this.logStep();
      }
    }
  }

  compare(current: number, compared: number) {
    if (this.direction === Direction.Ascending) {
      return current > compared;
    } else {
      return current < compared;
    }
  }

  swap(current: number, compared: number) {
    let tmp = { ...this.arr[current] };
    this.arr[current] = { ...this.arr[compared] };
    this.arr[compared] = tmp;
  }

  logStep() {
    this.steps.push(
      [...this.arr].map((item) => {
        return { ...item };
      })
    );
  }

  getSteps() {
    return this.steps.length > 0 ? this.steps : false;
  }
}
